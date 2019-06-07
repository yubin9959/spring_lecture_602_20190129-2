<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div class="main-content" style="margin-left:0;">
	<div class="main-content-inner">
		<div class="page-content main-content" style="padding:0px;margin-left:0;">
			<div class="main-style show" style="background: #f5f7fa;">
				<div id="main-widget-container" style="background: #d8e6f4c4; padding: 10px 0px;">
				    <!-- row1.txt -->
				    <div class="row" style="/*background-color:#f8f8f8;*/">
					        <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3" style="border-top:0px; border-bottom:0px; padding:4px 6px; border-bottom:0px;">
		    					
		    					<!-- log-in user info -->
			    				<div class="panel panel-default" style="height:128px; border: 0px !important;"> 
				    				<div class="panel-heading" style="padding:5px; text-align:center; border: none;">
				    					<h3 class="panel-title" style="font-size:12px; font-family: inherit;"><b>나대표 님</b>
				    					 / 최근 접속 : <span id="lastLoginTime" style="font-size:10px;">2019-05-17 05:52:42</span>
				    					</h3>
				    					
				    				</div>
				    				<div class="panel-body" style="padding:3px;">  


<!-- 							        	<br/>최근 접속일시<br>: <span id="lastLoginTime" style="font-size:10px;"></span></span> -->
									
									<div class="infobox infobox-blue2" onclick="onTopMenu('MENU0102', '');" role="button">
									<div class="infobox-icon">
										<i class="ace-icon fa fa-envelope"></i>
		<!-- 								icon-animated-bell icon-animated-vertical : 5초 동안. 0개가 아니면 해당 클래스 추가 -->
									</div>
		
									<div class="infobox-data">
										<span class="infobox-data-number"><span class="widget_count_14" data-icon="fa-envelope">0</span> 개</span>
										<div class="infobox-content">읽지않은 메일</div>
									</div>
								</div>
								
								<div class="infobox infobox-purple" onclick="onTopMenu('MENU020201', '');" role="button">
									<div class="infobox-icon">
										<i class="ace-icon fa fa-book"></i>
									</div>
									<div class="infobox-data">
										<span class="infobox-data-number"><span class="widget_count_1" data-icon="fa-book">2</span> 개</span>
										<div class="infobox-content">결재할 문서</div>
									</div>
								</div>
								
								<div class="infobox infobox-green" onclick="onTopMenu('MENU0411', '');" role="button">
									<div class="infobox-icon">
										<i class="ace-icon fa fa-calendar"></i>
									</div>
		
									<div class="infobox-data">
										<span class="infobox-data-number"><span class="widget_count_13" data-icon="fa-calendar">1</span> 개</span>
										<div class="infobox-content">개인.공유 일정</div>
									</div>
								</div>

									</div>
			    				</div>
							</div>
							
							<!--  skin image -->
					        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" style="borders:1px solid #000; padding:0px; padding-top:6px; padding-left:12px;">
					        	<div class="bx-wrapper" style="max-width: 100%; margin: 0px auto;">
					        		<div class="bx-viewport" style="width: 100%; overflow: hidden; position: relative; height: 128px;">
					        			<div class="slider" style="width: 515%; position: relative; transition-duration: 0.5s; transform: translate3d(0px, 0px, 0px);">
					        				<img style="border-radius: 3px; float: left; list-style: none; position: relative; width: 682px;" id="skinImage" src="https://placeimg.com/682/128/tech" width="100%" height="128" class="bx-clone">
					        				<img style="border-radius: 3px; float: left; list-style: none; position: relative; width: 682px;" id="skinImage" src="https://placeimg.com/682/128/animal" width="100%" height="128">
					        				<img style="border-radius: 3px; float: left; list-style: none; position: relative; width: 682px;" id="skinImage" src="https://placeimg.com/682/128/arch" width="100%" height="128">
					        				<img style="border-radius: 3px; float: left; list-style: none; position: relative; width: 682px;" id="skinImage" src="https://placeimg.com/682/128/nature" width="100%" height="128">
					       		 			<img style="border-radius: 3px; float: left; list-style: none; position: relative; width: 682px;" id="skinImage" src="https://placeimg.com/682/128/people" width="100%" height="128" class="bx-clone">
					       				</div>
					       			</div>
					       		</div>						
					        </div>
					        
					        <!--  main content count -->
					        <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 infobox-container" style="padding:0px 0px 0px 3px;">
								 
								 <div class="widget-box" id="my-widget-37" style="border:0px; text-align:center; margin-top:5px; margin-bottom: 3px;">
									
									
										
										<a href="javascript:onTopMenu('MENU0112', '');" class="btn btn-app btn-primary btn-xs no-radius" style="border-radius: 3px !important; min-height: 62px; font-size:12px; swidth:63px; padding: 4px 2px 4px 2px  !important;">
											<i class="ace-icon fa fa-stack-overflow bigger-180"></i>
											<span class="q-menu-span">전체메일</span>
										</a>
										
										
									
										
										<a href="javascript:onTopMenu('MENU011702', '');" class="btn btn-app btn-primary btn-xs no-radius" style="border-radius: 3px !important; min-height: 62px; font-size:12px; swidth:63px; padding: 4px 2px 4px 2px  !important;">
											<i class="ace-icon fa fa-paper-plane bigger-180"></i>
											<span class="q-menu-span">받은쪽지함</span>
										</a>
										
										
									
										
										<a href="javascript:onTopMenu('MENU020201', '');" class="btn btn-app btn-primary btn-xs no-radius" style="border-radius: 3px !important; min-height: 62px; font-size:12px; swidth:63px; padding: 4px 2px 4px 2px  !important;">
											<i class="ace-icon fa fa-star bigger-180"></i>
											<span class="q-menu-span">결재할문서</span>
										</a>
										
										
									
									
									<a href="javascript:onTopMenu('MENU0805', '');" class="btn btn-app btn-primary btn-xs no-radius" style="background: #428bca !important; border-radius: 3px !important; min-height: 62px; font-size:12px !important; swidth:58px; padding: 4px 2px 4px 2px  !important;">
										<i class="ace-icon fa fa-cog bigger-180"></i>
										<span class="q-menu-span">설정하기</span>
									</a>
									
									<a href="javascript:onTopMenu('MENU0805', '');" class="btn btn-app btn-primary btn-xs no-radius" style="background: #428bca !important; border-radius: 3px !important; min-height: 62px; font-size:12px !important; swidth:58px; padding: 4px 2px 4px 2px  !important;">
										<i class="ace-icon fa fa-cog bigger-180"></i>
										<span class="q-menu-span">설정하기</span>
									</a>
									
									<a href="javascript:onTopMenu('MENU0805', '');" class="btn btn-app btn-primary btn-xs no-radius" style="background: #428bca !important; border-radius: 3px !important; min-height: 62px; font-size:12px !important; swidth:58px; padding: 4px 2px 4px 2px  !important;">
										<i class="ace-icon fa fa-cog bigger-180"></i>
										<span class="q-menu-span">설정하기</span>
									</a>
									
									<a href="javascript:onTopMenu('MENU0805', '');" class="btn btn-app btn-primary btn-xs no-radius" style="background: #428bca !important; border-radius: 3px !important; min-height: 62px; font-size:12px !important; swidth:58px; padding: 4px 2px 4px 2px  !important;">
										<i class="ace-icon fa fa-cog bigger-180"></i>
										<span class="q-menu-span">설정하기</span>
									</a>
									
									<a href="javascript:onTopMenu('MENU0805', '');" class="btn btn-app btn-primary btn-xs no-radius" style="background: #428bca !important; border-radius: 3px !important; min-height: 62px; font-size:12px !important; swidth:58px; padding: 4px 2px 4px 2px  !important;">
										<i class="ace-icon fa fa-cog bigger-180"></i>
										<span class="q-menu-span">설정하기</span>
									</a>
									
								</div>
								
							</div>
							</div>
				</div>
					<!-- row2.txt -->
					<div class="row" style="margin-top: 10px;">
						<div id="widget-container-1" class="col-xs-12 col-sm-3 col-md-3 col-lg-3 widget-container-col ui-sortable">
						</div>
					</div>
				<div class="row" style="margin-top: 10px;">
				</div>
			</div>
		</div>
	</div>
</div>
<script src="<%=request.getContextPath()%>/resources/commons/libs/bxslider/4.1.2/jquery.bxslider.min.js"></script>
<script>
$('.slider').bxSlider({
    controls: false,
    auto: true,
    autoControls: true,
    touchEnabled: true,
	pager: false,
//		slideWidth: 600,
    autoReload: true,
	pause: 3000
}).show();

</script>