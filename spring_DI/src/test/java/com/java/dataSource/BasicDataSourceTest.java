package com.java.dataSource;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static junit.framework.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:dataSource-context.xml")
public class BasicDataSourceTest {
	
	@Autowired
	private DataSource dataSource;
	
	private Connection conn;
	
	@Before
	public void init()throws SQLException {
		conn=dataSource.getConnection();
	}
	
	@After
	public void after()throws SQLException{
		if(conn!=null)conn.close();
	}
	
	@Test
	public void testSelectMemberList()throws SQLException{
		Statement stmt=conn.createStatement();
		
		String sql="select * from member";
		
		ResultSet rs=stmt.executeQuery(sql);
		
		List<MemberVO> memberList=new ArrayList<MemberVO>();
		while(rs.next()) {
			MemberVO member=new MemberVO();
			member.setId(rs.getString("id"));
			member.setPwd(rs.getString("pwd"));
			
			memberList.add(member);
		}
		
		rs.close();
		stmt.close();
		
		assertEquals(14, memberList.size());
	}
	
}


class MemberVO{
	private String id;
	private String pwd;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	@Override
	public String toString() {
		return "MemberVO [id=" + id + ", pwd=" + pwd + "]";
	}
	
	
}








