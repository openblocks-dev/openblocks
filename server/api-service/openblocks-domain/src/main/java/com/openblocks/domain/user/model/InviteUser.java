package com.openblocks.domain.user.model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Document
public class InviteUser extends User {

    String inviterUserId;

    String token;

}
