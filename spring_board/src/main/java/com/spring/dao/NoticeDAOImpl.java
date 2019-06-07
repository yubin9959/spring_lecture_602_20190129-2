package com.spring.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;

import com.spring.dto.NoticeVO;
import com.spring.request.Criteria;

public class NoticeDAOImpl implements NoticeDAO {

	@Autowired
	private SqlSession session;
	public void setSession(SqlSession session) {
		this.session=session;
	}
	
	@Override
	public List<NoticeVO> selectSearchNoticeList(Criteria cri) throws SQLException {
		int offset = cri.getPageStartRowNum();		
		int limit=cri.getPerPageNum();
		
		RowBounds rowBounds = new RowBounds(offset,limit);
		
		List<NoticeVO> noticeList = session.selectList("Notice-Mapper.selectSearchNoticeList",cri,rowBounds);
		
		return noticeList;
	}
	
	@Override
	public int selectSearchNoticeListCount(Criteria cri) throws SQLException {
		int count = session.selectOne("Notice-Mapper.selectSearchNoticeListCount",cri);
		return count;
	}
	
	@Override
	public List<NoticeVO> selectPointNoticeList(Criteria cri) throws SQLException {
		List<NoticeVO> noticeList = session.selectList("Notice-Mapper.selectPointNoticeList",cri);		
		return noticeList;
	}

	@Override
	public NoticeVO selectNoticeByNno(int nno) throws SQLException {
		NoticeVO notice=session.selectOne("Notice-Mapper.selectNoticeByNno",nno);
		return notice;
	}

	@Override
	public int selectNoticeSeqNext() throws SQLException {
		int nno = session.selectOne("Notice-Mapper.selectNoticeSeqNext");
		return nno;
	}

	@Override
	public void increaseViewCnt(int nno) throws SQLException {
		session.update("Notice-Mapper.increaseViewCnt");
	}

	@Override
	public void insertNotice(NoticeVO notice) throws SQLException {
		session.update("Notice-Mapper.insertNotice",notice);
	}

	@Override
	public void updateNotice(NoticeVO notice) throws SQLException {
		session.update("Notice-Mapper.updateNotice",notice);
	}

	@Override
	public void deleteNotice(int nno) throws SQLException {
		session.update("Notice-Mapper.deleteNotice",nno);
	}

	

}
