package com.openblocks.sdk.webclient;

import java.net.InetSocketAddress;

import io.netty.resolver.AddressResolver;
import io.netty.resolver.AddressResolverGroup;
import io.netty.resolver.InetSocketAddressResolver;
import io.netty.util.concurrent.EventExecutor;

public class ResolverGroup extends AddressResolverGroup<InetSocketAddress> {

    public static final ResolverGroup INSTANCE = new ResolverGroup();

    @Override
    protected AddressResolver<InetSocketAddress> newResolver(EventExecutor executor) {
        return new InetSocketAddressResolver(executor, new NameResolver(executor));
    }
}