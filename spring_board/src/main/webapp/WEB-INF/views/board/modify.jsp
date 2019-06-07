<%@page import="java.util.Date"%>
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
<title>게시판&nbsp;편집</title>


<style type="text/css" id="fontFamilyStyleSheet">
body { font-family: 'Malgun Gothic', sans-serif !important; }

}


</style>

<!-- bootstrap & fontawesome -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/css/bootstrap.min.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/css/font-awesome.min.css" />
		
<!-- page specific plugin styles start -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/dhtmlwindow/1.1/dhtmlwindow.css" type="text/css" />	<!-- DHTML Window Widget v1.1 -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/dhtmlmodal/1.1/modal.css" type="text/css" />			<!-- DHTML Modal window v1.1 -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/css/jquery-ui.min.css" />		<!-- jQuery UI v1.11.4 -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/jquery-qtip2/2.2.1/jquery.qtip.min.css">				<!-- jQuery qTip2 v2.2.1 -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/css/bootstrap-datepicker3.min.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/css/ui.jqgrid.min.css" />		<!-- jQuery jqGrid -->

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
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/css/garam.garam.css" />

<!-- inline styles related to this page end -->

<!-- ace settings handler -->
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/garam-extra.min.js"></script>

<!-- HTML5shiv and Respond.js for IE8 to support HTML5 elements and media queries -->

<!--[if lte IE 8]>
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/html5shiv.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/respond.js"></script>
<![endif]-->


<!-- basic scripts -->

<!--[if !IE]> -->
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/jquery.min.js"></script>
<!-- <![endif]-->

<!--[if IE]>
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/jquery1x.min.js"></script>
<![endif]-->
<script type="text/javascript">
	var _console = window.console;
	if('ontouchstart' in document.documentElement) document.write("<script src='<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
</script>
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/bootstrap.min.js"></script>

<!-- page specific plugin scripts start -->
<script src="<%=request.getContextPath()%>/resources/commons/libs/dhtmlwindow/1.1/dhtmlwindow.js"></script>								<!-- DHTML Window Widget v1.1 -->
<script src="<%=request.getContextPath()%>/resources/commons/libs/dhtmlmodal/1.1/modal.js"></script>									<!-- DHTML Modal window v1.1  -->
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/jquery-ui.min.js"></script>					<!-- jQuery UI v1.11.4 -->
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/jquery.ui.touch-punch.min.js"></script>		<!-- jQuery UI Touch Punch v0.2.3 -->
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/bootbox.min.js"></script>						<!-- bootbox.js v4.3.0 -->
<script src="<%=request.getContextPath()%>/resources/commons/libs/jquery-cookie/jquery.cookie.js"></script>				<!-- jQuery Cookie Pligin -->
<!-- <script src="<%=request.getContextPath()%>/resources/commons/jquery/plugins/jquery.validate.js"></script>								jQuery Validation v1.8.1 -->
<!-- <script src="<%=request.getContextPath()%>/resources/commons/libs/jquery-validation/jquery.validate.defaults.js"></script>				jQuery Validation defaults -->
<script src="<%=request.getContextPath()%>/resources/commons/libs/jquery-validation/1.15.0/jquery.validate.js"></script>				<!-- jQuery Validation defaults --> 
<script src="<%=request.getContextPath()%>/resources/commons/libs/jquery-validation/jquery.validate.defaults.js"></script>				
<script src="<%=request.getContextPath()%>/resources/commons/libs/jquery-qtip2/2.2.1/jquery.qtip.min.js"></script>						<!-- jQuery qTip2 v2.2.1 -->
<script src="<%=request.getContextPath()%>/resources/commons/jquery/plugins/BlockUI/jquery.blockUI.js"></script>						<!-- jQuery blockUI v2.63 -->
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/date-time/bootstrap-datepicker.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/date-time/locales/bootstrap-datepicker.kr.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/jqGrid/jquery.jqGrid.min.js"></script>		<!-- jQuery jqGrid JS v5.0.1 -->
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/jqGrid/i18n/grid.locale-en.js"></script>	<!-- jQuery jqGrid English Translation -->

<!-- page specific plugin scripts end -->

<!-- ace scripts -->
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/garam-elements.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/garam.min.js"></script>

<!-- inline scripts related to this page start -->
<script src="<%=request.getContextPath()%>/resources/commons/scripts/common.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/scripts/organization_selector.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/scripts/garam.garam.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/scripts/parent.reload.js"></script>
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
					편집
			</li>
		</ul>
		<span class="breadcrumb-Info">
				<img src="<%=request.getContextPath()%>/resources/commons/images/pp.gif" border="0" align="absmiddle">
				<a href="javascript:ShowUserInfo('20180117182355');" class="maninfo">				
					${loginUser.id} / 정보시스템</a> <fmt:formatDate value="<%=new Date() %>" pattern="( yyyy-MM-dd HH:mm:ss)"/>
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
<form id="modifyForm" class="form-horizontal" method="post">
	
	<input type="hidden" name="bno" value="${board.bno }" />
	
	<div class="hr_line">&nbsp;</div>
	<div class="form-group">
		<label for="writer" class="col-xs-4 col-sm-2 control-label no-padding-right bolder g_label required">
		작성자</label>
		<div class="col-xs-8 col-sm-4 g_value">			
			<input id="writer" name="writer" style="width:70%;" class="form-control required" 
				   type="text" value="${board.writer }" readonly
				   style="background:#aaa;"/>			
		</div>		
	</div>
	<div class="form-group">
		<label for="bbs.category" class="col-xs-4 col-sm-2 control-label no-padding-right bolder g_label">
			분&nbsp;&nbsp;&nbsp;류</label>
		<div class="col-xs-8 col-sm-10 g_value">			
			<select name="category" disabled>
				<option value="" >---분류선택---</option>	
				<option value="notice" ${category eq 'notice' ? 'selected':''}>공지사항</option>				
				<option value="free" ${category eq 'free' ? 'selected':''}>자유게시판</option>
				<option value="pds" ${category eq 'pds' ? 'selected':''}>자료실</option>				
			</select>
		</div>
	</div>	
	<div class="form-group" style="display:none;">
		<label for="dms.hotFlag" class="col-xs-4 col-sm-2 control-label no-padding-right bolder g_label"></label> 
			<div class="col-xs-8 col-sm-10 g_value"></div>
	</div>
	<div class="form-group" style="display:${category eq 'free' ? 'none':'block'};"><!-- 2018-01-18 게시기간 사용안함 -->
		<label for="dms.subject" class="col-xs-4 col-sm-2 control-label no-padding-right bolder g_label">
			게시기간
		</label>
		<div class="col-xs-8 col-sm-10 g_value">
			<input id="openDate" name="bbs.openDate" style="color:#919191;" class="dateInput" readonly="readonly" type="text" value="2019-05-30"/>
				~
			<input id="closeDate" name="bbs.closeDate" class="dateInput" readonly="readonly" type="text" value="2019-06-30"/>
			<div class="checkbox" style="display:inline;">
				&nbsp;
				<label>
					<input type="checkbox" class="ace" id="never" name="never"><span class="lbl">&nbsp;영구게시</span>
				</label>
			</div>
		</div>
	</div>	
	<div class="form-group bbsId" style="display:${category eq 'free' ? 'none':'block'};" >
		<label for="dms.subject" class="col-xs-4 col-sm-2 control-label no-padding-right bolder g_label">
		구&nbsp;&nbsp;&nbsp;분</label>
		<div class="col-xs-8 col-sm-10 g_value">
			<select id="bbs.bbsId" name="bbs.bbsId" disabled>				
				<option value="">사용안함</option>
			</select>
		</div>
	</div> 
	<div class="form-group preserveId"  style="display:${category eq 'free' ? 'none':'block'};">
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
	<div class="form-group sharelist" style="display:${category eq 'free' ? 'none':'block'};">
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
			<input id="title" name="title" onkeydown="CheckTextCount(this, 100);" class="form-control required" required="required " type="text" value="${board.title }"/>
		</div>
	</div>  
	<div class="form-group">
		<label for="content" class="col-xs-4 col-sm-2 control-label no-padding-right bolder g_label required">
		내 용</label>
		<div class="col-xs-8 col-sm-10 g_value">
			<textarea rows="10" cols="" id="content" name="content" onkeydown="CheckTextCount(this, 1000);" class="form-control required" >${board.content }</textarea>			
		</div>
	</div>  
	
<!-- /WEB-INF<%=request.getContextPath()%>/resources/commons/file_upload_control.jsp -->


<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/jquery-ui-file-upload/css/jquery.fileupload-ui.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/css/fileupload.css" />

<!-- Shim to make HTML5 elements usable in older Internet Explorer versions -->
<!--[if lt IE 9]><script src="<%=request.getContextPath()%>/resources/commons/libs/html5shim/html5shiv.min.js"></script><![endif]-->

<!-- <script src="<%=request.getContextPath()%>/resources/commons/jquery/js/jquery-1.8.0.min.js"></script> -->
<!-- <script src="<%=request.getContextPath()%>/resources/commons/jquery/ui/1.8.16/jquery-ui.min.js"></script> -->

<script src="<%=request.getContextPath()%>/resources/commons/libs/javascript-templates/tmpl.min.js"></script>

<script src="<%=request.getContextPath()%>/resources/commons/libs/jquery-ui-file-upload/js/jquery.iframe-transport.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/libs/jquery-ui-file-upload/js/jquery.fileupload.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/libs/jquery-ui-file-upload/js/jquery.fileupload-fp.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/libs/jquery-ui-file-upload/js/jquery.fileupload-ui.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/libs/jquery-ui-file-upload/js/jquery.fileupload-jui.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/libs/jquery-ui-file-upload/js/locale.js"></script>
<script src="<%=request.getContextPath()%>/resources/commons/scripts/fileupload.js"></script>

<!-- The XDomainRequest Transport is included for cross-domain file deletion for IE8+ -->
<!--[if gte IE 8]><script src="<%=request.getContextPath()%>/resources/commons/libs/jquery-ui-file-upload/js/cors/jquery.xdr-transport.js"></script><![endif]-->

<%@ include file="./modify_file.jsp" %>	

<input type="hidden" name="filepath" value="bbs" /> 
<input type="hidden" name="nanotime" value="2019053011524995" /> 
<input type="hidden" id="fileuploadstartconfirm" name="fileuploadstartconfirm" value="0" />


<div class="bline" ></div>
<div id="upload" class="upload" style="display:${category eq 'free' ? 'none':'block'};background-color:#f9f9f9; height:166px; max-height:166px; border:1px solid  #6fb3e0; border-radius:2px; ">
	<div class="row______________ fileupload-buttonbar">
<!-- 		<span class="btn btn-success fileinput-button"> -->
		<span class="fileinput-button btn btn-minier btn-inverse">
<!-- 				<i class="ace-icon fa fa-file-text-o"></i> -->
			<span><b>Add files...</b></span>
			<input type="file" name="files[]" data-url="/upload" multiple style="border-width: 0;">
		</span>
		<span style="float:left; margin:6px;">
		<i class="ace-icon fa fa-folder-open" style="font-size:16px;"></i>
		<i class="ace-icon fa fa-level-down" style="font-size:16px;"></i>
		<span style="">이곳에 파일을 끌어다 놓으십시오</span>
		</span>
		<button type="submit" class="btn btn-minierall btn-white start hide">
			<i class="icon-upload icon-white"></i>
			<span><b>Start</b></span>
		</button>
		<button type="button" class="btn btn-minier btn-white delete">
			<i class="red ace-icon fa fa-trash-o bigger-120"></i>
			<span><b>Delete</b></span>
		</button> 
		<button type="reset" class="btn btn-minier btn-white cancel" style="margin-left: 9px; margin-right: 4px;">
<!-- 			<i class="icon-ban-circle icon-white"></i> -->
			<i class="red ace-icon fa fa-ban bigger-120"></i>
			<span><b>Reset</b></span>
		</button>
		
		<div style="height:130px; max-height:130px; width:100%; overflow-y:auto;">
		<table id="fileresult" border="1" cellpadding="0" cellspacing="0" width="100%" role="presentation" class="table_________ table-striped___">
			<thead>
				<tr class="fade______________">
					<th width="25" class="row fileupload-buttonbar">
						<input type="checkbox" class="toggle">
						<input type="hidden" name="ufileno" value="0">
						<input type="hidden" name="ufilenm" value="0">
					</th>
					<th>Attach Files <span id="allSize"></span></th>
					<th width="90">Size</th>
					<th width="85">Button</th>
				</tr>
			</thead>
			<tbody class="files"></tbody> <!-- 파일이 추가되는 곳.  -->
		</table>
		</div>
	</div>
</div>

<div class="span5 fileupload-progress fade___" style="display:none;">
	<div class="progress progress-success progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="margin-bottom:0px;">
		<div class="bar" style="width:0%;"></div>
	</div>
	<div class="progress-extended">&nbsp;</div>
</div>

<div class="fileupload-loading"></div>

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


</form>

</div>

<%@ include file="./modify_js.jsp" %>

</body>
</html>

