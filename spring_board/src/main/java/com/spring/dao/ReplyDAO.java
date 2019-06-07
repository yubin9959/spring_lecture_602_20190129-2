package com.spring.dao;

import java.sql.SQLException;
import java.util.List;

import com.spring.dto.ReplyVO;
import com.spring.request.Criteria;

public interface ReplyDAO {
	
	void insertReply(ReplyVO reply)throws SQLException;
	void updateReply(ReplyVO reply)throws SQLException;
	void deleteReply(int rno)throws SQLException;
	
	List<ReplyVO> selectReplyListPage(int bno,Criteria cri)	
								throws SQLException;
	int countReply(int bno) throws SQLException;
}





