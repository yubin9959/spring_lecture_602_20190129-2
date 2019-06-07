package com.spring.dao;

import java.sql.SQLException;
import java.util.List;

import com.spring.dto.NoticeVO;
import com.spring.request.Criteria;

public interface NoticeDAO {
	
	public List<NoticeVO> selectSearchNoticeList(Criteria cri) throws SQLException;
	public int selectSearchNoticeListCount(Criteria cri) throws SQLException;
	public List<NoticeVO> selectPointNoticeList(Criteria cri)throws SQLException;
	public NoticeVO selectNoticeByNno(int nno)throws SQLException;
	
	public int selectNoticeSeqNext()throws SQLException;
	
	public void increaseViewCnt(int nno)throws SQLException;	
	
	public void insertNotice(NoticeVO notice)throws SQLException;
	public void updateNotice(NoticeVO notice)throws SQLException;
	public void deleteNotice(int nno)throws SQLException;
}
