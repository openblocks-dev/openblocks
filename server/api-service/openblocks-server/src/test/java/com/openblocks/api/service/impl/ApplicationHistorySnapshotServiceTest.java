package com.openblocks.api.service.impl;

import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit4.SpringRunner;

import com.google.common.collect.ImmutableMap;
import com.openblocks.domain.application.model.ApplicationHistorySnapshot;
import com.openblocks.domain.application.service.ApplicationHistorySnapshotService;
import com.openblocks.sdk.models.HasIdAndAuditing;

import lombok.extern.slf4j.Slf4j;
import reactor.test.StepVerifier;

@SuppressWarnings({"ReactiveStreamsNullableInLambdaInTransform"})
@RunWith(SpringRunner.class)
@SpringBootTest
@Slf4j
public class ApplicationHistorySnapshotServiceTest {

    @Autowired
    private ApplicationHistorySnapshotService service;

    @Test
    public void testServiceMethods() {

        String applicationId = "123123";
        StepVerifier.create(service.createHistorySnapshot(applicationId, ImmutableMap.of("dsl", "dsl1"),
                        ImmutableMap.of("context", "context1"), "user1"))
                .expectNext(true)
                .verifyComplete();

        StepVerifier.create(service.createHistorySnapshot(applicationId, ImmutableMap.of("dsl", "dsl2"),
                        ImmutableMap.of("context", "context2"), "user2"))
                .expectNext(true)
                .verifyComplete();

        StepVerifier.create(service.countByApplicationId(applicationId))
                .expectNext(2L)
                .verifyComplete();


        StepVerifier.create(service.listAllHistorySnapshotBriefInfo(applicationId, PageRequest.of(0, 5)))
                .assertNext(list -> {
                    Assertions.assertEquals(2, list.size());

                    ApplicationHistorySnapshot first = list.get(0);
                    ApplicationHistorySnapshot second = list.get(1);
                    Assertions.assertTrue(first.getCreatedAt().isAfter(second.getCreatedAt()));

                    Assertions.assertNull(first.getDsl());
                    Assertions.assertEquals(ImmutableMap.of("context", "context2"), first.getContext());
                    Assertions.assertEquals(applicationId, first.getApplicationId());

                    Assertions.assertNull(second.getDsl());
                    Assertions.assertEquals(ImmutableMap.of("context", "context1"), second.getContext());
                    Assertions.assertEquals(applicationId, second.getApplicationId());


                })
                .verifyComplete();

        StepVerifier.create(service.listAllHistorySnapshotBriefInfo(applicationId, PageRequest.of(1, 1)))
                .assertNext(list -> {
                    Assertions.assertEquals(1, list.size());
                    ApplicationHistorySnapshot one = list.get(0);
                    Assertions.assertNull(one.getDsl());
                    Assertions.assertEquals(ImmutableMap.of("context", "context1"), one.getContext());
                    Assertions.assertEquals(applicationId, one.getApplicationId());
                })
                .verifyComplete();


        StepVerifier.create(service.listAllHistorySnapshotBriefInfo(applicationId, PageRequest.of(0, 5))
                        .map(it -> it.get(0))
                        .map(HasIdAndAuditing::getId)
                        .flatMap(id -> service.getHistorySnapshotDetail(id)))
                .assertNext(snapshot -> {
                    Assertions.assertEquals(ImmutableMap.of("dsl", "dsl2"), snapshot.getDsl());
                    Assertions.assertEquals(ImmutableMap.of("context", "context2"), snapshot.getContext());
                })
                .verifyComplete();

    }
}
