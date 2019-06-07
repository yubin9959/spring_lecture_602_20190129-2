package com.spring.dao;

import java.sql.SQLException;
import java.util.List;

import com.spring.dto.MemberVO;
import com.spring.request.Criteria;

public interface MemberDAO {
		
	//MemberVO 리스트
	List<MemberVO> selectMemberList()throws SQLException;
	List<MemberVO> selectMemberList(Criteria cri)throws SQLException;
	
	// 검색 결과의 전체 리스트 개수
	int selectMemberListCount(Criteria ci)throws SQLException; 
	
	//id 조회 MemberVO
	MemberVO selectMemberById(String id)throws SQLException;
	
	//insert MemberVO
	void insertMember(MemberVO member)throws SQLException;
	
	//update MemberVO
	void updateMember(MemberVO member)throws SQLException;
	
	//id를 받아서 delete MemberVO  
	void deleteMember(String id)throws SQLException;
	
	//id를 받아서 disable MemberVO
	void disableMember(String id)throws SQLException;
}



