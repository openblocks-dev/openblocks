package com.openblocks.plugins;

import java.util.List;

import javax.mail.internet.InternetAddress;

import com.openblocks.sdk.query.QueryExecutionContext;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SmtpQueryExecutionContext extends QueryExecutionContext {

    private final InternetAddress from;

    private final InternetAddress[] to;
    private final InternetAddress[] cc;
    private final InternetAddress[] bcc;

    private final InternetAddress[] replyTo;

    private final String subject;
    private final String content;

    private final List<Attachment> attachments;

    /**
     * @param content encode in base64
     */
    public record Attachment(String name, String contentType, String content) {
    }
}
