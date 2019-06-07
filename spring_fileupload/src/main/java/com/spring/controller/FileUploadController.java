package com.spring.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.spring.utils.MediaUtils;
import com.spring.utils.UploadFileUtils;

@Controller
public class FileUploadController {

	private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

	@RequestMapping(value = "/multipartFile", method = RequestMethod.POST)
	public String uploadByMultipartFile(@RequestParam(value = "title", defaultValue = "제목없음") String title,
			@RequestParam("file") MultipartFile multi, HttpServletRequest request, HttpServletResponse response,
			Model model) throws Exception {

		/* 파일유무확인 */
		if (multi.isEmpty()) {
			response.setContentType("text/html;charset=utf-8");
			PrintWriter out = response.getWriter();
			out.println("<script>alert('파일이 없습니다.!');</script>");
			out.println("<script>history.go(-1);</script>");
			return null;
		}
		/* 용량제한 5MB */
		if (multi.getSize() > 1024 * 1024 * 5) {
			response.setContentType("text/html;charset=utf-8");
			PrintWriter out = response.getWriter();
			out.println("<script>alert('용량초과 입니다!');</script>");
			out.println("<script>history.go(-1);</script>");
			return null;
		}

		/* 파일저장폴더설정 */
		String uploadPath = request.getSession().getServletContext().getRealPath("resources/upload");

		/* 파일명 중복방지 */
		String fileName = UUID.randomUUID().toString().replace("-", "") + "$$" + multi.getOriginalFilename();

		/* 파일 경로확인 및 생성 */
		File file = new File(uploadPath, fileName);

		if (!file.exists()) {
			file.mkdirs();
		}

		/* 파일저장 */
		multi.transferTo(file);

		model.addAttribute("title", title);
		model.addAttribute("originalFileName", multi.getOriginalFilename());
		model.addAttribute("uploadedFileName", file.getName());
		model.addAttribute("uploadPath", file.getAbsolutePath());

		return "fileUploaded";
	}

	@RequestMapping(value = "/multipartHttpServletRequest", method = RequestMethod.POST)
	public String uploadByMultipartHttpServletRequest(MultipartHttpServletRequest request, HttpServletResponse response,
			Model model) throws Exception {

		String title = request.getParameter("title");
		MultipartFile multi = request.getFile("file");

		/* 파일유무확인 */
		if (multi.isEmpty()) {
			response.setContentType("text/html;charset=utf-8");
			PrintWriter out = response.getWriter();
			out.println("<script>alert('파일이 없습니다.!');</script>");
			out.println("<script>history.go(-1);</script>");
			return null;
		}
		/* 용량제한 5MB */
		if (multi.getSize() > 1024 * 1024 * 5) {
			response.setContentType("text/html;charset=utf-8");
			PrintWriter out = response.getWriter();
			out.println("<script>alert('용량초과 입니다!');</script>");
			out.println("<script>history.go(-1);</script>");
			return null;
		}

		/* 파일저장폴더설정 */
		String uploadPath = request.getSession().getServletContext().getRealPath("resources/upload");

		/* 파일명 중복방지 */
		String fileName = UUID.randomUUID().toString().replace("-", "") + "$$" + multi.getOriginalFilename();

		/* 파일 경로확인 및 생성 */
		File file = new File(uploadPath, fileName);

		if (!file.exists()) {
			file.mkdirs();
		}

		/* 파일저장 */
		multi.transferTo(file);

		model.addAttribute("title", title);
		model.addAttribute("originalFileName", multi.getOriginalFilename());
		model.addAttribute("uploadedFileName", file.getName());
		model.addAttribute("uploadPath", file.getAbsolutePath());

		return "fileUploaded";
	}

	@RequestMapping(value = "/commandObject", method = RequestMethod.POST)
	public String uploadByCommandObject(FileCommand command, HttpServletRequest request, HttpServletResponse response,
			Model model) throws Exception {

		MultipartFile multi = command.getFile();
		String title = command.getTitle();

		/* 파일유무확인 */
		if (multi.isEmpty()) {
			response.setContentType("text/html;charset=utf-8");
			PrintWriter out = response.getWriter();
			out.println("<script>alert('파일이 없습니다.!');</script>");
			out.println("<script>history.go(-1);</script>");
			return null;
		}
		/* 용량제한 5MB */
		if (multi.getSize() > 1024 * 1024 * 5) {
			response.setContentType("text/html;charset=utf-8");
			PrintWriter out = response.getWriter();
			out.println("<script>alert('용량초과 입니다!');</script>");
			out.println("<script>history.go(-1);</script>");
			return null;
		}

		/* 파일저장폴더설정 */
		String uploadPath = request.getSession().getServletContext().getRealPath("resources/upload");

		/* 파일명 중복방지 */
		String fileName = UUID.randomUUID().toString().replace("-", "") + "$$" + multi.getOriginalFilename();

		/* 파일 경로확인 및 생성 */
		File file = new File(uploadPath, fileName);

		if (!file.exists()) {
			file.mkdirs();
		}

		/* 파일저장 */
		multi.transferTo(file);

		model.addAttribute("title", title);
		model.addAttribute("originalFileName", multi.getOriginalFilename());
		model.addAttribute("uploadedFileName", file.getName());
		model.addAttribute("uploadPath", file.getAbsolutePath());

		return "fileUploaded";
	}

	
	@Resource(name="uploadPath")
	private String uploadPath;
	
	
	@RequestMapping(value = "/uploadAjax", method = RequestMethod.POST, produces = "text/plain;charset=utf-8")
	@ResponseBody
	public ResponseEntity<String> uploadAjax(MultipartFile file) throws Exception {

		logger.info("originalName : " + file.getOriginalFilename());
		logger.info("size : " + file.getSize());
		logger.info("contentType : " + file.getContentType());	
		
		return new ResponseEntity<String>(
				UploadFileUtils.uploadFile(
						uploadPath, file.getOriginalFilename(),file.getBytes()),
						HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/displayFile",method=RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<byte[]> displayFile(String fileName)
										throws Exception{
		
		InputStream in=null;
		ResponseEntity<byte[]> entity=null;
		logger.info("File name : "+fileName);
		
		try{
			String formatName=fileName.substring(fileName.lastIndexOf(".")+1);
			MediaType mType=MediaUtils.getMediaType(formatName);
			HttpHeaders headers=new HttpHeaders();
			
			fileName=fileName.replace('/', File.separatorChar);
			in=new FileInputStream(uploadPath+fileName);
			
			if(mType!=null){
				headers.setContentType(mType);
			}else{
				fileName=fileName.substring(fileName.indexOf("_")+1);
				headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
				headers.add("Content-Disposition","attachment;filename=\""
							+new String(fileName.getBytes("utf-8"),"ISO-8859-1")
							+"\"");				
			}
			
			entity=new ResponseEntity<byte[]>(IOUtils.toByteArray(in),
					headers,HttpStatus.CREATED);
		}catch(IOException e){
			e.printStackTrace();
			entity=new ResponseEntity<byte[]>
							(HttpStatus.INTERNAL_SERVER_ERROR);
		}finally{
			in.close();
		}
		return entity;
	}
	
	@RequestMapping(value="/deleteFile",method=RequestMethod.POST)
	@ResponseBody
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
	
	
}





