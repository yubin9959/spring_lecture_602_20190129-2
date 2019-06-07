<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%> 
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<meta name="robots" content="noindex,nofollow">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

<title>자유게시판</title>

<style type="text/css" id="fontFamilyStyleSheet">
body { font-family: 'Malgun Gothic', sans-serif !important; }
</style>

<!-- bootstrap & fontawesome -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/css/bootstrap.min.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/css/font-awesome.min.css" />
		
<!-- page specific plugin styles start -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/dhtmlwindow/1.1/dhtmlwindow.css" type="text/css" />	<!-- DHTML Window Widget v1.1 -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/dhtmlmodal/1.1/modal.css" type="text/css" />	
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/css/jquery-ui.min.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/css/bootstrap-datepicker3.min.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/css/jquery.gritter.min.css" />
<!-- page specific plugin styles end -->

<!-- text fonts -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/css/garam-fonts.min.css" />

<!-- ace styles -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/css/garam.min.css" class="ace-main-stylesheet" id="main-ace-style" />

<!--[if lte IE 9]>
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/css/garam-part2.min.css" class="ace-main-stylesheet" />
<![endif]-->

<!--[if lte IE 9]>
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/css/garam-ie.min.css" />
<![endif]-->

<!-- inline styles related to this page start -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/bxslider/4.1.2/jquery.bxslider.css">
<style>.bx-wrapper { margin-bottom: 0px !important; box-shadow: 0 0 5px transparent; margin: auto;}</style>
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/css/garam.garam.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/css/index.css" />
<style type="text/css">
.marquee { width: 100%; overflow: hidden; background: transparent; } /* 뉴스티커 *//**/
</style>
<!-- inline styles related to this page end -->

<!--[if !IE]> -->
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/jquery.min.js"></script>
<!-- <![endif]-->

</head>
<body class="no-skin formBody">

	<!-- Page Path Begins -->
	<div class="breadcrumbs" id="breadcrumbs">
		<ul class="breadcrumb">
			<li>게시판</li>
			<li class="active">자유게시판</li>
		</ul>
		<span class="breadcrumb-Info">
			<!-- 익명사용 여부확인 -->
			
				<img src="<%=request.getContextPath() %>/resources/commons/images/pp.gif" border="0" align="absmiddle">
				<a href="#" class="maninfo" data-hasqtip="0">
				${board.writer } / 정보시스템</a> <fmt:formatDate value="${board.regDate }" pattern="( yyyy-MM-dd HH:mm:ss )"/>
				
		</span>
	</div>
	<!-- Page Path Ends -->
	<!-- Page Content Begins -->	
	<div class="page-content" style="padding-bottoms:8px;">

	<!-- 상단 우측버튼 -->
	<div class="row">
		<div class="wizard-actions">
			<div style="float:left;">
			<!-- 문서 편집 이력 && 익명사용 -->
			</div>
			
			<div>
				<c:if test="${loginUser.id eq board.writer}">					
				<button type="button" class="btn btn-sm btn-white btn-bold"  onclick="modify_go('free');">
					<i class="red ace-icon fa fa-pencil bigger-120"></i><b>편집</b>
				</button>		
				<button type="button" class="btn btn-sm btn-white btn-bold" onclick="remove_go('free');" >
					<i class="red ace-icon fa fa-trash bigger-120"></i><b>삭제</b>
				</button>		
				</c:if>
				<button type="button" class="btn btn-sm btn-white btn-bold" onclick="javascript:docPrint('document');">
					<i class="grey ace-icon fa fa-print bigger-120"></i><b>인쇄</b>
				</button>
				<button type="button" class="btn btn-sm btn-white btn-bold" onclick="closeDoc();">
					<i class="grey ace-icon fa fa-times bigger-120"></i><b>닫기</b>
				</button>
			</div>
		</div>
		
	</div>
	<!-- 상단 우측버튼 -->
	
	<form id="search" class="form-horizontal" action="/bbs/read.htm?docId=2018042316273647&amp;bbsId=bbs00000000000004&amp;workType=1&amp;moduleId=00000000000000&amp;categoryId=&amp;searchRange=0&amp;listType=L&amp;searchKey=subject&amp;searchValue=" method="post">
	
		<div class="hr_line">&nbsp;</div> 
		<div class="form-group"><!-- label의 for명은 input 개체명과 연관을 가지도록 기술 -->
			<label for="" class="col-xs-4  col-sm-2 control-label no-padding-right bolder g_label">제목</label>
			<div class="col-xs-8  col-sm-10 g_value" style="padding-top: 8px;">${board.title }</div>
		</div>
	
		<!--  본문 영역 -->
		<div class="form-group">
		<div class="col-xs-12  g_value" style="min-height: 250px; padding: 8px 3px 3px; margin: 0px; overflow: auto;">
	  		<p>${board.content}<br></p>
		</div>
		</div>
		
		<table id="btntbl">
			<tr>
				<td class="tblspace09"></td>
			</tr>
		</table>

		<input type="hidden" name="attachobj" value="">
	<!-- 조회시 파일 첨부 컨트롤 삽입 -->
	</form>

	<div id="ajaxIndicator" style="display:none"><span>Loading</span></div>

	<div id="commentArea">
	
	<!-- 의견 쓰기 -->
	<form id="bbsCommentWebForm" class="form-horizontal" action="/bbs/read.htm?docId=2018042316273647&amp;bbsId=bbs00000000000004&amp;workType=1&amp;moduleId=00000000000000&amp;categoryId=&amp;searchRange=0&amp;listType=L&amp;searchKey=subject&amp;searchValue=" method="post">
		<div class="panel panel-info" style="margin:5px 0px;">
	      <div class="panel-heading">
	        <h4 class="panel-title" style="font-size:14px; font-family: inherit;" id="panel-title">
	        	<i class="ace-icon fa fa-quote-left smaller-80"></i>
	        	댓글	- <span id="cmtnum" style="color:#FF6600;">${board.replycnt }</span> 개의 의견이 있습니다.
			 
	        </h4>
	      </div>
	      <div class="panel-body" style="padding: 5px;">			
			<div class="col-xs-12  col-sm-10 g_value" style="border: 0px; padding-top: 8px;">
			<textArea style="width:100%; height:60px; line-height:120%;" id="newReplyText" name="replytext" onkeyup="javascript:TextCount(this);"></textarea>
			<br>
			<a id="editButton" style="display:none;" href="javascript:goCommentSubmit('edit','')">편집</a>		
			<font color="#656565">현재 <span id="tmptext">0</span>/최대 1000byte(한글 500자, 영문 1000자)</font>
			</div>
			<div id="commentSave" style="margin:8px;">
				
				<button type="button" class="btn btn-white btn-xs radius-4" onclick="reply_regist_go();" title="save">
					<i class="red ace-icon fa fa-pencil-square-o bigger-160"></i>
				</button>
			</div>			
	      </div>
	      
		<!-- 	게시판 이미지 max-width 설정 2018-01-15 -->
		<style>
			img{max-width: 820px;}
		</style>
		
		<div id="comment-tab___" class="tab-pane___ active___" style="    margin: 5px 10px;">
			<div class="comments___ ace-scroll___" style="position: relative;">
			<div class="scroll-track___ scroll-active___" style="display: block; sheight: 300px;">
			<div class="scroll-bar___" style="sheight: 232px; top: 0px;"></div>
			</div>
			<div id="repliesDiv" class="scroll-content___" style="smax-height: 300px;">				
			</div>
			<div class='text-center'>
				<ul id="pagination" class="pagination pagination-sm no-margin ">
	
				</ul>
			</div>									
		</div>		
	</div>		      
</div>
     
</form>


<!-- 간단한 의견 목록 끝 -->
</div>
</div>

<!-- Modal -->
<div id="modifyModal" class="modal fade in" >
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title"></h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>        
      </div>
      <div class="modal-body" data-rno>
        <p><input type="text" id="replytext" class="form-control"></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-info" id="replyModBtn">Modify</button>
        <button type="button" class="btn btn-danger" id="replyDelBtn">DELETE</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>            


</body>
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/garam-extra.min.js"></script>

<!-- HTML5shiv and Respond.js for IE8 to support HTML5 elements and media queries -->

<!--[if lte IE 8]>
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/html5shiv.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/respond.js"></script>
<![endif]-->

<!--[if IE]>
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/jquery1x.min.js"></script>
<![endif]-->

<script type="text/javascript">
	if('ontouchstart' in document.documentElement) document.write("<script src='<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
</script>
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/bootstrap.min.js"></script>

<!-- page specific plugin scripts start -->
<script src="<%=request.getContextPath()%>/resources/commons/libs/dhtmlwindow/1.1/dhtmlwindow.js"></script>								<!-- DHTML Window Widget v1.1 -->
<script src="<%=request.getContextPath()%>/resources/commons/libs/dhtmlmodal/1.1/modal.js"></script>									<!-- DHTML Modal window v1.1  -->

<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/jquery-ui.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/jquery.ui.touch-punch.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/bootbox.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/libs/jquery-cookie/jquery.cookie.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/date-time/bootstrap-datepicker.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/date-time/locales/bootstrap-datepicker.kr.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/jquery.gritter.min.js"></script>
<script src='<%=request.getContextPath()%>/resources/commons/scripts/index.js' type="text/javascript"></script>
<!-- page specific plugin scripts end -->
<!-- ace scripts -->
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/garam-elements.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/garam.min.js"></script>

<!-- inline scripts related to this page start -->

<script src="<%=request.getContextPath()%>/resources/commons/scripts/common.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/scripts/garam.garam.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/scripts/parent.reload.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/scripts/organization_selector.js"></script>

<%@ include file="/WEB-INF/views/board/free/free_detail_js.jsp" %>
<%@ include file="/WEB-INF/views/board/free/reply.jsp" %>

</html>





