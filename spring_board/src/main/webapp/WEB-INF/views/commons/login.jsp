<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:if test="${!empty paramMap.message }">
	<script>
		alert('${paramMap.message}');
	</script>
</c:if>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<meta name="robots" content="noindex,nofollow">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<title>Login - Groupware System</title>




<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/css/bootstrap.min.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/css/font-awesome.min.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/css/garam-fonts.min.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/css/garam.min.css" class="ace-main-stylesheet" id="main-ace-style" />



</head>

<body class="login-layout light-login">
<form id="loginForm" action="login" method="POST" onsubmit="return validateForm();">
<input id="redirectURL" name="redirectURL" type="hidden" value=""/>
<input id="loginType" name="loginType" value="0" type="hidden" value="0"/>
	<div class="main-container" style="margin-top:23px;">
		<div class="main-content">
			<div class="row">
			<div class="col-sm-10 col-sm-offset-1">
				<div class="login-container">
					<div class="center">
						<h1>
							<!-- <i class="ace-icon fa fa-leaf green"></i> -->
							<!-- <img src="/userdata/logoicon" width="43" height="43" style="display: inline;" /> -->
							<span class="grey" id="id-text2">정보시스템</span>
						</h1>
					</div>
					<div class="space-6"></div>
					<div class="position-relative">
						<div id="login-box" class="login-box visible widget-box no-border">
							<div class="widget-body" style="max-height: none;">
								<div class="widget-main">
									<div> <img style="border-radius: 3px;border: 1px solid #999; height: 190px;" src="<%=request.getContextPath() %>/resources/images/loginlogo" width="100%" height="190" border="1"></div><!-- 로그인 로고 -->
									<h4 class="header blue lighter bigger">
										정보를 입력하세요
									</h4>
									<div class="space-6"></div>
									<form>
										<fieldset>
											<label class="block clearfix">
												<span class="block input-icon input-icon-right">
													<input id="id" name="id" tabindex="1" onkeyup="this.value=this.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, &#39;&#39;);" style="ime-mode:disabled;" placeholder="ID" class="form-control" type="text" value="${paramMap.id }"/>
												</span>
											</label>
											<label class="block clearfix">
												<span class="block input-icon input-icon-right">
													<input id="pwd" name="pwd" tabindex="2" placeholder="Password" class="form-control" type="password" value=""/>
												</span>
											</label>
											<div class="space"></div>
											<div class="clearfix">
												<label class="inline">
													<input type="checkbox" name="checksaveid" tabindex="3" class="ace" />
													<span class="lbl"> 아이디 저장</span>
												</label>
												<button type="submit" class="width-35 pull-right btn btn-sm btn-primary">
													<span class="bigger-110">로그인</span>
												</button>
											</div>
											<div class="space-4"></div>
										</fieldset>
									</form>
									
								</div><!-- /.widget-main -->
								<div class="toolbar clearfix" style="display: none;">
									<div>
										<a href="http://www.jaewon.co.kr/" class="forgot-password-link" target="_blank">
											<i class="ace-icon fa fa-arrow-left"></i>&nbsp;
											회사홈페이지
										</a>
									</div>
								</div>
							</div><!-- /.widget-body -->
						</div><!-- /.login-box -->
					</div><!-- /.position-relative -->
				</div>
			</div><!-- /.col -->
			</div><!-- /.row -->
		</div><!-- /.main-content -->
	</div><!-- /.main-container -->





<script src="<%=request.getContextPath()%>/resources/common/libs/garam-admin-template/1.3.5/dist/js/jquery.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/common/libs/jquery-cookie/jquery.cookie.js"></script>

<script type="text/javascript">
$(document).ready(function() {
	getid();
	
	$('input[name="id"]').val('${paramMap.id}');
	
	$("[name='checksaveid']").click(function() {
		var expdate = new Date();
		
		// 기본적으로 30일동안 기억하게 함. 일수를 조절하려면 * 30에서 숫자를 조절하면 됨
		if ($(this).is(":checked")) {
			expdate.setTime(expdate.getTime() + 1000 * 3600 * 24 * 30); // 30일
		} else {
			expdate.setTime(expdate.getTime() - 1); // 쿠키 삭제조건
		}
		setCookie("saveid", $("#id").val(), expdate);
	});
});


function validateForm() {
	var id = $("#id");
	var pwd = $("#pwd");
	
	if (id.val() == "") {
		alert('로그인 아이디를 입력해 주십시오 !');
		id.focus();
		return false;
	} else if (pwd.val() == "") {
		alert('비밀번호를 입력해 주십시오 !');
		pwd.focus();
		return false;
	}
}

function getid() {
	var checksaveid = $("[name='checksaveid']");
	var id = $("#id");
	var pwd = $("#pwd");
	
	id.val(getCookie("saveid"));
	checksaveid.attr("checked", id.val() != "");
	
	if (checksaveid.is(":checked")) {
		pwd.focus();
	} else {
		id.focus();
	}
}

function setCookie(name, value, expires) {
	document.cookie = name+"="+escape(value)+"; path=/; expires="+expires.toGMTString();
}

function getCookie(Name) {
	var search = Name+"=";
	
	if (document.cookie.length > 0) { // 쿠키가 설정되어 있다면
		var offset = document.cookie.indexOf(search);
		if (offset != -1) { // 쿠키가 존재하면
			offset += search.length;
			// set index of beginning of value
			end = document.cookie.indexOf(";", offset);
			// 쿠키 값의 마지막 위치 인덱스 번호 설정
			if (end == -1) {
				end = document.cookie.length;
			}
			return unescape(document.cookie.substring(offset, end));
		}
	}
	return "";
}
</script>

</form>
</body>
</html>