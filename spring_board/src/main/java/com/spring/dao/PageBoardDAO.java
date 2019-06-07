package com.spring.dao;

import java.sql.SQLException;
import java.util.List;

import com.spring.dto.BoardVO;
import com.spring.request.Criteria;

public interface PageBoardDAO extends BoardDAO {
	
	List<BoardVO> selectBoardCriteria(Criteria cri)	throws SQLException;
	int selectBoardCriteriaTotalCount(Criteria cri) throws SQLException;
}
