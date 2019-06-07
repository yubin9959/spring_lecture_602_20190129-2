package com.spring.controller;

import org.springframework.web.multipart.MultipartFile;

public class FileCommand {
	
	private String title;
	private MultipartFile file;
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public MultipartFile getFile() {
		return file;
	}
	public void setFile(MultipartFile file) {
		this.file = file;
	}
	@Override
	public String toString() {
		return "FileCommand [title=" + title + ", file=" + file + "]";
	}
}
