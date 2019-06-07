package com.spring.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.spring.dto.MemberVO;
import com.spring.service.MemberService;

@Controller
public class CommonController {

	@Resource(name = "memberService")
	private MemberService memberService;

	@RequestMapping(value = "/common/login", method = RequestMethod.GET)
	public String loginGET() {
		return "common/login";
	}

	@RequestMapping(value = "/common/login", method = RequestMethod.POST)
	public void loginPOST(LoginRequest loginReq, HttpServletResponse response) 
				throws SQLException, IOException {

		MemberVO member = memberService.getMember(loginReq.getId());
		String message = "";

		if (member != null) {
			if (loginReq.getPwd().equals(member.getPwd())) {
				message="로그인에 성공했습니다.";
				
			} else {// 패스워드 불일치
				message="패스워드가 일치하지 않습니다.";
			}
		} else { // 아이디가 존재하지 않음.
			message="존재하지 않는 아이디입니다.";
		}
		
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out=response.getWriter();
		out.println("<script>alert('"+message+"');</script>");		
	}

}
