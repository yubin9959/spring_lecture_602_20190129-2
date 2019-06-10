<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


	<div id="sidebar2" class="sidebar responsive" style="" data-sidebar="true" data-sidebar-scroll="true" data-sidebar-hover="true">
				
				<div class="sidebar-shortcuts" id="sidebar-shortcuts" style="display:inline;">
					<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large" style="padding:0px 0px 3px;">
						<button class="btn btn-success" onclick="javascript:newContents(1);" data-rel="tooltip" data-placement="bottom" title="New Mail" data-original-title="Bottm Info">
							<i class="ace-icon fa fa-envelope-square bigger-130"></i>
						</button>
					
						<button class="btn btn-info" onclick="javascript:newContents(2);" data-rel="tooltip" data-placement="bottom" title="New Approval Doc" data-original-title="Bottm Info">
							<i class="ace-icon fa fa-edit bigger-130"></i>
						</button>
						<button class="btn btn-warning" onclick="javascript:newContents(3);" data-rel="tooltip" data-placement="bottom" title="New Schedule" data-original-title="Bottm Info">
							<i class="ace-icon fa fa-calendar-plus-o bigger-130"></i>
						</button>
						<button class="btn btn-danger" onclick="javascript:newContents(4);" data-rel="tooltip" data-placement="bottom" title="New Task" data-original-title="Bottm Info">
							<i class="ace-icon fa fa-server bigger-130"></i>
						</button>
					</div>
					<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
						<span class="btn btn-success"></span>
						<span class="btn btn-info"></span>
						<span class="btn btn-warning"></span>
						<span class="btn btn-danger"></span>
					</div>
				</div>
			
			
			<ul class="nav nav-list" style="top: 0px;">	
				<c:forEach items="${subMenuList }" var="subMenu">		
				<li class="">
					<a href="<%=request.getContextPath() %>/board/${subMenu[1] }" >						
						<i class="menu-icon fa subMenu" ></i>
						<span class="menu-text">${subMenu[0]}</span>
					</a>
					<b class="arrow"></b>					
				</li>	
				</c:forEach>
				<script>
					var iconNameList=["fa-search-plus","fa-inbox",
					"fa-hacker-news","fa-pencil-square-o","fa-archive"];
					$('i.subMenu').each(function(index,obj){
						$(this).addClass(iconNameList[index]);
					});
				</script>	
			</ul>
				<div class="sidebar-toggle sidebar-collapse">
					<i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
				</div>
				<div id="sidebar-BG" class="" style="background-image: url('<%=request.getContextPath()%>/resources/common/images/bg/busan-night-scene-228.jpg');">
				</div>
			</div>

