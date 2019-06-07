package com.spring.dto;

public class SampleVO {

	private String firstName;
	private String lastName;
	
	public SampleVO(){}
	public SampleVO(String firstName, String lastName) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	@Override
	public String toString() {
		return "SampleVO [firstName=" + firstName + ", lastName=" + lastName + "]";
	}
}
