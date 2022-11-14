package com.openblocks.api.usermanagement.view;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class AddMemberRequest {

    String userId;

    String role;

}
