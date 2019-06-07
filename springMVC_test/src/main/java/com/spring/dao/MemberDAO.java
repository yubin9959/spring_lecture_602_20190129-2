package com.spring.dao;

import java.sql.SQLException;

import com.spring.dto.MemberVO;

public interface MemberDAO {
	
	public MemberVO selectMemberById(String id) throws SQLException;
}
