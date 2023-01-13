package com.openblocks.api.util;

import static com.openblocks.sdk.util.StreamUtils.collectList;
import static com.openblocks.sdk.util.StreamUtils.collectMap;
import static java.util.function.Function.identity;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.BiFunction;
import java.util.function.Function;

import com.openblocks.infra.annotation.NonEmptyMono;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public class ViewBuilder {

    /**
     * 1. get item2's id from item1
     * 2. get item2
     * 3. combine item1 and item2 into item3 in item1's order
     * <p>
     * e.g. parse userIds from List<GroupMember>, then fetch User in batch, at last generate view based on GroupMember & User
     */
    public static <Item1, Item2Id, Item2, Item3> Mono<List<Item3>> multiBuild(Collection<Item1> item1s,
            Function<Item1, Item2Id> extractItem2IdFromItem1,
            Function<Collection<Item2Id>, Mono<Map<Item2Id, Item2>>> item2Supplier,
            BiFunction<Item1, Item2, Item3> item1AndItem2Merger) {

        List<Item2Id> item2Ids = collectList(item1s, extractItem2IdFromItem1);
        return item2Supplier.apply(item2Ids)
                .map(item2Map -> item1s.stream()
                        .map(item1 -> {
                            Item2Id apply = extractItem2IdFromItem1.apply(item1);
                            Item2 item2 = item2Map.get(apply);
                            if (item2 == null) {
                                return null;
                            }
                            return item1AndItem2Merger.apply(item1, item2);
                        })
                        .filter(Objects::nonNull)
                        .toList());
    }

    /**
     * in this method item2Supplier returns Flux<Item2>
     */
    @NonEmptyMono
    public static <Item1, Item2Id, Item2, Item3> Mono<List<Item3>> multiBuild(Collection<Item1> item1s,
            Function<Item1, Item2Id> extractItem2IdFromItem1,
            Function<Collection<Item2Id>, Flux<Item2>> item2Supplier,
            Function<Item2, Item2Id> extractItem2IdFromItem2,
            BiFunction<Item1, Item2, Item3> item1AndItem2Merger) {

        Function<Collection<Item2Id>, Mono<Map<Item2Id, Item2>>> item2Supplier0 = item2Supplier
                .andThen(result -> result.collectList()
                        .map(item2s -> collectMap(item2s, extractItem2IdFromItem2, identity())));

        return multiBuild(item1s, extractItem2IdFromItem1, item2Supplier0, item1AndItem2Merger);
    }
}
