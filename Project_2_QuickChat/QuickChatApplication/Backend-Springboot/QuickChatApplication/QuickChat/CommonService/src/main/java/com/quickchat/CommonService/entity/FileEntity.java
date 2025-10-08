package com.quickchat.CommonService.entity;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class FileEntity {
    private String fileName;
    private String fileType;
    private byte[] fileData;
}
