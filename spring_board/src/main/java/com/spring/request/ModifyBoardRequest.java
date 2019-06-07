package com.spring.request;

import java.util.Date;

import com.spring.dto.BoardVO;

public class ModifyBoardRequest {
	
	private int bno;
	private String title;
	private String content;
	private String writer;
	
	
	public ModifyBoardRequest() {}
	
	
	public ModifyBoardRequest(int bno, String title, String content, String writer) {
		super();
		this.bno = bno;
		this.title = title;
		this.content = content;
		this.writer = writer;
	}


	public int getBno() {
		return bno;
	}


	public void setBno(int bno) {
		this.bno = bno;
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
		return "ModifyBoardRequest [bno=" + bno + ", title=" + title + ", content=" + content + ", writer=" + writer
				+ "]";
	}


	public BoardVO toBoardVO() {
		BoardVO board = new BoardVO();
		board.setBno(this.bno);
		board.setTitle(this.title);
		board.setContent(this.content);
		board.setWriter(this.writer);
		board.setViewcnt(0);
		board.setRegDate(new Date());
		board.setUpdatedate(new Date());
		
		return board;
	}
	
	
}





