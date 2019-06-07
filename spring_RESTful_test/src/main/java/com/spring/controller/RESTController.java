package com.spring.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.spring.dto.SampleVO;
import com.spring.dto.SampleVOList;

@RestController
public class RESTController {
	

	@RequestMapping("/string")
	public String testRest() throws Exception {
		return "Restful test";
	}

	@RequestMapping("/jsonData")
	public SampleVO jsonData() throws Exception {

		SampleVO vo = new SampleVO("kim", "mimi");

		return vo;
	}

	// JSON sender : 1 depth
	@RequestMapping(value = "/jsonList", method = RequestMethod.GET)
	public List<SampleVO> jsonList() throws Exception {

		List<SampleVO> list = new ArrayList<SampleVO>();
		for (int i = 0; i < 5; i++) {
			SampleVO vo = new SampleVO("kim" + i, "mimi" + i);
			list.add(vo);
		}

		return list;
	}

	// JSON sender : 2 depth
	@RequestMapping(value = "/jsonSampleList", method = RequestMethod.GET)
	public SampleVOList jsonSampleList() throws Exception {
		
		SampleVOList sampleList = new SampleVOList();
		
		List<SampleVO> list = new ArrayList<SampleVO>();
		for (int i = 0; i < 5; i++) {
			SampleVO vo = new SampleVO("kim" + i, "mimi" + i);
			list.add(vo);
		}
		
		sampleList.setSampleList(list);
		
		return sampleList;
	}
	
	@RequestMapping("/rs/receiveJson")
	public String receiveJson(SampleVO sample)throws Exception{
		System.out.println(sample);
		
		return "Success";
	}
	
	@RequestMapping("/rs/receiveJsonArray")
	public String receiveJsonArray(@RequestBody List<SampleVO> sampleList)
													throws Exception{
		System.out.println(sampleList);
		return "Success";
	}
	
	@RequestMapping("/rs/receiveJsonMap")
	public String receiveJsonJson(@RequestBody 
			                SampleVOList sampleMap ) throws Exception{
		
		List<SampleVO> sampleList=sampleMap.getSampleList();
		for(SampleVO sample:sampleList) {
			System.out.println(sample);
		}
		
		return "Success";
	}
	
}







