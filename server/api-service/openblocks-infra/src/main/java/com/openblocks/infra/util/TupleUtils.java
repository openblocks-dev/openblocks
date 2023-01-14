package com.openblocks.infra.util;

import reactor.util.function.Tuple2;
import reactor.util.function.Tuple3;
import reactor.util.function.Tuple4;
import reactor.util.function.Tuple5;
import reactor.util.function.Tuples;

public class TupleUtils {

    public static <U, T1, T2> Tuple3<U, T1, T2> merge(U u, Tuple2<T1, T2> t) {
        return Tuples.of(u, t.getT1(), t.getT2());
    }

    public static <T1, T2, U> Tuple3<T1, T2, U> merge(Tuple2<T1, T2> t, U u) {
        return Tuples.of(t.getT1(), t.getT2(), u);
    }

    public static <U, T1, T2, T3> Tuple4<U, T1, T2, T3> merge(U u, Tuple3<T1, T2, T3> t) {
        return Tuples.of(u, t.getT1(), t.getT2(), t.getT3());
    }

    public static <T1, T2, T3, U> Tuple4<T1, T2, T3, U> merge(Tuple3<T1, T2, T3> t, U u) {
        return Tuples.of(t.getT1(), t.getT2(), t.getT3(), u);
    }

    public static <U, T1, T2, T3, T4> Tuple5<U, T1, T2, T3, T4> merge(U u, Tuple4<T1, T2, T3, T4> t) {
        return Tuples.of(u, t.getT1(), t.getT2(), t.getT3(), t.getT4());
    }

    public static <T1, T2, T3, T4, U> Tuple5<T1, T2, T3, T4, U> merge(Tuple4<T1, T2, T3, T4> t, U u) {
        return Tuples.of(t.getT1(), t.getT2(), t.getT3(), t.getT4(), u);
    }


}
