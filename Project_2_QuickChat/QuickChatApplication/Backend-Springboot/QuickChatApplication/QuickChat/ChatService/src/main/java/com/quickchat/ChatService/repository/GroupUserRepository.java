package com.quickchat.ChatService.repository;

import com.quickchat.CommonService.entity.group.GroupUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupUserRepository extends JpaRepository<GroupUserEntity,String> {

    @Query("SELECT u.userID FROM GroupUserEntity u WHERE u.groupID=:groupID")
    public List<String> getUserIDOfParticularGroup(
            @Param("groupID") String groupID
    );


}
