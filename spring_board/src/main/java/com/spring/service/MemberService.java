package com.spring.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.spring.dto.MemberVO;
import com.spring.exception.IdNotFoundException;
import com.spring.exception.InvalidPasswordException;
import com.spring.request.Criteria;

public interface MemberService {
	
	// 로그인 기능
	void login(String id, String pwd)throws SQLException,
											IdNotFoundException,
											InvalidPasswordException;
	
	// 회원가입
	void regist(MemberVO member)throws SQLException;
	
	// 회원조회
	MemberVO getMember(String id)throws SQLException;
	
	// 회원리스트
	List<MemberVO> getMemberList()throws SQLException;
	
	Map<String,Object> getMemberList(Criteria cri)throws SQLException;
	
	//회원수정
	void modify(MemberVO member)throws SQLException;
	
	//회원삭제
	void remove(String id)throws SQLException;
	
	//회원 비활성
	void disable(String id)throws SQLException;
	
	
}







