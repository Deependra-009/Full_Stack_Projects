package com.quickchat.CommonService.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OnlineStatus {
    private String userId;
    private boolean isOnline;
}
