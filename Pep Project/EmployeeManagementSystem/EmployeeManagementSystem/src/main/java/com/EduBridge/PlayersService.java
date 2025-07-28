package com.EduBridge;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.EduBridge.DAO.PlayerRepository;


@Service
public class PlayersService {
	@Autowired
	PlayerRepository pr;
	public PlayersService() {
		
	}
	public List allPlayers() {
		return pr.findAll() ;
	}
		public PlayersModel getPlayer(int id) {
		System.out.println("In service");
		//return pr.getOne(id);
			return pr.getById(id);
	}
	public void savePlayer(PlayersModel p) {
		pr.save(p);//  101 "Safdar" 
		
	}
	public void updatePlayer(PlayersModel p) {
		pr.save(p);//101   Umesh
	}
	
	public void removePlayer(int id) {//101
		System.out.println("requested for deleting:::: Service");
		PlayersModel id1=pr.getById(id);
		System.out.println( "sent id"+id);
		if(id1.getId()==id)
		pr.deleteById(id);
	}
		
	}


