package com.EduBridge;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class PlayersController {

	@Autowired
	PlayersService ps;

	@GetMapping("/employees")
	public List<PlayersModel> getAll(){
		return this.ps.allPlayers();
	}

	@GetMapping("/emp/{id}")
	public PlayersModel getP(@PathVariable int id) {
		return ps.getPlayer(id);
	}

	@PostMapping("/save")
	public void addPlayer(@RequestBody PlayersModel p) {
		this.ps.savePlayer(p);
	}

	@PostMapping("/update")
	public void updatePlayer(@RequestBody PlayersModel p) {
		this.ps.updatePlayer(p);
	}

	@DeleteMapping("/delete/{id}")
	public void deletePlayer(@PathVariable int id) {
		this.ps.removePlayer(id);
	}
}
