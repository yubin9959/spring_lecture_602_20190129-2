package com.spring.controller;

import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.spring.dto.BoardVO;
import com.spring.dto.NoticeVO;
import com.spring.request.Criteria;
import com.spring.service.BoardService;
import com.spring.service.NoticeService;
import com.spring.service.PdsService;
import com.spring.service.ReplyService;

@Controller
@RequestMapping("/board")
public class BoardController {
	
	@Autowired
	private BoardService bService;
	@Autowired
	private ReplyService rService;
	@Autowired
	private PdsService pService;
	@Autowired
	private NoticeService nService;
	
	
	@ModelAttribute("subMenuList")
	public List<String[]> subMenuModel(){
		List<String[]> subMenuList=new ArrayList<String[]>();
		subMenuList.add(new String[]{"통합검색","search"});
		subMenuList.add(new String[]{"최근글목록",""});
		subMenuList.add(new String[]{"공지사항","notice/list"});
		subMenuList.add(new String[]{"자유게시판","free/list"});
		subMenuList.add(new String[]{"자료실","pds/list"});
		return subMenuList;
	}
	
	@RequestMapping(value="/",method=RequestMethod.GET)
	public String boardMain() {
		String url="board/board_main";				
		return url;
	}
	
	@RequestMapping("/free/list")
	public ModelAndView freeList(Criteria cri,ModelAndView modelnView) 
							 		throws SQLException{
		
		String url="board/free/free_list";
		
		Map<String,Object> dataMap = bService.getBoardList(cri);
		
		modelnView.addObject("dataMap",dataMap);
		modelnView.setViewName(url);
		
		return modelnView;		
	}
	
	@RequestMapping("/free/detail")
	public ModelAndView freeDetail(int bno, ModelAndView modelnView) 
										throws SQLException{
		String url="board/free/free_detail";
		
		BoardVO board = bService.getBoard(bno);
		
		modelnView.addObject("board",board);
		modelnView.setViewName(url);
		
		return modelnView;
	}
	
	@RequestMapping("/regist")
	public String registForm() {
		String url="board/regist";
		return url;
	}
	@RequestMapping(value="/modify",method=RequestMethod.GET)
	public void modifyForm(@ModelAttribute("category") String category,
						   int bno,Model model) throws Exception{
		
		BoardVO board = bService.getBoardForModify(bno);
		model.addAttribute("board",board);
	}
	
	@RequestMapping(value="/free/regist",method=RequestMethod.POST)
	public void freeRegist(BoardVO board,HttpServletResponse response)throws Exception{
		String url="redirect:list";
		
		bService.write(board);
		
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out=response.getWriter();
		out.println("<script>");
		out.println("window.opener.location.reload();window.close();");
		out.println("</script>");	
	}
	
	@RequestMapping(value = "/free/modify", method = RequestMethod.POST)
	public void updatePOST(BoardVO board,HttpServletResponse response) throws Exception {

		board.setUpdatedate(new Date());

		bService.modify(board);	
		
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out=response.getWriter();
		out.println("<script>");
		out.println("window.opener.location.reload();");
		out.println("location.href='detail?bno="+board.getBno()+"';");
		out.println("</script>");	

	}
	
	@RequestMapping(value="/remove",method=RequestMethod.GET)
	public void remove(@ModelAttribute("category") String category,
						   int bno,
						   HttpServletResponse response) throws Exception{				
		
		bService.remove(bno);		
		
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out=response.getWriter();
		out.println("<script>");
		out.println("window.opener.location.reload();window.close();");
		out.println("</script>");		
	}
	
	
	
	@RequestMapping("/notice/list")
	public ModelAndView noticeList(Criteria cri,ModelAndView modelnView) 
							 		throws SQLException{
		
		String url="board/notice/notice_list";
		
		Map<String,Object> dataMap = nService.getNoticeList(cri);
		
		modelnView.addObject("dataMap",dataMap);
		modelnView.setViewName(url);
		
		return modelnView;		
	}
	
	@RequestMapping(value="/notice/regist",method=RequestMethod.POST)
	public void noticeRegist(NoticeVO notice,HttpServletResponse response)throws Exception{
		String url="redirect:list";
		
		nService.regist(notice);;
		
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out=response.getWriter();
		out.println("<script>");
		out.println("window.opener.location.reload();window.close();");
		out.println("</script>");	
	}
}







