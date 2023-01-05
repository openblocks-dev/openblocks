package com.openblocks.infra.conditional;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.Map;

import javax.annotation.Nullable;
import javax.validation.constraints.NotBlank;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.context.annotation.Conditional;
import org.springframework.core.type.AnnotatedTypeMetadata;

import com.openblocks.infra.conditional.ConditionalOnPropertyNotBlank.OnPropertyNotBlankCondition;

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Conditional(OnPropertyNotBlankCondition.class)
public @interface ConditionalOnPropertyNotBlank {

    String[] value() default {};

    String prefix() default "";

    class OnPropertyNotBlankCondition implements Condition {

        @Override
        public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
            Map<String, Object> attrs = metadata.getAnnotationAttributes(ConditionalOnPropertyNotBlank.class.getName());
            if (attrs == null) {
                return false;
            }
            String[] properties = (String[]) attrs.get("value");
            String prefix = (String) attrs.get("prefix");
            for (String property : properties) {
                if (StringUtils.isBlank(property)) {
                    return false;
                }
                String value = context.getEnvironment().getProperty(concat(prefix, property));
                if (StringUtils.isBlank(value)) {
                    return false;
                }
            }
            return true;
        }

        private String concat(@Nullable String prefix, @NotBlank String property) {
            if (StringUtils.isBlank(prefix)) {
                return property;
            }
            return prefix + "." + property;
        }
    }
}
