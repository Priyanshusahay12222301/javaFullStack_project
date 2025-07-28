package com.EduBridge;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Entity
public class PlayersModel {
	@Id
	int id;
	String fname;
	String lname;
	int age;
	float salary;
	
	
	 public PlayersModel() {
	
	}


	public PlayersModel(int id, String fname, String lname, int age, float salary) {
		super();
		this.id = id;
		this.fname = fname;
		this.lname = lname;
		this.age = age;
		this.salary = salary;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getFname() {
		return fname;
	}


	public void setFname(String fname) {
		this.fname = fname;
	}


	public String getLname() {
		return lname;
	}


	public void setLname(String lname) {
		this.lname = lname;
	}


	public int getAge() {
		return age;
	}


	public void setAge(int age) {
		this.age = age;
	}


	public float getSalary() {
		return salary;
	}


	public void setSalary(float salary) {
		this.salary = salary;
	}
		

}
