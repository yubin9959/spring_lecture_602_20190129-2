package com.spring.request;

import java.util.Date;

import com.spring.dto.PdsVO;

public class ModifyPdsRequest {
	
	private int pno;
	private String title;
	private String content;
	private String writer;
	
	
	public ModifyPdsRequest() {}
	
	
	public ModifyPdsRequest(int pno, String title, String content, String writer) {
		super();
		this.pno = pno;
		this.title = title;
		this.content = content;
		this.writer = writer;
	}


	public int getPno() {
		return pno;
	}


	public void setPno(int pno) {
		this.pno = pno;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}


	public String getWriter() {
		return writer;
	}


	public void setWriter(String writer) {
		this.writer = writer;
	}


	@Override
	public String toString() {
		return "ModifyPdsRequest [pno=" + pno + ", title=" + title + ", content=" + content + ", writer=" + writer
				+ "]";
	}


	public PdsVO toPdsVO() {
		PdsVO pds = new PdsVO();
		pds.setPno(this.pno);
		pds.setTitle(this.title);
		pds.setContent(this.content);
		pds.setWriter(this.writer);
		pds.setViewcnt(0);
		pds.setRegDate(new Date());
		pds.setUpdatedate(new Date());
		
		return pds;
	}
	
	
}





