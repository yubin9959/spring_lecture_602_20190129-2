package com.spring.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.dto.MemberVO;
import com.spring.dto.NoticeAttachVO;
import com.spring.dto.NoticeVO;
import com.spring.service.NoticeService;
import com.spring.utils.MediaUtils;
import com.spring.utils.UploadFileUtils;

@RestController
public class AttachController {
	
	private static final Logger logger=
			LoggerFactory.getLogger(AttachController.class);
	
	@Resource(name="uploadPath")
	private String uploadPath;
	
	@Autowired
	private NoticeService noticeService;
	
	
	@RequestMapping(value="/upload",method=RequestMethod.POST,
			        produces="text/plain;charset=utf-8")
	public ResponseEntity<String> upload(MultipartFile file,HttpSession session)throws Exception{
		
		logger.info("originalName : "+file.getOriginalFilename());
		logger.info("size : "+file.getSize());
		logger.info("contentType : "+file.getContentType());
		
		MemberVO loginUser = (MemberVO)session.getAttribute("loginUser");
		String loginUser_id = loginUser.getId();
		
		return new ResponseEntity<String>(UploadFileUtils.uploadFile(uploadPath, 
										  file.getOriginalFilename(), 
										  loginUser_id,
				                          file.getBytes()),
					    			      HttpStatus.CREATED);
		
	}
	
	@RequestMapping(value="/displayFile",method=RequestMethod.GET)
	public ResponseEntity<byte[]> displayFile(String fileName)
												throws Exception{
		InputStream in=null;
		ResponseEntity<byte[]> entity=null;
		
		logger.info("File name : "+fileName);
		
		String formatName=fileName.substring(fileName.lastIndexOf(".")+1);
		MediaType mType=MediaUtils.getMediaType(formatName);
		HttpHeaders headers=new HttpHeaders();
		
		fileName=fileName.replace('/', File.separatorChar);
		
		try{
			in=new FileInputStream(uploadPath+fileName);
			
			if(mType!=null){
				headers.setContentType(mType);
			}else{
				fileName=fileName.substring(fileName.indexOf("$$")+2);
				
				headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
				headers.add("Content-Disposition","attachment;filename=\""
						+new String(fileName.getBytes("utf-8"),"ISO-8859-1")
						+"\"");
			}
			entity=new ResponseEntity<byte[]>(IOUtils.toByteArray(in),
											headers,HttpStatus.CREATED);
		}catch(IOException e){
			e.printStackTrace();
			entity=new ResponseEntity<byte[]>(HttpStatus.INTERNAL_SERVER_ERROR);
		}finally{
			in.close();
		}
		return entity;
		
	}
	
	@RequestMapping(value="/deleteFile",method=RequestMethod.POST)
	public ResponseEntity<String> deleteFile(String fileName)
										throws Exception{
		
		logger.info("delete fileName : "+fileName);
		
		String formatName=fileName.substring(fileName.lastIndexOf(".")+1);
		MediaType mType=MediaUtils.getMediaType(formatName);
		
		if(mType!=null){
			String front=fileName.substring(0, 12);
			String end=fileName.substring(14);
			new File(uploadPath+(front+end).replace('/', File.separatorChar))
				.delete();			
		}
		new File(uploadPath+fileName.replace('/', File.separatorChar)).delete();
		
		return new ResponseEntity<String>("deleted",HttpStatus.OK);
	}
	
	@RequestMapping(value="/getAttach/{nno}",method=RequestMethod.GET)	
	public List<NoticeAttachVO> getAttach(@PathVariable("nno")int nno)
									throws Exception{
		NoticeVO notice=noticeService.getNotice(nno);
		List<NoticeAttachVO> attachList=notice.getAttachList();
		return attachList;
	}
	
	@RequestMapping(value="/deleteAllFiles",method=RequestMethod.POST)
	public ResponseEntity<String> deleteFiles(
									@RequestParam(value="files[]",defaultValue="")String[] files)
										throws Exception{
		
		logger.info("delete all files: "+files);
		
		if(files==null || files.length==0){
			return new ResponseEntity<String>("deleted",HttpStatus.OK);
		}
		
		for(String fileName:files){
			String formatName=
					fileName.substring(fileName.lastIndexOf(".")+1);
			MediaType mType=MediaUtils.getMediaType(formatName);
			
			if(mType!=null){
				String front=fileName.substring(0, 12);
				String end=fileName.substring(14);
				new File(uploadPath+(front+end).replace('/',File.separatorChar))
											   .delete();				
			}
			
			new File(uploadPath+fileName.replace('/',File.separatorChar))
			                                   .delete();
			
		}
		return new ResponseEntity<String>("deleted",HttpStatus.OK);
	}
	
}
