package com.spring.utils;

import java.awt.image.BufferedImage;
import java.io.File;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.imgscalr.Scalr;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.FileCopyUtils;

public class UploadFileUtils {

	private static final Logger logger=
			LoggerFactory.getLogger(UploadFileUtils.class);
	
	//uloadFile 저장
	public static String uploadFile(String uploadPath,
								    String originalName,
								    String loginUser_id,
								    byte[] fileData)throws Exception{
		
		//중복파일명 해결..
		UUID uid=UUID.randomUUID();
		String saveName=uid.toString().replace("-", "")+"$$"+originalName;
		
		//저장 경로..
		String savePath=calcPath(uploadPath,loginUser_id);
		
		//저장....
		File target=new File(uploadPath+savePath,saveName);
		FileCopyUtils.copy(fileData, target);
		logger.info(target.getAbsolutePath());
		
		
		//썸네일 만들기
		String uploadFileName=null;
		String formatName=originalName.substring(originalName.lastIndexOf(".")+1);
		
		if(MediaUtils.getMediaType(formatName)!=null){
			//이미지 썸네일 생성.			
			//uploadFileName = 썸네일 이미지 파일명(경로포함)
			uploadFileName=makeThumbnail(uploadPath,savePath,saveName);
		}else{
			//uploadFileName= 저장된 원본 파일명.(경로포함)
			uploadFileName=makeIcon(uploadPath,savePath,saveName);
		}
		return uploadFileName;
	}
	
	public static String calcPath(String uploadPath,String loginUser_id)throws Exception{
		Calendar cal=Calendar.getInstance();
		
		String yearPath=File.separator+cal.get(Calendar.YEAR);
		String monthPath=yearPath+File.separator+
				new DecimalFormat("00").format(cal.get(Calendar.MONTH)+1);
		String datePath=monthPath+File.separator+
				new DecimalFormat("00").format(cal.get(Calendar.DATE));
		
		String savePath = File.separator+loginUser_id+datePath;
		File path = new File(uploadPath+savePath);
		
		if(!path.exists()) {
			path.mkdirs();
		}		
		
		logger.info(savePath);
		
		return savePath;
	} 
	
	
	
	//썸네일 형태
	public static String makeThumbnail(String uploadPath,
									  String path,
									  String fileName)throws Exception{
		BufferedImage sourceImg=
				ImageIO.read(new File(uploadPath+path,fileName));
		
		BufferedImage destImg=Scalr.resize(sourceImg, 
								Scalr.Method.AUTOMATIC,
								Scalr.Mode.FIT_TO_HEIGHT,100);
		
		String thumbnailName=uploadPath+path+File.separator+"s_"+fileName;
		File newFile=new File(thumbnailName);
		String formatName=fileName.substring(fileName.lastIndexOf(".")+1);
		ImageIO.write(destImg, formatName.toUpperCase(),newFile);
		
		return thumbnailName.substring(uploadPath.length()).
				replace(File.separatorChar,'/');
	}
	
	//원본파일형태
	public static String makeIcon(String uploadPath,
								  String path,
								  String fileName) throws Exception{
		
		String iconName=uploadPath+path+File.separator+fileName;
		
		return iconName.substring(uploadPath.length())
					   .replace(File.separatorChar, '/');
	}	
	
}
