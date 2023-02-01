package com.openblocks.api.bizthreshold;

import java.util.Collections;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openblocks.sdk.config.dynamic.Conf;
import com.openblocks.sdk.config.dynamic.ConfigCenter;
import com.openblocks.sdk.config.dynamic.ConfigInstance;

import reactor.core.publisher.Mono;

@Service
public class BizThresholdChecker extends AbstractBizThresholdChecker {

    @Autowired
    private ConfigCenter configCenter;

    private Conf<Integer> maxOrgPerUser;
    private Conf<Integer> maxOrgMemberCount;
    private Conf<Integer> maxOrgGroupCount;
    private Conf<Integer> maxOrgAppCount;
    private Conf<Map<String, Integer>> userOrgCountWhiteList;
    private Conf<Map<String, Integer>> orgMemberCountWhiteList;
    private Conf<Map<String, Integer>> orgAppCountWhiteList;
    private Conf<Integer> maxDeveloperCount;

    @PostConstruct
    private void init() {
        ConfigInstance threshold = configCenter.threshold();
        maxOrgPerUser = threshold.ofInteger("maxOrgPerUser", 5);
        userOrgCountWhiteList = threshold.ofMap("userOrgCountWhiteList", String.class, Integer.class, Collections.emptyMap());
        maxOrgMemberCount = threshold.ofInteger("maxOrgMemberCount", 50);
        orgMemberCountWhiteList = threshold.ofMap("orgMemberCountWhiteList", String.class, Integer.class, Collections.emptyMap());
        maxOrgGroupCount = threshold.ofInteger("maxOrgGroupCount", 10);
        maxOrgAppCount = threshold.ofInteger("maxOrgAppCount", 50);
        orgAppCountWhiteList = threshold.ofMap("orgAppCountWhiteList", String.class, Integer.class, Collections.emptyMap());
        maxDeveloperCount = threshold.ofInteger("maxDeveloperCount", 50);
    }

    @Override
    protected int getMaxOrgPerUser() {
        return maxOrgPerUser.get();
    }

    @Override
    protected int getMaxOrgMemberCount() {
        return maxOrgMemberCount.get();
    }

    @Override
    protected int getMaxOrgGroupCount() {
        return maxOrgGroupCount.get();
    }

    @Override
    protected int getMaxOrgAppCount() {
        return maxOrgAppCount.get();
    }

    @Override
    protected Map<String, Integer> getUserOrgCountWhiteList() {
        return userOrgCountWhiteList.get();
    }

    @Override
    protected Map<String, Integer> getOrgMemberCountWhiteList() {
        return orgMemberCountWhiteList.get();
    }

    @Override
    protected Map<String, Integer> getOrgAppCountWhiteList() {
        return orgAppCountWhiteList.get();
    }

    @Override
    protected Mono<Integer> getMaxDeveloperCount() {
        return Mono.just(maxDeveloperCount.get());
    }
}
