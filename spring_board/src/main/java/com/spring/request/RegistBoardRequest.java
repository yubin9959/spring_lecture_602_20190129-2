package com.spring.request;

import java.util.Date;

import com.spring.dto.BoardVO;

public class RegistBoardRequest {
	
	private String title;
	private String content;
	private String writer;
	
	
	public RegistBoardRequest() {}
	public RegistBoardRequest(String title, String content, String writer) {
		super();
		this.title = title;
		this.content = content;
		this.writer = writer;
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
		return "RegistBoardRequest [title=" + title + ", content=" + content + ", writer=" + writer + "]";
	}
	
	public BoardVO toBoardVO() {
		BoardVO board = new BoardVO();
		board.setTitle(this.title);
		board.setContent(this.content);
		board.setWriter(this.writer);
		board.setViewcnt(0);
		board.setRegDate(new Date());
		board.setUpdatedate(new Date());
		
		return board;
	}
	
	
}





