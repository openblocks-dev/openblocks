package com.openblocks.sdk.webclient;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import io.netty.resolver.InetNameResolver;
import io.netty.util.concurrent.EventExecutor;
import io.netty.util.concurrent.Promise;
import io.netty.util.internal.SocketUtils;

public class NameResolver extends InetNameResolver {

    public static final Set<String> DISALLOWED_HOSTS = Set.of(
            "169.254.169.254",
            "metadata.google.internal",
            "localhost",
            "127.0.0.1"
    );

    public NameResolver(EventExecutor executor) {
        super(executor);
    }

    @Override
    protected void doResolve(String inetHost, Promise<InetAddress> promise) {
        if (DISALLOWED_HOSTS.contains(inetHost)) {
            promise.setFailure(new UnknownHostException("Host not allowed."));
            return;
        }

        final InetAddress address;
        try {
            address = SocketUtils.addressByName(inetHost);
        } catch (UnknownHostException e) {
            promise.setFailure(e);
            return;
        }

        if (DISALLOWED_HOSTS.contains(address.getHostAddress())) {
            promise.setFailure(new UnknownHostException("Host not allowed."));
            return;
        }

        promise.setSuccess(address);
    }

    @Override
    protected void doResolveAll(String inetHost, Promise<List<InetAddress>> promise) {
        if (DISALLOWED_HOSTS.contains(inetHost)) {
            promise.setFailure(new UnknownHostException("Host not allowed."));
            return;
        }

        final List<InetAddress> addresses;
        try {
            addresses = Arrays.asList(SocketUtils.allAddressesByName(inetHost));
        } catch (UnknownHostException e) {
            promise.setFailure(e);
            return;
        }

        // Even if _one_ of the addresses is disallowed, we fail the request.
        for (InetAddress address : addresses) {
            if (DISALLOWED_HOSTS.contains(address.getHostAddress())) {
                promise.setFailure(new UnknownHostException("Host not allowed."));
                return;
            }
        }

        promise.setSuccess(addresses);
    }
}