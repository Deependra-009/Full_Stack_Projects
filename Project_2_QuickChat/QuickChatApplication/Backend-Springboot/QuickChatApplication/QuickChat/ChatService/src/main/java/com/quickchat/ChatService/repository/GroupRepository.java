package com.quickchat.ChatService.repository;

import com.quickchat.CommonService.entity.UserEntity;
import com.quickchat.CommonService.entity.group.GroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GroupRepository extends JpaRepository<GroupEntity, String> {

    @Query("SELECT u FROM GroupEntity u WHERE u.groupID=:groupID")
    public GroupEntity getGroupByGroupID(
            @Param("groupID") String groupID
    );

}
