package com.spring.dao;

import java.sql.SQLException;
import java.util.List;

import com.spring.dto.BoardVO;

public interface BoardDAO {
	
	List<BoardVO> selectBoardList()throws SQLException;
	BoardVO selectBoardByBno(int bno)throws SQLException;
	
	void insertBoard(BoardVO board)throws SQLException;
	void updateBoard(BoardVO board)throws SQLException;
	void deleteBoard(int bno)throws SQLException;
	
	//viewcnt  증가
	void increaseViewCnt(int bno)throws SQLException;
	
	//board_seq.nextval 가져오기
	int selectBoardSeqNext()throws SQLException;
	
}
