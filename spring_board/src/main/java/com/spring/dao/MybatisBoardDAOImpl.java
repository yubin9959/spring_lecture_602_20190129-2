package com.spring.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.spring.dto.BoardVO;

public class MybatisBoardDAOImpl implements BoardDAO {		
	
	private SqlSession session;
	public void setSession(SqlSession session) {
		this.session=session;
	}
	
	@Override
	public List<BoardVO> selectBoardList() throws SQLException {
		List<BoardVO> boardList=
				session.selectList("Board-Mapper.selectBoardList",null);		
		return boardList;
	}

	@Override
	public BoardVO selectBoardByBno(int bno) throws SQLException {
		BoardVO board=
				session.selectOne("Board-Mapper.selectBoardByBno",bno);
		return board;
	}

	@Override
	public void insertBoard(BoardVO board) throws SQLException {
		session.update("Board-Mapper.insertBoard",board);
	}

	@Override
	public void updateBoard(BoardVO board) throws SQLException {
		session.update("Board-Mapper.updateBoard",board);
	}

	@Override
	public void deleteBoard(int bno) throws SQLException {
		session.update("Board-Mapper.deleteBoard",bno);
	}

	@Override
	public void increaseViewCnt(int bno) throws SQLException {
		session.update("Board-Mapper.increaseViewCnt",bno);
	}

	@Override
	public int selectBoardSeqNext() throws SQLException {
		int seq_num=
				session.selectOne("Board-Mapper.selectBoardSeqNext");
		return seq_num;
	}

}
