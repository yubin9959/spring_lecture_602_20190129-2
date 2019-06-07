package com.spring.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;

import com.spring.dto.MemberVO;
import com.spring.request.Criteria;

//@Repository("memberDAO") //<bean id="memberDAO" class="com.spring.dao.MybatisMemberDAOImpl" />
public class MybatisMemberDAOImpl implements MemberDAO{
	
	private SqlSession session;
	
	//@Autowired
	public void setSession(SqlSession session) {
		this.session=session;
	} 
	
	@Override
	public List<MemberVO> selectMemberList() throws SQLException {		
		List<MemberVO> memberList=
				session.selectList("Member-Mapper.selectMemberList",null);
		return memberList;
	}

	@Override
	public MemberVO selectMemberById(String id) throws SQLException {
		MemberVO member=
				session.selectOne("Member-Mapper.selectMemberById",id);			
		return member;
	}

	@Override
	public void insertMember(MemberVO member) throws SQLException {
		session.update("Member-Mapper.insertMember",member);
	}

	@Override
	public void updateMember(MemberVO member) throws SQLException {
		session.update("Member-Mapper.updateMember",member);
	}

	@Override
	public void deleteMember(String id) throws SQLException {
		session.update("Member-Mapper.deleteMember",id);
	}
	@Override
	public void disableMember(String id) throws SQLException {
		session.update("Member-Mapper.disableMember",id);
		
	}
	@Override
	public List<MemberVO> selectMemberList(Criteria cri) throws SQLException {
		int offset = cri.getPageStartRowNum();
		int limit = cri.getPerPageNum();
		RowBounds rowBounds = new RowBounds(offset,limit);
		
		List<MemberVO> memberList = null;
		
		memberList=session.selectList("Member-Mapper.selectSearchMemberList",cri,rowBounds);
		return memberList;
	}
	@Override
	public int selectMemberListCount(Criteria cri) throws SQLException {
		
		List<MemberVO> memberList = null;
		
		memberList=session.selectList("Member-Mapper.selectSearchMemberList",cri);
		
		return memberList.size();
	}
	
}
