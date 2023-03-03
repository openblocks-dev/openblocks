package com.openblocks.sdk.webclient;

import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import io.netty.resolver.AddressResolver;
import io.netty.resolver.AddressResolverGroup;
import io.netty.resolver.InetNameResolver;
import io.netty.resolver.InetSocketAddressResolver;
import io.netty.util.concurrent.EventExecutor;
import io.netty.util.concurrent.Promise;
import io.netty.util.internal.SocketUtils;

public class SafeHostResolverGroup extends AddressResolverGroup<InetSocketAddress> {

    private final Set<String> disallowedHosts;

    public SafeHostResolverGroup(Set<String> disallowedHosts) {
        this.disallowedHosts = disallowedHosts;
    }

    @Override
    protected AddressResolver<InetSocketAddress> newResolver(EventExecutor executor) {
        return new InetSocketAddressResolver(executor, new SafeHostNameResolver(executor, disallowedHosts));
    }

    /**
     * Safe-host name resolver which disallow some hosts.
     */
    private static class SafeHostNameResolver extends InetNameResolver {

        private final Set<String> disallowedHosts;

        public SafeHostNameResolver(EventExecutor executor, Set<String> disallowedHosts) {
            super(executor);
            this.disallowedHosts = disallowedHosts;
        }

        @Override
        protected void doResolve(String inetHost, Promise<InetAddress> promise) {
            if (disallowedHosts.contains(inetHost)) {
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

            if (disallowedHosts.contains(address.getHostAddress())) {
                promise.setFailure(new UnknownHostException("Host not allowed."));
                return;
            }

            promise.setSuccess(address);
        }

        @Override
        protected void doResolveAll(String inetHost, Promise<List<InetAddress>> promise) {
            if (disallowedHosts.contains(inetHost)) {
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
                if (disallowedHosts.contains(address.getHostAddress())) {
                    promise.setFailure(new UnknownHostException("Host not allowed."));
                    return;
                }
            }

            promise.setSuccess(addresses);
        }
    }
}