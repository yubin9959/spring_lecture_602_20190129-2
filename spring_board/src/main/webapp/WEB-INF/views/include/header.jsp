<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="decorator" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<meta name="robots" content="noindex,nofollow">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<title><decorator:title default="정보시스템"/></title>

<style type="text/css" id="fontFamilyStyleSheet">
body { font-family: 'Malgun Gothic', sans-serif !important; }
</style>

<!-- bootstrap & fontawesome -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/css/bootstrap.min.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/css/font-awesome.min.css" />
		
<!-- page specific plugin styles start -->
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
div#logo{
	background-image:url('<%=request.getContextPath()%>/resources/images/logo.jpg');
	background-position:center;
	background-repeat:no-repeat;
	background-size:cover;
}
</style>
<!-- inline styles related to this page end -->

<!--[if !IE]> -->
<script src="<%=request.getContextPath()%>/resources/commons/libs/garam-admin-template/1.3.5/dist/js/jquery.min.js"></script>
<!-- <![endif]-->

<decorator:head />

</head>


<body class="no-skin">
<div id="navbar" class="navbar navbar-default navbar-collapse h-navbar ace-save-state">
	<div class="navbar-container ace-save-state" id="navbar-container">
		
		<button title="Full Menu" class=" navbar-toggle collapsed pull-left" type="button" id="menu-toggler" data-toggle="collapse" data-target="#sidebar">
			<span class="sr-only">Toggle sidebar</span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		</button>
		
		
		
		<div class="navbar-header pull-left">
			<button title="Sub Menu" data-target="#sidebar2" type="button" class="pull-left menu-toggler navbar-toggle" style="background-color: transparent!important; width: 25px;">
			<span class="sr-only">Toggle sidebar</span>
			<i class="ace-icon fa fa-chevron-down white bigger-150"></i>
		</button><a href="/" class="navbar-brand" style="padding:8px;">
				<div id="logo" style="height:29px;width:220px;"></div>
<!-- 				<span style="font-size: 20px; font-weight: bold; padding-left:15px; font-family: sans-serif !important;"></span>   -->
			</a>
			
		</div>

		<div class="navbar-buttons navbar-header pull-right" role="navigation">
			<ul class="nav ace-nav" style="">
				<li class="blue user-info" style="padding:0px 7px;border: 0px;  max-width: 170px;">
										 
					<div class="clock user-info" style="max-width: 170px;">
					<div id="Date">2019년 5월 24일 금요일</div>
					<ul style="list-style: none;">
						<li id="hours">13</li>
					    <li id="point">:</li>
					    <li id="min">43</li>
					    <li id="point1">:</li>
					    <li id="sec">01</li>
					</ul>
					</div>
					
				</li>
				
				<li class="blue">
					
					<button class="btn btn-xs btn-info" style="margin: 5px 3px 7px 3px;" onclick="getTelInfoHtml();" title="Company Organization">
						<i class="ace-icon fa fa-address-card-o bigger-120"></i>
						<!-- <span class="user-info">Message</span> -->
						<!-- <span class="badge" id="appr_idx6">0</span> -->
					</button>
				</li>
				
				<li class="blue" id="site-map">					
					<button class="btn btn-xs btn-purple" style="margin: 5px 3px 7px 3px;" onclick="fnSitemapPop();" title="Groupware Sitemap">
						<i class="ace-icon fa fa-sitemap bigger-130"></i>
					</button>
				</li>				
				<li class="blue" id="favorite-tool">
<!-- 					<a data-toggle="dropdown" href="#" class="dropdown-toggle" style="background-color: #b74635; min-width: 30px; padding: 0 2px;"> -->
<!-- 						<i class="ace-icon fa fa-pencil"></i> -->
<!-- 					</a> -->
<!-- 					<div class="btn-group"> -->

					<div class="inline dropdown-hover">
						<button data-toggle="dropdown" class="btn btn-xs btn-success dropdown-toggle" style="margin: 5px 3px 7px 3px;" title="Create Document">
							<i class="ace-icon fa fa-pencil bigger-110"></i>
							<!-- <span class="user-info">Message</span> -->
							<!-- <span class="badge" id="appr_idx6">0</span> -->
						</button>
					
							<ul class="dropdown-menu-right dropdown-navbar dropdown-menu dropdown-caret dropdown-close">
								<li class="dropdown-header">
									<i class="ace-icon fa fa-globe"></i>
									Web Utilities
								</li>

								<li class="dropdown-content ace-scroll" style="position: relative;"><div class="scroll-track" style="display: none;"><div class="scroll-bar"></div></div><div class="scroll-content" style="max-height: 200px;">
								<!-- <div class="scroll-track scroll-active" style="display: block; height: 200px;"><div class="scroll-bar" style="height: 111px; top: 0px;"></div></div> -->
								<div class="scroll-content">
									<ul class="dropdown-menu dropdown-navbar">
										
										    
										       
													<li>
														<a href="https://www.naver.com/" target="_blank" class="clearfix">
															<i class="green ace-icon fa fa-binoculars bigger-200 msg-photo" style="padding: 0px 8px 0px 8px;"></i>
															<span class="msg-body">
																<span class="msg-title">
																	<span class="blue">네이버</span>

																	<i class="ace-icon fa fa-Example of external-link-square"></i>
																</span>
															</span>
														</a>
													</li>
												
													<li>
														<a href="http://www.garamsystem.co.kr" target="_blank" class="clearfix">
															<i class="light-red ace-icon fa fa-laptop bigger-200 msg-photo" style="padding: 0px 8px 0px 8px;"></i>
															<span class="msg-body">
																<span class="msg-title">
																	<span class="blue">가람시스템</span>

																	<i class="ace-icon fa fa-Example of external-link-square"></i>
																</span>
															</span>
														</a>
													</li>
												
													<li>
														<a href="https://facebook.com" target="_blank" class="clearfix">
															<i class="light-blue ace-icon fa fa-facebook bigger-200 msg-photo" style="padding: 0px 8px 0px 8px;"></i>
															<span class="msg-body">
																<span class="msg-title">
																	<span class="blue">페이스북</span>

																	<i class="ace-icon fa fa-Example of external-link-square"></i>
																</span>
															</span>
														</a>
													</li>
												
													<li>
														<a href="https://instagram.com" target="_blank" class="clearfix">
															<i class="purple ace-icon fa fa-instagram bigger-200 msg-photo" style="padding: 0px 8px 0px 8px;"></i>
															<span class="msg-body">
																<span class="msg-title">
																	<span class="blue">인스타그램</span>

																	<i class="ace-icon fa fa-Example of external-link-square"></i>
																</span>
															</span>
														</a>
													</li>
												
													<li>
														<a href="https://www.google.co.kr/" target="_blank" class="clearfix">
															<i class="red ace-icon fa fa-google bigger-200 msg-photo" style="padding: 0px 8px 0px 8px;"></i>
															<span class="msg-body">
																<span class="msg-title">
																	<span class="blue">구글</span>

																	<i class="ace-icon fa fa-Example of external-link-square"></i>
																</span>
															</span>
														</a>
													</li>
												
													<li>
														<a href="https://www.apple.com" target="_blank" class="clearfix">
															<i class="orange ace-icon fa fa-apple bigger-200 msg-photo" style="padding: 0px 8px 0px 8px;"></i>
															<span class="msg-body">
																<span class="msg-title">
																	<span class="blue">Apple</span>

																	<i class="ace-icon fa fa-Example of external-link-square"></i>
																</span>
															</span>
														</a>
													</li>
										
									</ul>
								</div>
								</div></li>
							</ul>
					</div>
					<!-- </div> -->
				</li>
				
				<li class="orange" style="display:none;">
					
				</li>
				
				<li class="purple" style="display:none;">
					<a data-toggle="dropdown" class="dropdown-toggle" href="#" onclick="onTopMenu('MENU020201', '');">
						<i class="ace-icon fa fa-tasks"></i>
						<span class="badge" id="appr_idx1">0</span>
					</a>
					
				</li>
				
				<li class="green" id="notice-tool">
					<button data-toggle="dropdown" class="green btn btn-xs btn-warning dropdown-toggle" style="margin: 5px 3px 7px 3px;">
						<i class="ace-icon fa fa-bell bigger-110"></i>
						<!-- <span class="user-info">Message</span> -->
						<!-- <span class="badge" id="appr_idx6">0</span> -->
					</button>
					
					<ul class="dropdown-menu-right dropdown-navbar navbar-blue dropdown-menu dropdown-caret dropdown-close">
						<li class="dropdown-header">
							<i class="ace-icon fa fa-exclamation-triangle"></i>
							<span class="notifications_count">3</span> Notifications
						</li>

						<li class="dropdown-content ace-scroll" style="position: relative;"><div class="scroll-track" style="display: none;"><div class="scroll-bar"></div></div><div class="scroll-content" style="max-height: 200px;"><div class="scroll-track" style="display: none;"><div class="scroll-bar"></div></div><div class="scroll-content">
							<ul class="dropdown-menu dropdown-navbar navbar-pink">
								<li>
									<a href="#" onclick="onTopMenu('MENU0102', '');">
										<div class="clearfix">
											<span class="pull-left">
												<i class="btn btn-xs no-hover btn-primary fa fa-envelope"></i>
												읽지않은 메일
											</span>
											<span class="pull-right badge badge-primary"><span class="widget_count_14" data-before="+">+0</span></span>
										</div>
									</a>
								</li>

								<li>
									<a href="#" onclick="onTopMenu('MENU020201', '');">
										<div class="clearfix">
											<span class="pull-left">
												<i class="btn btn-xs no-hover btn-purple fa fa-book"></i>
												결재할 문서
											</span>
											<span class="pull-right badge badge-purple"><span class="widget_count_1" data-before="+">+2</span></span>
										</div>
									</a>
								</li>

								<li>
									<a href="#" onclick="onTopMenu('MENU070902', '');">
										<div class="clearfix">
											<span class="pull-left">
												<i class="btn btn-xs no-hover btn-success fa fa-server"></i>
												할당된 작업
											</span>
											<span class="pull-right badge badge-success"><span class="widget_count_16" data-before="+">0</span></span>
										</div>
									</a>
								</li>

								<li>
									<a href="#" onclick="onTopMenu('MENU0411', '');">
										<div class="clearfix">
											<span class="pull-left">
												<i class="btn btn-xs no-hover btn-danger fa fa-calendar"></i>
												개인.공유 일정
											</span>
											<span class="pull-right badge badge-danger"><span class="widget_count_13" data-before="+">+1</span></span>
										</div>
									</a>
								</li>
							</ul>
						</div></div></li>

						
					</ul>
							
					
					
				</li>
				<li class="red">
					<button class="btn btn-xs btn-danger fnlogout" style="margin: 5px 3px 7px 3px;" title="System Log Out">
						<i class="ace-icon fa fa-power-off bigger-130"></i>
						<!-- Log Out -->
						<!-- <i class="ace-icon fa fa-arrow-right icon-on-right"></i> -->
					</button>
					
				</li>
				<li class="blue" id="people-info">
					<a data-toggle="dropdown" href="#" class="dropdown-toggle" aria-expanded="false"> 
						<img class="nav-user-photo" src="<%=request.getContextPath() %>/resources/images/avatar4.png"  width="36" height="36">
						<span class="user-info" style="sdisplay:none;"> <small style="font-size:100%;">반갑습니다 ,</small> ${loginUser.id } 님 </span>
					</a>
					<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
						<li><a href="javascript:fnSelfEdit('0');"> 기본정보 </a></li>
						<li><a href="javascript:fnSelfEdit('1');"> 패스워드 </a></li>
						<li><a href="javascript:fnSelfEdit('2');"> 개인정보 </a></li>
						<li><a href="javascript:fnSelfEdit('3');"> 환경정보 </a></li>
						<li class="divider"></li>
						<li><a href="<%=request.getContextPath() %>/commons/logout" class="fnlogout"> Logout </a></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</div>
<div class="main-container ace-save-state" id="main-container">
	<div id="sidebar" class="sidebar h-sidebar navbar-collapse collapse ace-save-state" style="margin-top:0px;" data-sidebar="true" data-sidebar-scroll="true" data-sidebar-hover="true">
		<script type="text/javascript">try { ace.settings.loadState('sidebar') } catch (e) {}</script>
		<ul class="nav nav-list" id="topMenuUl" style="min-height: 39px; top: 0px;">
			<li class="hover highlight active">
				<a data-mcode="MENU90" data-url="" href="<%=request.getContextPath() %>/" >
					<i class="menu-icon fa fa-home green" style="float: left;"></i>
					<span class="menu-text">HOME</span>
				</a>
				<b class="arrow"></b>
			</li>
			<li class="hover highlight">
				<a data-mcode="MENU01" data-url="" href="<%=request.getContextPath() %>/member"  class="dropdown-toggle">
				<i class="menu-icon fa fa-users" style="float:left;" ></i>
				<span class="menu-text">직원관리</span>
				<b class="arrow fa fa-angle-down"></b>
				</a>
				<b class="arrow"></b>
				<ul class="submenu can-scroll">
					<li class="hover highlight">
						<a data-mcode="MENU0101" href="#" onclick="OpenWindow('<%=request.getContextPath() %>/member/regist', '', '850', '620');">
						직원등록</a>
						<b class="arrow"></b></li>
					<li class="hover highlight">
						<a data-mcode="MENU0112" href="<%=request.getContextPath() %>/member/list">전체직원</a>
						<b class="arrow"></b>
					</li>					
				</ul>
				<div class="scroll-track scroll-detached no-track scroll-thin scroll-margin scroll-visible" style="display: none; height: 199px; top: 74px; left: 183px;">
					<div class="scroll-bar" style="height: 182px; top: 0px;">
					</div>
				</div>
			</li>
			<li class="hover highlight">
				<a data-mcode="MENU01" data-url="" href="<%=request.getContextPath() %>/board/">
				<i class="menu-icon fa fa-comments-o" style="float: left;"></i>
				<span class="menu-text">게시판관리</span>
				<b class="arrow fa fa-angle-down"></b>
				</a>
				<b class="arrow"></b>
				<ul class="submenu can-scroll">
					<li class="hover highlight">
						<a data-mcode="MENU0112" href="<%=request.getContextPath() %>/board/search">
						통합검색</a>
						<b class="arrow"></b>
					</li>	
					<li class="hover highlight">
						<a data-mcode="MENU0101" href="<%=request.getContextPath() %>/board/notice/list" >
						공지사항</a>
						<b class="arrow"></b></li>
					<li class="hover highlight">
						<a data-mcode="MENU0112" href="<%=request.getContextPath() %>/board/free/list">
						자유게시판</a>
						<b class="arrow"></b>
					</li>
					<li class="hover highlight">
						<a data-mcode="MENU0112" href="<%=request.getContextPath() %>/board/pds/list">
						자료실</a>
						<b class="arrow"></b>
					</li>					
				</ul>
				<div class="scroll-track scroll-detached no-track scroll-thin scroll-margin scroll-visible" style="display: none; height: 199px; top: 74px; left: 183px;">
					<div class="scroll-bar" style="height: 182px; top: 0px;">
					</div>
				</div>
			</li>
			<li class="hover highlight">
				<a data-mcode="MENU01" data-url="" href="<%=request.getContextPath() %>/document"  class="dropdown-toggle">
				<i class="menu-icon fa fa-archive" style="float: left;"></i>
				<span class="menu-text">문서관리</span>
				<b class="arrow fa fa-angle-down"></b>
				</a>
				<b class="arrow"></b>
				<ul class="submenu can-scroll">
					<li class="hover highlight">
						<a data-mcode="MENU0101" href="<%=request.getContextPath() %>/document/search" >
						통합검색</a>
						<b class="arrow"></b></li>
					<li class="hover highlight">
						<a data-mcode="MENU0112" href="<%=request.getContextPath() %>/document/form">
						기안서식함</a>
						<b class="arrow"></b>
					</li>
					<li class="hover highlight">
						<a data-mcode="MENU0112" href="<%=request.getContextPath() %>/document/report">
						보고서서식함</a>
						<b class="arrow"></b>
					</li>					
				</ul>
				<div class="scroll-track scroll-detached no-track scroll-thin scroll-margin scroll-visible" style="display: none; height: 199px; top: 74px; left: 183px;">
					<div class="scroll-bar" style="height: 182px; top: 0px;">
					</div>
				</div>
			</li>
		</ul>
</div>
	