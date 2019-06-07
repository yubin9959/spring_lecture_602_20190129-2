package com.spring.service;

import java.sql.SQLException;

import com.spring.dto.MemberVO;

public interface MemberService {
	
	public MemberVO getMember(String id)throws SQLException;
}
