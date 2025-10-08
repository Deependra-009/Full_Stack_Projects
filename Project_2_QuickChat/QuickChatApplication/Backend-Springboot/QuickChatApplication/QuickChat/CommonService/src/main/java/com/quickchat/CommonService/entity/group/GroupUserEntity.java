package com.quickchat.CommonService.entity.group;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.quickchat.CommonService.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="GroupUserEntity")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GroupUserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String groupUserID;

    private String groupID;
    private String userID;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonIgnore
    private UserEntity userEntity;
}
