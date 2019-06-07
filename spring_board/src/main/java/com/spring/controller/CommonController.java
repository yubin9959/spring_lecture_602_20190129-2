package com.spring.controller;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.spring.dto.MemberVO;
import com.spring.exception.IdNotFoundException;
import com.spring.exception.InvalidPasswordException;
import com.spring.service.MemberService;

@Controller
public class CommonController {
	
	@Autowired
	private MemberService memberService;
	
	
	@RequestMapping(value="/",method=RequestMethod.GET)
	public String mainGET() {
		return "main";
	}
	
	@RequestMapping(value="/commons/login",method=RequestMethod.GET)
	public void loginForm() {}
	
	@RequestMapping(value="/commons/login",method=RequestMethod.POST)
	public String loginPost(LoginRequest loginReq,
							HttpSession session,
							RedirectAttributes rttr) throws SQLException{
		String url="redirect:/";
		
		String message="";
		
		try {
			memberService.login(loginReq.getId(), loginReq.getPwd());			
			MemberVO member=memberService.getMember(loginReq.getId());
			session.setAttribute("loginUser", member);
			message="로그인 하셨습니다.";
		} catch(IdNotFoundException e) {
			url="redirect:login";
			message="존재하지 않는 아이디입니다.";			
		}catch(InvalidPasswordException e) {
			url="redirect:login";
			message="패스워드가 불일치합니다.";
		}
		
		Map<String,String> paramMap = new HashMap<String,String>();
		paramMap.put("id",loginReq.getId());
		paramMap.put("message",message);
				
		rttr.addFlashAttribute("paramMap",paramMap);
		
		return url;
	}
	
	@RequestMapping(value="/commons/logout",method=RequestMethod.GET)
	public String logout(HttpSession session) {
		String url="redirect:login";
		session.invalidate();
		return url;
	}
}








