package com.openblocks.sdk.helpers;

import static com.openblocks.sdk.util.MustacheHelper.extractMustacheKeys;
import static com.openblocks.sdk.util.MustacheHelper.extractMustacheKeysInOrder;
import static com.openblocks.sdk.util.MustacheHelper.tokenize;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.junit.Assert;
import org.junit.Test;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.Lists;
import com.openblocks.sdk.util.JsonUtils;
import com.openblocks.sdk.util.MustacheHelper;

@SuppressWarnings(
        // Disabling this so we may use `Arrays.asList` with single argument, which is easier to refactor, just for tests.
        "ArraysAsListWithZeroOrOneArgument"
)
public class MustacheHelperTest {

    private void checkTokens(String template, List<String> expected) {
        assertThat(tokenize(template)).isEqualTo(expected);
    }

    private void checkKeys(String template, Set<String> expected) {
        assertThat(extractMustacheKeys(template)).isEqualTo(expected);
    }

    private void check(String template, List<String> expectedTokens, Set<String> expectedKeys) {
        if (expectedTokens != null) {
            checkTokens(template, expectedTokens);
        }
        if (expectedKeys != null) {
            checkKeys(template, expectedKeys);
        }
    }

    @Test
    public void testParse() {
        Assert.assertArrayEquals(new String[] {"{{token1}}"}, tokenize("    {{token1}}      \n".trim()).toArray());
        Assert.assertArrayEquals(new String[] {"token1"}, tokenize("    token1      \n".trim()).toArray());
    }

    @Test
    public void dontSplitNormalTexts() {
        checkKeys("hello there matey!", Set.of());
    }

    @Test
    public void justSingleMustache() {
        checkTokens("{{A}}", Arrays.asList("{{A}}"));
        checkKeys("{{A}}, {{A}}, {{A}}", Set.of("A"));
        List<String> strings = extractMustacheKeysInOrder("{{A}}, {{A}}, {{A}}");
        assertThat(strings).isEqualTo(ImmutableList.of("A", "A", "A"));
        checkKeys("{{A + B / C}}", Set.of("A + B / C"));
    }

    @Test
    public void textAndMustache() {
        checkKeys("Hello {{name}}", Set.of("name"));
        checkKeys("Hello {{url.hash}}", Set.of("url.hash"));
    }

    @Test
    public void mustacheAndText() {
        checkKeys("{{name}} is approved!", Set.of("name"));
    }

    @Test
    public void realWorldText1() {
        checkTokens(
                "Hello {{Customer.Name}}, the status for your order id {{orderId}} is {{status}}",
                Arrays.asList(
                        "Hello ",
                        "{{Customer.Name}}",
                        ", the status for your order id ",
                        "{{orderId}}",
                        " is ",
                        "{{status}}"
                )
        );
        checkKeys(
                "Hello {{Customer.Name}}, the status for your order id {{orderId}} is {{status}}",
                Set.of(
                        "Customer.Name",
                        "orderId",
                        "status"
                )
        );
    }

    @Test
    public void realWorldText2() {
        checkTokens(
                "{{data.map(datum => {return {id: datum}})}}",
                Arrays.asList("{{data.map(datum => {return {id: datum}})}}")
        );
        checkKeys(
                "{{data.map(datum => {return {id: datum}})}}",
                Set.of("data.map(datum => {return {id: datum}})")
        );
    }

    @Test
    public void braceDances1() {
        check(
                "{{}}{{}}}",
                Arrays.asList("{{}}", "{{}}", "}"),
                Set.of("")
        );

        check("{{{}}", Arrays.asList("{{{}}"), Set.of("{"));

        check("{{ {{", Arrays.asList("{{ {{"), Set.of());

        check("}} }}", Arrays.asList("}} }}"), Set.of());

        check("}} {{", Arrays.asList("}} ", "{{"), Set.of());
    }

    @Test
    public void quotedStrings() {
        check(
                "{{ 'abc def'.toUpperCase() }}",
                Arrays.asList("{{ 'abc def'.toUpperCase() }}"),
                Set.of("'abc def'.toUpperCase()")
        );
        check(
                "{{ \"abc def\".toUpperCase() }}",
                Arrays.asList("{{ \"abc def\".toUpperCase() }}"),
                Set.of("\"abc def\".toUpperCase()")
        );
        check(
                "{{ `abc def`.toUpperCase() }}",
                Arrays.asList("{{ `abc def`.toUpperCase() }}"),
                Set.of("`abc def`.toUpperCase()")
        );
    }

    @Test
    public void singleQuotedStringsWithBraces() {
        check(
                "{{ 'The { char is a brace' }}",
                Arrays.asList("{{ 'The { char is a brace' }}"),
                Set.of("'The { char is a brace'")
        );
        check(
                "{{ 'I have {{ two braces' }}",
                Arrays.asList("{{ 'I have {{ two braces' }}"),
                Set.of("'I have {{ two braces'")
        );
        check(
                "{{ 'I have {{{ three braces' }}",
                Arrays.asList("{{ 'I have {{{ three braces' }}"),
                Set.of("'I have {{{ three braces'")
        );
        check(
                "{{ 'The } char is a brace' }}",
                Arrays.asList("{{ 'The } char is a brace' }}"),
                Set.of("'The } char is a brace'")
        );
        check(
                "{{ 'I have }} two braces' }}",
                Arrays.asList("{{ 'I have }} two braces' }}"),
                Set.of("'I have }} two braces'")
        );
        check(
                "{{ 'I have }}} three braces' }}",
                Arrays.asList("{{ 'I have }}} three braces' }}"),
                Set.of("'I have }}} three braces'")
        );
        check(
                "{{ 'Interpolation uses {{ and }} delimiters' }}",
                Arrays.asList("{{ 'Interpolation uses {{ and }} delimiters' }}"),
                Set.of("'Interpolation uses {{ and }} delimiters'")
        );
    }

    @Test
    public void doubleQuotedStringsWithBraces() {
        check(
                "{{ \"The { char is a brace\" }}",
                Arrays.asList("{{ \"The { char is a brace\" }}"),
                Set.of("\"The { char is a brace\"")
        );
        check(
                "{{ \"I have {{ two braces\" }}",
                Arrays.asList("{{ \"I have {{ two braces\" }}"),
                Set.of("\"I have {{ two braces\"")
        );
        check(
                "{{ \"I have {{{ three braces\" }}",
                Arrays.asList("{{ \"I have {{{ three braces\" }}"),
                Set.of("\"I have {{{ three braces\"")
        );
        check(
                "{{ \"The } char is a brace\" }}",
                Arrays.asList("{{ \"The } char is a brace\" }}"),
                Set.of("\"The } char is a brace\"")
        );
        check(
                "{{ \"I have }} two braces\" }}",
                Arrays.asList("{{ \"I have }} two braces\" }}"),
                Set.of("\"I have }} two braces\"")
        );
        check(
                "{{ \"I have }}} three braces\" }}",
                Arrays.asList("{{ \"I have }}} three braces\" }}"),
                Set.of("\"I have }}} three braces\"")
        );
        check(
                "{{ \"Interpolation uses {{ and }} delimiters\" }}",
                Arrays.asList("{{ \"Interpolation uses {{ and }} delimiters\" }}"),
                Set.of("\"Interpolation uses {{ and }} delimiters\"")
        );
    }

    @Test
    public void backQuotedStringsWithBraces() {
        check(
                "{{ `The { char is a brace` }}",
                Arrays.asList("{{ `The { char is a brace` }}"),
                Set.of("`The { char is a brace`")
        );
        check(
                "{{ `I have {{ two braces` }}",
                Arrays.asList("{{ `I have {{ two braces` }}"),
                Set.of("`I have {{ two braces`")
        );
        check(
                "{{ `I have {{{ three braces` }}",
                Arrays.asList("{{ `I have {{{ three braces` }}"),
                Set.of("`I have {{{ three braces`")
        );
        check(
                "{{ `The } char is a brace` }}",
                Arrays.asList("{{ `The } char is a brace` }}"),
                Set.of("`The } char is a brace`")
        );
        check(
                "{{ `I have }} two braces` }}",
                Arrays.asList("{{ `I have }} two braces` }}"),
                Set.of("`I have }} two braces`")
        );
        check(
                "{{ `I have }}} three braces` }}",
                Arrays.asList("{{ `I have }}} three braces` }}"),
                Set.of("`I have }}} three braces`")
        );
        check(
                "{{ `Interpolation uses {{ and }} delimiters` }}",
                Arrays.asList("{{ `Interpolation uses {{ and }} delimiters` }}"),
                Set.of("`Interpolation uses {{ and }} delimiters`")
        );
    }

    @Test
    public void quotedStringsWithExtras() {
        check(
                "{{ 2 + ' hello ' + 3 }}",
                Arrays.asList("{{ 2 + ' hello ' + 3 }}"),
                Set.of("2 + ' hello ' + 3")
        );
        check(
                "{{ 2 + \" hello \" + 3 }}",
                Arrays.asList("{{ 2 + \" hello \" + 3 }}"),
                Set.of("2 + \" hello \" + 3")
        );
        check(
                "{{ 2 + ` hello ` + 3 }}",
                Arrays.asList("{{ 2 + ` hello ` + 3 }}"),
                Set.of("2 + ` hello ` + 3")
        );
    }

    @Test
    public void quotedStringsWithEscapes() {
        check(
                "{{ 'Escaped \\' character' }}",
                Arrays.asList("{{ 'Escaped \\' character' }}"),
                Set.of("'Escaped \\' character'")
        );
        check(
                "{{ \"Escaped \\\" character\" }}",
                Arrays.asList("{{ \"Escaped \\\" character\" }}"),
                Set.of("\"Escaped \\\" character\"")
        );
        check(
                "{{ `Escaped \\` character` }}",
                Arrays.asList("{{ `Escaped \\` character` }}"),
                Set.of("`Escaped \\` character`")
        );
    }

    @Test
    public void conditionalExpression() {
        check(
                "Conditional: {{ 2 + 4 ? trueVal : falseVal }}",
                Arrays.asList("Conditional: ", "{{ 2 + 4 ? trueVal : falseVal }}"),
                Set.of("2 + 4 ? trueVal : falseVal")
        );
    }

    @Test
    public void testReplaceMustacheWithQuestionMarkMore() {

        String sql;
        List<String> keys;
        Map<String, Object> param;
        Map<String, Object> param2;

        //
        sql = "select * from user where name like {{name}}";
        keys = Lists.newArrayList("name");
        param = new HashMap<>();
        param.put("name", "lv");
        param2 = new HashMap<>(param);

        sql = MustacheHelper.replaceMustacheWithQuestionMarkMore(sql, keys, param);
        Assert.assertEquals("select * from user where name like ?", sql);
        Assert.assertEquals(Lists.newArrayList("name"), keys);
        Assert.assertEquals(buildMap(param2), param);

        //
        sql = "select * from user where name like '{{name}}'";
        keys = Lists.newArrayList("name");
        param = new HashMap<>();
        param.put("name", "lv");
        param2 = new HashMap<>(param);

        sql = MustacheHelper.replaceMustacheWithQuestionMarkMore(sql, keys, param);
        Assert.assertEquals("select * from user where name like ?", sql);
        Assert.assertEquals(Lists.newArrayList("generateKey_0"), keys);
        Assert.assertEquals(buildMap(param2, "generateKey_0", "lv"), param);

        //
        sql = "select * from user where name like '{{name}}%'";
        keys = Lists.newArrayList("name");
        param = new HashMap<>();
        param.put("name", "lv");
        param2 = new HashMap<>(param);

        sql = MustacheHelper.replaceMustacheWithQuestionMarkMore(sql, keys, param);
        Assert.assertEquals("select * from user where name like ?", sql);
        Assert.assertEquals(Lists.newArrayList("generateKey_0"), keys);
        Assert.assertEquals(buildMap(param2, "generateKey_0", "lv%"), param);

        //
        sql = """
                select * from user where name like "123" and name like '%{{first}}%{{last}}%'""";
        keys = Lists.newArrayList("first", "last");
        param = new HashMap<>();
        param.put("first", "lv");
        param.put("last", "huichao");
        param2 = new HashMap<>(param);

        sql = MustacheHelper.replaceMustacheWithQuestionMarkMore(sql, keys, param);
        Assert.assertEquals("""
                select * from user where name like "123" and name like ?""", sql);
        Assert.assertEquals(Lists.newArrayList("generateKey_0"), keys);
        Assert.assertEquals(buildMap(param2, "generateKey_0", "%lv%huichao%"), param);

        //
        sql = """
                select * from user where name like "123" and name like 'a"%{{first}}"%{{last}}%"'""";
        keys = Lists.newArrayList("first", "last");
        param = new HashMap<>();
        param.put("first", "lv");
        param.put("last", "huichao");
        param2 = new HashMap<>(param);

        sql = MustacheHelper.replaceMustacheWithQuestionMarkMore(sql, keys, param);
        Assert.assertEquals("""
                select * from user where name like "123" and name like ?""", sql);
        Assert.assertEquals(Lists.newArrayList("generateKey_0"), keys);
        Assert.assertEquals(buildMap(param2, "generateKey_0", """
                a"%lv"%huichao%\""""), param);

        //
        sql = """
                select * from user where name like "{{name}}" and name like 'a"%{{first}}"%{{last}}%"'""";
        keys = Lists.newArrayList("name", "first", "last");
        param = new HashMap<>();
        param.put("name", "lvhuichao");
        param.put("first", "lv");
        param.put("last", "huichao");
        param2 = new HashMap<>(param);

        sql = MustacheHelper.replaceMustacheWithQuestionMarkMore(sql, keys, param);
        Assert.assertEquals("select * from user where name like ? and name like ?", sql);
        Assert.assertEquals(Lists.newArrayList("name", "generateKey_0"), keys);
        Assert.assertEquals(buildMap(param2, "generateKey_0", """
                a"%lv"%huichao%\""""), param);

        //
        sql = """
                select * from user where name like "{{first}}" and name like 'a"%{{first}}"%{{last}}%"'""";
        keys = Lists.newArrayList("first", "first", "last");
        param = new HashMap<>();
        param.put("first", "lv");
        param.put("last", "huichao");
        param2 = new HashMap<>(param);

        sql = MustacheHelper.replaceMustacheWithQuestionMarkMore(sql, keys, param);
        Assert.assertEquals("select * from user where name like ? and name like ?", sql);
        Assert.assertEquals(Lists.newArrayList("first", "generateKey_0"), keys);
        Assert.assertEquals(buildMap(param2, "generateKey_0", """
                a"%lv"%huichao%\""""), param);
    }

    private Map<String, Object> buildMap(Map<String, Object> map, Object... args) {
        Map<String, Object> result = new HashMap<>(map);
        for (int i = 0; i < args.length; i += 2) {
            result.put(args[i].toString(), args[i + 1]);
        }
        return result;
    }

    @Test
    public void jsonInMustache() {
        check(
                "{{{\"foo\": \"bar\"}}}",
                Arrays.asList("{{{\"foo\": \"bar\"}}}"),
                Set.of("{\"foo\": \"bar\"}")
        );
    }

    @Test
    public void testRenderMustacheJsonString() {
        String json = "{source  :{{table1.data}} }";
        Map<String, Object> map = new HashMap<>();
        map.put("table1.data", Lists.newArrayList(1, 2, 3, 4));
        String result = MustacheHelper.renderMustacheJsonString(json, map);
        assertThat(result).isEqualTo("{\"source\":[1,2,3,4]}");
    }

    @Test
    public void typeJudgment() {
        Object nullObj = JsonUtils.jsonNodeToObject(MustacheHelper.renderMustacheJson("null", Map.of()));
        Assert.assertNull(nullObj);
        Object number = JsonUtils.jsonNodeToObject(MustacheHelper.renderMustacheJson("1", Map.of()));
        Assert.assertTrue(number instanceof Integer);
        Object b = JsonUtils.jsonNodeToObject(MustacheHelper.renderMustacheJson("true", Map.of()));
        Assert.assertTrue(b instanceof Boolean);
        Object array = JsonUtils.jsonNodeToObject(MustacheHelper.renderMustacheJson("['abc', 1]", Map.of()));
        Assert.assertTrue(array instanceof Collection<?>);
        Object array2 = JsonUtils.jsonNodeToObject(MustacheHelper.renderMustacheJson("[abc, cde]", Map.of()));
        Assert.assertTrue(array2 instanceof Collection<?>);
        Object o = JsonUtils.jsonNodeToObject(MustacheHelper.renderMustacheJson("{'a': 1, 'b': 'xx'}", Map.of()));
        Assert.assertTrue(o instanceof Map<?, ?>);
        Object o2 = JsonUtils.jsonNodeToObject(MustacheHelper.renderMustacheJson("{a:1, b:2}", Map.of()));
        Assert.assertTrue(o2 instanceof Map<?, ?>);
        Object o3 = JsonUtils.jsonNodeToObject(MustacheHelper.renderMustacheJson("{{3}}3", Map.of("3", 3)));
        Assert.assertEquals("33", o3);
        Object o4 = JsonUtils.jsonNodeToObject(MustacheHelper.renderMustacheJson("{{3}}3", Map.of("3", "3")));
        Assert.assertEquals("33", o4);
        Object o5 = JsonUtils.jsonNodeToObject(MustacheHelper.renderMustacheJson("{{t}}rue", Map.of("t", "t")));
        Assert.assertEquals("true", o5);
        Object o6 = JsonUtils.jsonNodeToObject(MustacheHelper.renderMustacheJson("[1, {{3}}3]", Map.of("3", 3)));
        Object[] objects = ((Collection<?>) o6).toArray();
        Assert.assertEquals(1, objects[0]);
        Assert.assertEquals("33", objects[1]);
    }
}
