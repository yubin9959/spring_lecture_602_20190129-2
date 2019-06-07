package com.spring.dto;

import java.util.Date;

public class NoticeAttachVO {
	
	private int nano;
	private String uploadPath;
	private String fileName;
	private String fileType;
	private int nno;
	private String attacher;
	private Date regDate;
	
	
	public int getNano() {
		return nano;
	}
	public void setNano(int nano) {
		this.nano = nano;
	}
	public String getUploadPath() {
		return uploadPath;
	}
	public void setUploadPath(String uploadPath) {
		this.uploadPath = uploadPath;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getFileType() {
		return fileType;
	}
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
	public int getNno() {
		return nno;
	}
	public void setNno(int nno) {
		this.nno = nno;
	}
	public String getAttacher() {
		return attacher;
	}
	public void setAttacher(String attacher) {
		this.attacher = attacher;
	}
	public Date getRegDate() {
		return regDate;
	}
	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}
	@Override
	public String toString() {
		return "NoticeAttachVO [nano=" + nano + ", uploadPath=" + uploadPath + ", fileName=" + fileName + ", fileType="
				+ fileType + ", nno=" + nno + ", attacher=" + attacher + ", regDate=" + regDate + "]";
	}
	
	
	
}
