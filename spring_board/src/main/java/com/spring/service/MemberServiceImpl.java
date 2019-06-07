package com.spring.service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.spring.dao.MemberDAO;
import com.spring.dto.MemberVO;
import com.spring.exception.IdNotFoundException;
import com.spring.exception.InvalidPasswordException;
import com.spring.request.Criteria;
import com.spring.request.PageMaker;

public class MemberServiceImpl implements MemberService{

	
	// MemberDAO 
	private MemberDAO memberDAO;
	public void setMemberDAO(MemberDAO memberDAO) {
		this.memberDAO=memberDAO;
	}
	
	@Override
	public void login(String id, String pwd) throws SQLException,
												    IdNotFoundException,
												    InvalidPasswordException {
		
		MemberVO member = memberDAO.selectMemberById(id);
		
		if(member==null) throw new IdNotFoundException();
		if(!pwd.equals(member.getPwd())) throw new InvalidPasswordException();
		
	}
	@Override
	public void regist(MemberVO member) throws SQLException {
		memberDAO.insertMember(member);
		
	}
	@Override
	public MemberVO getMember(String id) throws SQLException {
		return memberDAO.selectMemberById(id);
	}
	@Override
	public List<MemberVO> getMemberList() throws SQLException {
		
		return memberDAO.selectMemberList();
	}
	@Override
	public void modify(MemberVO member) throws SQLException {
		memberDAO.updateMember(member);		
	}
	@Override
	public void remove(String id) throws SQLException {
		memberDAO.deleteMember(id);
	}
	@Override
	public void disable(String id) throws SQLException {
		memberDAO.disableMember(id);
		
	}
	@Override
	public Map<String, Object> getMemberList(Criteria cri) throws SQLException {
		
		List<MemberVO> memberList=memberDAO.selectMemberList(cri);
		
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(memberDAO.selectMemberListCount(cri));
		
		Map<String,Object> dataMap=new HashMap<String,Object>();
		dataMap.put("memberList", memberList);
		dataMap.put("pageMaker", pageMaker);
		
		return dataMap;
	}

}




