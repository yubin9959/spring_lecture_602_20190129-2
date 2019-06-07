package com.spring.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.spring.dto.NoticeVO;
import com.spring.request.Criteria;

public interface NoticeService {
	
	public Map<String,Object> getNoticeList(Criteria cri)throws SQLException;
	public List<NoticeVO> getPointNoticeList(Criteria cri)throws SQLException;
	public NoticeVO getNotice(int nno)throws SQLException;
		
	public void regist(NoticeVO notice)throws SQLException;
	public void modify(NoticeVO notice)throws SQLException;
	public void remove(int nno)throws SQLException;
	
	public NoticeVO read(int nno)throws SQLException;	
	

}
