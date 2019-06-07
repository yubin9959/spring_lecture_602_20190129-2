package com.spring.dao;

import static org.junit.Assert.fail;

import java.sql.SQLException;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

import com.spring.dto.MemberVO;
import com.spring.request.Criteria;

import junit.framework.Assert;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:context/root-context.xml")
@TransactionConfiguration(transactionManager="transactionManager")
@Transactional
public class MybatisMemberDAOImplTest {

	@Autowired
	private MemberDAO memberDAO;
	
	
	@Test
	public void testSelectMemberById() throws SQLException{
		String id="mimi";
		MemberVO member=memberDAO.selectMemberById(id);		
		Assert.assertEquals("mimi", member.getId());
	}

	@Test
	public void testInsertMember() throws SQLException{
		MemberVO member=new MemberVO();
		member.setId("abcd1234");
		member.setPwd("abcd1234");
		member.setEmail("email");
		member.setPhone("01012341234");
		member.setPicture("");
		
		memberDAO.insertMember(member);
		
		MemberVO receiveMember = memberDAO.selectMemberById(member.getId());
		
		Assert.assertEquals(member.getId(),receiveMember.getId());
		
	}

	@Test
	public void testUpdateMember() throws SQLException{
		MemberVO member = memberDAO.selectMemberById("mimi");
		
		String pwd="abcd1234";
		member.setPwd(pwd);
		
		memberDAO.updateMember(member);
		MemberVO receive = memberDAO.selectMemberById("mimi");
		
		Assert.assertEquals(pwd, receive.getPwd());
	}

	@Test
	public void testDeleteMember() throws SQLException{
		String id="mimi";
		MemberVO receiveMember = memberDAO.selectMemberById(id);
		if(receiveMember != null) {
			memberDAO.deleteMember(id);
			MemberVO deletedMember = memberDAO.selectMemberById(id);
			Assert.assertNull(deletedMember);
		}else {
			System.out.println("mimi 회원은 존재하지 않음.");
		}
				
	}

	@Test
	public void testDisableMember() throws SQLException{
		String id="mimi";
		memberDAO.disableMember(id);
		
		MemberVO disabledMember = memberDAO.selectMemberById(id);
		Assert.assertEquals(0,disabledMember.getEnabled());
	}

	@Test
	public void testSelectMemberListCriteria() throws SQLException{
		Criteria cri = new Criteria();
		
		List<MemberVO> memberList = memberDAO.selectMemberList(cri);
		
		Assert.assertEquals(cri.getPerPageNum(), memberList.size());
	}

	@Test
	public void testSelectMemberListCount() throws SQLException{
		Criteria cri=new Criteria();
		cri.setSearchType("i");
		cri.setKeyword("mimi");
		
		int count = memberDAO.selectMemberListCount(cri);		
		
		Assert.assertEquals(1, count);
		
	}

}
