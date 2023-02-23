package com.openblocks.sdk.event;

public record BeforeSaveEvent<T>(T source) {
}
