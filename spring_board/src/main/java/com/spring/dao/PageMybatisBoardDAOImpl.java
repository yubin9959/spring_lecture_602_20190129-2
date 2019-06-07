package com.spring.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;

import com.spring.dto.BoardVO;
import com.spring.request.Criteria;

public class PageMybatisBoardDAOImpl implements PageBoardDAO {
	
	private SqlSession session;
	public void setSession(SqlSession session) {
		this.session=session;
	}
	
	private MybatisBoardDAOImpl instance;
	public void setInstance(MybatisBoardDAOImpl instance) {
		this.instance=instance;
	}
	
	@Override
	public List<BoardVO> selectBoardCriteria(Criteria cri) throws SQLException {
		
		int offset=cri.getPageStartRowNum();
		int limit=cri.getPerPageNum();		
		RowBounds rowBounds=new RowBounds(offset,limit);		
		
		List<BoardVO> boardList=
				session.selectList("Board-Mapper.selectSearchBoardList",cri,rowBounds);
		
		return boardList;
	}
	
	@Override
	public int selectBoardCriteriaTotalCount(Criteria cri) throws SQLException {
		List<BoardVO> boardList=
				session.selectList("Board-Mapper.selectSearchBoardList",cri);
		return boardList.size();
	}

	@Override
	public List<BoardVO> selectBoardList() throws SQLException {		
		return instance.selectBoardList();
	}

	@Override
	public BoardVO selectBoardByBno(int bno) throws SQLException {	
		return instance.selectBoardByBno(bno);
	}
	
	@Override
	public void insertBoard(BoardVO board) throws SQLException {
		instance.insertBoard(board);	
	}

	@Override
	public void updateBoard(BoardVO board) throws SQLException {
		instance.updateBoard(board);
	}

	@Override
	public void deleteBoard(int bno) throws SQLException {
		instance.deleteBoard(bno);		
	}

	@Override
	public void increaseViewCnt(int bno) throws SQLException {
		instance.increaseViewCnt(bno);
	}

	@Override
	public int selectBoardSeqNext() throws SQLException {
		return instance.selectBoardSeqNext();
	}

}
