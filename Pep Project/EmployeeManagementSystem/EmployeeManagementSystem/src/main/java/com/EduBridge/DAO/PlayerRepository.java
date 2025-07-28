package com.EduBridge.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.EduBridge.PlayersModel;
public interface PlayerRepository extends JpaRepository<PlayersModel,Integer> {

}
