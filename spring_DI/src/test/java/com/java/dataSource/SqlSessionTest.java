package com.java.dataSource;

import java.sql.SQLException;
import java.util.Collection;

import org.apache.ibatis.session.SqlSession;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import junit.framework.Assert;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:dataSource-context.xml")
public class SqlSessionTest {
	
	@Autowired
	private SqlSession session;
	
	@Test
	public void sqlSessionTest()throws SQLException{
		Collection<String> mapNames=
		(Collection<String>)session.getConfiguration().getMappedStatementNames();
		
		Assert.assertTrue(mapNames.contains("MemberMapper.selectSearchMemberList"));
	}
}







