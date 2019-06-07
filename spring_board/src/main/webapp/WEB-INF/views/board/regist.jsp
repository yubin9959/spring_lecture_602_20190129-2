<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<meta name="robots" content="noindex,nofollow">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<title>게시판&nbsp;새문서</title>


<style type="text/css" id="fontFamilyStyleSheet">
body { 
	font-family: 'Malgun Gothic', sans-serif !important; 
}
.fileDrop{
	width:90%;
	height:100px;
	border:1px dotted gray;
	margin:auto;
}

</style>

<!-- bootstrap & fontawesome -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/css/bootstrap.min.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/css/font-awesome.min.css" />
		
<!-- page specific plugin styles start -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/common/libs/dhtmlwindow/1.1/dhtmlwindow.css" type="text/css" />	<!-- DHTML Window Widget v1.1 -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/common/libs/dhtmlmodal/1.1/modal.css" type="text/css" />			<!-- DHTML Modal window v1.1 -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/css/jquery-ui.min.css" />		<!-- jQuery UI v1.11.4 -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/common/libs/jquery-qtip2/2.2.1/jquery.qtip.min.css">				<!-- jQuery qTip2 v2.2.1 -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/css/bootstrap-datepicker3.min.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/css/ui.jqgrid.min.css" />		<!-- jQuery jqGrid -->

<!-- page specific plugin styles end -->

<!-- text fonts -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/css/garam-fonts.min.css" />

<!-- ace styles -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/css/garam.min.css" class="ace-main-stylesheet" id="main-ace-style" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/common/css/adminLTE.css" />

<!--[if lte IE 9]>
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/css/garam-part2.min.css" class="ace-main-stylesheet" />
<![endif]-->

<!--[if lte IE 9]>
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/css/garam-ie.min.css" />
<![endif]-->

<!-- inline styles related to this page start -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/common/css/garam.garam.css" />

<!-- inline styles related to this page end -->

<!-- ace settings handler -->
<script src="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/js/garam-extra.min.js"></script>

<!-- HTML5shiv and Respond.js for IE8 to support HTML5 elements and media queries -->

<!--[if lte IE 8]>
<script src="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/js/html5shiv.js"></script>
<script src="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/js/respond.js"></script>
<![endif]-->


<!-- basic scripts -->

<!--[if !IE]> -->
<script src="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/js/jquery.min.js"></script>
<!-- <![endif]-->

<!--[if IE]>
<script src="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/js/jquery1x.min.js"></script>
<![endif]-->
<script type="text/javascript">
	var _console = window.console;
	if('ontouchstart' in document.documentElement) document.write("<script src='<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
</script>
<script src="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/js/bootstrap.min.js"></script>

<!-- page specific plugin scripts start -->
<script src="<%=request.getContextPath()%>/resources/common/libs/dhtmlwindow/1.1/dhtmlwindow.js"></script>								<!-- DHTML Window Widget v1.1 -->
<script src="<%=request.getContextPath()%>/resources/common/libs/dhtmlmodal/1.1/modal.js"></script>									<!-- DHTML Modal window v1.1  -->
<script src="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/js/jquery-ui.min.js"></script>					<!-- jQuery UI v1.11.4 -->
<script src="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/js/jquery.ui.touch-punch.min.js"></script>		<!-- jQuery UI Touch Punch v0.2.3 -->
<script src="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/js/bootbox.min.js"></script>						<!-- bootbox.js v4.3.0 -->
<script src="<%=request.getContextPath()%>/resources/common/libs/jquery-cookie/jquery.cookie.js"></script>				<!-- jQuery Cookie Pligin -->
<!-- <script src="<%=request.getContextPath()%>/resources/common/jquery/plugins/jquery.validate.js"></script>								jQuery Validation v1.8.1 -->
<!-- <script src="<%=request.getContextPath()%>/resources/common/libs/jquery-validation/jquery.validate.defaults.js"></script>				jQuery Validation defaults -->
<script src="<%=request.getContextPath()%>/resources/common/libs/jquery-validation/1.15.0/jquery.validate.js"></script>				<!-- jQuery Validation defaults --> 
<script src="<%=request.getContextPath()%>/resources/common/libs/jquery-validation/jquery.validate.defaults.js"></script>				
<script src="<%=request.getContextPath()%>/resources/common/libs/jquery-qtip2/2.2.1/jquery.qtip.min.js"></script>						<!-- jQuery qTip2 v2.2.1 -->
<script src="<%=request.getContextPath()%>/resources/common/jquery/plugins/BlockUI/jquery.blockUI.js"></script>						<!-- jQuery blockUI v2.63 -->
<script src="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/js/date-time/bootstrap-datepicker.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/js/date-time/locales/bootstrap-datepicker.kr.js"></script>
<script src="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/js/jqGrid/jquery.jqGrid.min.js"></script>		<!-- jQuery jqGrid JS v5.0.1 -->
<script src="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/js/jqGrid/i18n/grid.locale-en.js"></script>	<!-- jQuery jqGrid English Translation -->

<!-- page specific plugin scripts end -->

<!-- ace scripts -->
<script src="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/js/garam-elements.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/js/garam.min.js"></script>

<!-- inline scripts related to this page start -->
<script src="<%=request.getContextPath()%>/resources/common/scripts/common.js"></script>
<script src="<%=request.getContextPath()%>/resources/common/scripts/organization_selector.js"></script>
<script src="<%=request.getContextPath()%>/resources/common/scripts/garam.garam.js"></script>
<script src="<%=request.getContextPath()%>/resources/common/scripts/parent.reload.js"></script>
</head>

<body class="no-skin formBody">
	<!-- Page Path Begins -->
	<div class="breadcrumbs" id="breadcrumbs">
		<ul class="breadcrumb">
			<li>
				<i class="ace-icon fa fa-comments-o home-icon bigger-150"></i>
					게시판
			</li>
			<li class="active">
					새문서
			</li>
		</ul>
		<span class="breadcrumb-Info">
				<img src="<%=request.getContextPath()%>/resources/common/images/pp.gif" border="0" align="absmiddle">
				<a href="javascript:ShowUserInfo('20180117182355');" class="maninfo">				
					${loginUser.id } / 정보시스템</a> <fmt:formatDate value="<%=new Date() %>" pattern="( yyyy-MM-dd HH:mm:ss)"/>
		</span>
	</div>
	<!-- Page Path Ends -->
	
	<!-- Page Content Begins -->
	<div class="page-content" style="padding-bottoms:8px;">
	
		<!-- 상단 우측버튼 -->
		<div class="row">
			<div class="wizard-actions">
				<button type="button" class="btn btn-sm btn-white btn-bold" onclick="goSubmit('post','');">
					<i class="red ace-icon fa fa-check bigger-120"></i><b>저장</b>
				</button>
				<button type="button" class="btn btn-sm btn-white btn-bold" onclick="javascript:closeDoc();">
					<i class="grey ace-icon fa fa-times bigger-120"></i><b>닫기</b>
				</button>
			</div>
		</div>
		<!-- 상단 우측버튼 -->
		
<!-- <body style="margin:1px;"> -->
<!-- <div id="pageScroll" class="wrapper"> -->
<form id="registForm" class="form-horizontal" action="/upload" method="post" enctype="multipart/form-data">

	<div class="hr_line">&nbsp;</div>
	<div class="form-group">
		<label for="writer" class="col-xs-4 col-sm-2 control-label no-padding-right bolder g_label required">
		작성자</label>
		<div class="col-xs-8 col-sm-4 g_value">			
			<input id="writer" name="writer" style="width:70%;" class="form-control required" 
				   type="text" value="${loginUser.id }" readonly
				   style="background:#aaa;"/>			
		</div>		
	</div>
	<div class="form-group" style="display:;">
		<label for="bbs.category" class="col-xs-4 col-sm-2 control-label no-padding-right bolder g_label">
			분&nbsp;&nbsp;&nbsp;류</label>
		<div class="col-xs-8 col-sm-10 g_value">			
			<select name="category" onchange="fnChangeCategory();">
				<option value="" >---분류선택---</option>	
				<option value="notice" >공지사항</option>				
				<option value="free" >자유게시판</option>
				<option value="pds" >자료실</option>				
			</select>
		</div>
	</div>	
	<div class="form-group" style="display:none;">
		<label for="dms.hotFlag" class="col-xs-4 col-sm-2 control-label no-padding-right bolder g_label"></label> 
			<div class="col-xs-8 col-sm-10 g_value"></div>
	</div>
	<div class="form-group openDate" style="display: visible;"><!-- 2018-01-18 게시기간 사용안함 -->
		<label for="dms.subject" class="col-xs-4 col-sm-2 control-label no-padding-right bolder g_label">
			게시기간
		</label>
		<div class="col-xs-8 col-sm-10 g_value">
			<input id="openDate" name="startDate" style="color:#919191;" class="dateInput" readonly="readonly" type="text" value='<fmt:formatDate value="<%=new Date() %>" pattern="yyyy-MM-dd" />'/>
				~
			<input id="closeDate" name="endDate" class="dateInput" readonly="readonly" type="text" value="2019-06-30"/>
			<div class="checkbox" style="display:inline;">
				&nbsp;
				<label>
					<input type="checkbox" class="ace" id="never" name="never"><span class="lbl">&nbsp;영구게시</span>
				</label>
			</div>
		</div>
	</div>	
	<div class="form-group bbsId" style="display:visible;">
		<label for="dms.subject" class="col-xs-4 col-sm-2 control-label no-padding-right bolder g_label">
		구&nbsp;&nbsp;&nbsp;분</label>
		<div class="col-xs-8 col-sm-10 g_value">
			<select id="point" name="point" disabled>				
				<option value="">-선택-</option>
			</select>
		</div>
	</div> 
	<div class="form-group preserveId" style="display:visible;">
		<label for="dms.subject" class="col-xs-4 col-sm-2 control-label no-padding-right bolder g_label required">
		보존년한
		</label>
		<div class="col-xs-8 col-sm-10 g_value">
			<select id="bbs.preservePeriod.preserveId" name="bbs.preservePeriod.preserveId" class="fld_100" disabled="disabled">
				<option value="1" selected="selected">사용안함</option>
				<option value="2">2 년</option>
				<option value="3">3 년</option>
				<option value="4">4 년</option>
				<option value="5">5 년</option>
				<option value="10">10 년</option>
				<option value="99">영구보존</option>
			</select>
		</div>
	</div>  

	<!-- 공유권한 -->
	<div class="form-group sharelist" style="display:visible;">
		<label for="" class="col-xs-4 col-sm-2 control-label no-padding-right bolder g_label required">
			공유대상
		</label>
		<div class="col-xs-8 col-sm-10 g_value">
			<select id="sharelist" name="bbsShares" style="height:60px;width:70%;display:none;" class="fld_550" multiple="multiple" disabled="disabled">
				<option value="">사용안함</option>
			</select>
			<input type="hidden" name="_bbsShares" value="1"/>
		</div>
	</div>
	
	<div class="form-group">
		<label for="title" class="col-xs-4 col-sm-2 control-label no-padding-right bolder g_label required">
		제&nbsp;&nbsp;&nbsp;목</label>
		<div class="col-xs-8 col-sm-10 g_value">
			<input id="title" name="title" onkeydown="CheckTextCount(this, 100);" class="form-control required" required="required " type="text" value=""/>
		</div>
	</div>  
	<div class="form-group">
		<label for="content" class="col-xs-4 col-sm-2 control-label no-padding-right bolder g_label required">
		내 용</label>
		<div class="col-xs-8 col-sm-10 g_value">
			<textarea rows="10" cols="" id="content" name="content" onkeydown="CheckTextCount(this, 1000);" class="form-control required" ></textarea>			
		</div>
	</div>  
	<br/>
	<div class="form-group">
		<i class="ace-icon fa fa-folder-open" style="font-size:16px;"></i>
		<i class="ace-icon fa fa-level-down" style="font-size:16px;"></i>
		<span style="">이곳에 파일을 끌어다 놓으십시오</span>
		<div class="fileDrop">
			<ul class="mailbox-attachments clearfix uploadedList"></ul>
		</div>
	</div>	
	
	
		
</form>

</div>
	
<!-- /WEB-INF<%=request.getContextPath()%>/resources/common/file_upload_control.jsp -->


<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/common/libs/jquery-ui-file-upload/css/jquery.fileupload-ui.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/common/css/fileupload.css" />

<!-- Shim to make HTML5 elements usable in older Internet Explorer versions -->
<!--[if lt IE 9]><script src="<%=request.getContextPath()%>/resources/common/libs/html5shim/html5shiv.min.js"></script><![endif]-->

<!-- <script src="<%=request.getContextPath()%>/resources/common/jquery/js/jquery-1.8.0.min.js"></script> -->
<!-- <script src="<%=request.getContextPath()%>/resources/common/jquery/ui/1.8.16/jquery-ui.min.js"></script> -->

<script src="<%=request.getContextPath()%>/resources/common/libs/javascript-templates/tmpl.min.js"></script>

<script src="<%=request.getContextPath()%>/resources/common/libs/jquery-ui-file-upload/js/jquery.iframe-transport.js"></script>
<script src="<%=request.getContextPath()%>/resources/common/libs/jquery-ui-file-upload/js/jquery.fileupload.js"></script>
<script src="<%=request.getContextPath()%>/resources/common/libs/jquery-ui-file-upload/js/jquery.fileupload-fp.js"></script>
<script src="<%=request.getContextPath()%>/resources/common/libs/jquery-ui-file-upload/js/jquery.fileupload-ui.js"></script>
<script src="<%=request.getContextPath()%>/resources/common/libs/jquery-ui-file-upload/js/jquery.fileupload-jui.js"></script>
<script src="<%=request.getContextPath()%>/resources/common/libs/jquery-ui-file-upload/js/locale.js"></script>
<script src="<%=request.getContextPath()%>/resources/common/scripts/fileupload.js"></script>

<!-- The XDomainRequest Transport is included for cross-domain file deletion for IE8+ -->
<!--[if gte IE 8]><script src="<%=request.getContextPath()%>/resources/common/libs/jquery-ui-file-upload/js/cors/jquery.xdr-transport.js"></script><![endif]-->

<%@ include file="./regist_file.jsp" %>	
	

<style>

/* .ui-button-text-icon-primary .ui-button-text, .ui-button-text-icons .ui-button-text { */
/*     padding: .2em .5em .2em 1.1em; */
/* } */
.ui-button-text-icon-primary .ui-button-text, .ui-button-text-icons .ui-button-text {
    padding: 0px 5px 2px;
}
table#fileresult > span.ui-buttojn-text { padding:0px; }

.upload td.name a, .upload td.name span, #dmstbl td.name span {

}
.fileupload-buttonbar .ui-button{margin-bottom:none;}
.fileupload-buttonbar .ui-button, .fileupload-buttonbar .toggle { margin: 1px;}
.upload td.name { font-weight: normal; }

.upload table td { height:25px; padding: 0px 5px; font-weight:normal; '}
.upload td.name { font-weight: normal; }

</style>
<!-- 	</td> -->
<!-- 	</tr> -->
<!-- 	</tbody> -->
<!-- </table> -->




<%@ include file="./regist_js.jsp" %>

</body>
</html>

