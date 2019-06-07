package com.spring.service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.spring.dao.NoticeAttachDAO;
import com.spring.dao.NoticeDAO;
import com.spring.dto.NoticeAttachVO;
import com.spring.dto.NoticeVO;
import com.spring.request.Criteria;
import com.spring.request.PageMaker;

public class NoticeServiceImpl implements NoticeService {
	
	@Autowired
	private NoticeDAO noticeDAO;
	public void setNoticeDAO(NoticeDAO noticeDAO) {
		this.noticeDAO=noticeDAO;		
	}
	
	@Autowired
	private NoticeAttachDAO attachDAO;
	public void setNoticeAttachDAO(NoticeAttachDAO attachDAO) {
		this.attachDAO=attachDAO;
	}

	@Override
	public Map<String,Object> getNoticeList(Criteria cri) throws SQLException {
		List<NoticeVO> noticeList = noticeDAO.selectSearchNoticeList(cri);
		List<NoticeVO> pointNoticeList = getPointNoticeList(cri);
	
		for(NoticeVO notice : noticeList) {
			notice=getNotice(notice.getNno());
		}
		
		PageMaker pageMaker=new PageMaker();
		pageMaker.setCri(cri);
		pageMaker.setTotalCount(noticeDAO.selectSearchNoticeListCount(cri));
		
		Map<String,Object> dataMap = new HashMap<String,Object>();
		dataMap.put("noticeList", noticeList);
		dataMap.put("pointNoticeList", pointNoticeList);
		dataMap.put("pageMaker", pageMaker);
		return dataMap;
	}

	@Override
	public  List<NoticeVO> getPointNoticeList(Criteria cri) throws SQLException {
		List<NoticeVO> noticeList = noticeDAO.selectPointNoticeList(cri);
		
		for(NoticeVO notice : noticeList) {
			notice=getNotice(notice.getNno());
		}
		
		return noticeList;
	}

	@Override
	public NoticeVO getNotice(int nno) throws SQLException {
		NoticeVO notice = noticeDAO.selectNoticeByNno(nno);
		
		List<NoticeAttachVO> attachList=attachDAO.selectAttachesByNno(nno);
		notice.setAttachList(attachList);
		
		return notice;
	}

	@Override
	public void regist(NoticeVO notice) throws SQLException {
		
		int nno = noticeDAO.selectNoticeSeqNext();
		notice.setNno(nno);
		
		noticeDAO.insertNotice(notice);
		for(NoticeAttachVO attach:notice.getAttachList()) {
			attach.setNno(nno);
			attach.setAttacher(notice.getWriter());
			
			attachDAO.insertAttach(attach);
		}
	}

	@Override
	public void modify(NoticeVO notice) throws SQLException {
		noticeDAO.updateNotice(notice);		
		
		attachDAO.deleteAllAttach(notice.getNno());
		for(NoticeAttachVO attach:notice.getAttachList()) {
			attach.setNno(notice.getNno());
			attach.setAttacher(notice.getWriter());
			
			attachDAO.insertAttach(attach);
		}
	}

	@Override
	public void remove(int nno) throws SQLException {
		noticeDAO.deleteNotice(nno);
	}

	@Override
	public NoticeVO read(int nno) throws SQLException {
		NoticeVO notice=noticeDAO.selectNoticeByNno(nno);
		List<NoticeAttachVO> attachList=attachDAO.selectAttachesByNno(nno);
		notice.setAttachList(attachList);
		noticeDAO.increaseViewCnt(nno);
		
		return notice;
	}

}
