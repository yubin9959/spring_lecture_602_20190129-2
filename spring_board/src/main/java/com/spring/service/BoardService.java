package com.spring.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.spring.dto.BoardVO;
import com.spring.request.Criteria;

public interface BoardService {
	
	// 목록조회
	List<BoardVO> getBoardList()throws SQLException;
	Map<String,Object> getBoardList(Criteria cri)throws SQLException;
	
	// 상세보기
	BoardVO getBoard(int bno)throws SQLException;	
	BoardVO getBoardForModify(int bno)throws SQLException;
		
	// 등록
	void write(BoardVO board)throws SQLException;
		
	// 수정
	void modify(BoardVO board)throws SQLException;
	
	// 삭제
	void remove(int bno)throws SQLException;
}




