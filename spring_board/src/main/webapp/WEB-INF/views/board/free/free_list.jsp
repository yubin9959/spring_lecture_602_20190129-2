<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>


<c:set var="boardList" value="${dataMap.boardList }" />
<c:set var="pageMaker" value="${dataMap.pageMaker }" />

<head>
	<style>
		table{
			width:100%;
		}
	</style>	
	<script>
		$('.maninfo').each(function(){}).click(function(event) { event.preventDefault(); });	
	</script>
</head>
<body class="no-skin">
	<div class="main-content">
		<div class="main-content-inner">
			<!-- 서브메뉴 -->
			<%@ include file="/WEB-INF/views/board/subMenu.jsp" %>
			<%-- <c:import url="/board/subMenu" /> --%>	
		
			<!-- page content -->		
			<div class="page-content main-content" style="padding:0;">
				<div class="page-content">		
					<form id="search" action="list" method="post">
						<input name="page" type="hidden" value="${pageMaker.cri.page }">
						<input name="perPageNum" type="hidden" value="${pageMaker.cri.perPageNum }">
							
					<!-- 상단 우측버튼 -->
					<div class="wizard-actions-L">
						<button type="button" class="btn btn-sm btn-white btn-bold" onclick="OpenWindow('<%=request.getContextPath()%>/board/regist','','850','620');">
							<b>글등록</b>
						</button>
						<div class="wizard-inner-R">
							<select id="searchType" name="searchType" style="width:100px;" class="form-control">
								<option value="">검색구분</option>
								<option value="t" ${pageMaker.cri.searchType eq 't' ? 'selected':'' }>제목</option>
								<option value="w" ${pageMaker.cri.searchType eq 'w' ? 'selected':'' }>작성자</option>
								<option value="c" ${pageMaker.cri.searchType eq 'c' ? 'selected':'' }>본문</option>
								<option value="tc" ${pageMaker.cri.searchType eq 'tc' ? 'selected':'' }>제목+본문</option>
								<option value="cw" ${pageMaker.cri.searchType eq 'cw' ? 'selected':'' }>본문+작성자</option>
								<option value="tcw" ${pageMaker.cri.searchType eq 'tcw' ? 'selected':'' }>제목+본문+작성자</option>
							</select>
							
							<div class="input-group">
								<input id="searchValue" name="keyword" style="width:100px; margin-left:5px; border-radius: 0px !important;" placeholder="Search for ..." class="form-control" type="text" value="${pageMaker.cri.keyword }">
								<span id="gridSearch" class="input-group-btn" style="display: inline;">
									<button type="button" id="searchBtn" class="btn btn-sm btn-white">검색</button>
								</span>
							</div>
							<span id="gridSearchReset" style="display:none;">
								<button type="button" class="btn btn-sm btn-white">
									<i class="red ace-icon fa fa-times bigger-120"></i>
								</button>
							</span>
						</div>
						
					</div>
					<!-- 상단 우측버튼 -->
					
					</form>
					<br/>	
					
					<!-- 선긋기 -->
					<div class="bline"></div>
					<div class="hr_line1">&nbsp;</div>
					<div class="bline"></div>
					
					<!-- jqGrid Begins -->
					<div class="row">
						<div class="col-xs-12">
							<div id="grid_container">
								<div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" id="gbox_grid-table" dir="ltr" >
								<div class="loading ui-state-default ui-state-active" id="load_grid-table" style="display: none;"> Data Loading...</div><div class="ui-jqgrid-view " role="grid" id="gview_grid-table">
								<div class="ui-jqgrid-titlebar ui-jqgrid-caption ui-widget-header ui-corner-top ui-helper-clearfix" style="display: none;"><a role="link" class="ui-jqgrid-titlebar-close HeaderButton ui-corner-all" title="Toggle Expand Collapse Grid" style="right: 0px;"><span class="ui-jqgrid-headlink ui-icon ui-icon-circle-triangle-n"></span></a><span class="ui-jqgrid-title"></span></div><div class="ui-jqgrid-hdiv ui-state-default ui-corner-top" >
									<div class="ui-jqgrid-hbox">
										<table class="ui-jqgrid-htable ui-common-table " role="presentation" aria-labelledby="gbox_grid-table">
											<thead style="visibility: visible;">
												<tr class="ui-jqgrid-labels" role="row">
													<th class="ui-th-column ui-th-ltr ui-state-default" style="width:7%;">
														<div class="ui-jqgrid-sortable">번호</div>
													</th>
													<th class="ui-th-column ui-th-ltr ui-state-default">
														<div class="ui-jqgrid-sortable">제목</div>
													</th>										
													<th class="ui-th-column ui-th-ltr ui-state-default" style="width:15%;">
														<div class="ui-jqgrid-sortable">작성일</div>
													</th>		
													<th class="ui-th-column ui-th-ltr ui-state-default" style="width:15%;">
														<div class="ui-jqgrid-sortable">작성자</div>
													</th>
													<th class="ui-th-column ui-th-ltr ui-state-default" style="width:10%;">
														<div class="ui-jqgrid-sortable">조회수</div>
													</th>
												</tr>
											</thead>
										</table>
									</div>
								</div>
								<div class="ui-jqgrid-bdiv" style="height: 440px;">
									<div style="position:relative;">
										<div></div>
											<table id="grid-table" tabindex="0" role="presentation" aria-multiselectable="false" aria-labelledby="gbox_grid-table" class="ui-jqgrid-btable ui-common-table">
												
													<tr class="jqgfirstrow" role="row">
														<td role="gridcell" style="width:7%;"></td>
														<td role="gridcell" style=""></td>
														<td role="gridcell" style="width:15%;"></td>
														<td role="gridcell" style="width:15%;"></td>
														<td role="gridcell" style="width:10%;"></td>
													</tr>
													<c:forEach var="board" items="${boardList }">
													<tr role="row" class="jqgrow ui-row-ltr ui-widget-content">
														<td role="gridcell" style="text-align:center;" >${board.bno }</td>
														<td role="gridcell" >
															<a href="#" onclick="OpenWindow('detail?bno=${board.bno }','','850','620')"
															   style='<c:if test="${board.viewcnt >= 5}" >font-weight:bold;color:blue;</c:if>'>${board.title } 
															   <c:if test="${board.replycnt > 0}" >
															   -- <span style="color:blue;font-weight:bole;">[${board.replycnt}]</span></a>
															   </c:if>
														</td>
														<td role="gridcell" style="text-align:center;" >
															<fmt:formatDate value="${board.regDate }" pattern="yyyy-MM-dd" />
														</td>
														<td role="gridcell" style="text-align:center;" >
															<a class="maninfo" rel="20180117182516" href="#" data-hasqtip="21">
																<i class="pink2 ace-icon fa fa-user" title="작성자"></i>															
																${board.writer }
															</a>
														</td>
														<td role="gridcell" style="text-align:center;" >${board.viewcnt }</td>
													</tr>
													</c:forEach>
												
											</table>
										</div>
									</div>
									<div id="grid-pager" class="ui-jqgrid-pager ui-state-default ui-corner-bottom" dir="ltr">
										<div id="pg_grid-pager" class="ui-pager-control" role="group">
											<table class="ui-pg-table ui-common-table ui-pager-table ">
												<tr>
													<td id="grid-pager_left" align="left">
														<div class="ui-pg-div">
															<span class="ui-icon ace-icon"></span>
														</div>														
													</td>
													<td id="grid-pager_center" align="center" style="width:320px;">
														<table class="ui-pg-table ui-common-table ui-paging-pager">
															<tr>
																<td id="first_grid-pager" class="ui-pg-button ui-corner-all ui-state-disabled" title="First Page" style="cursor: default;">
																	<span class="ui-icon ace-icon"><b> << </b></span>
																</td>
																<td id="prev_grid-pager" class="ui-pg-button ui-corner-all ui-state-disabled" title="Previous Page" style="cursor: default;">
																	<span class="ui-icon ace-icon"><b> < </b></span>
																</td>
																<td class="ui-pg-button ui-state-disabled">
																	<span class="ui-separator"></span>
																</td>
																<td id="input_grid-pager" dir="ltr">
																	<input id="pageNum" class="ui-pg-input ui-corner-all" type="text" size="2" maxlength="7" value="${pageMaker.cri.page }" style="width:40px;"> / <span id="sp_1_grid-pager">${pageMaker.realEndPage }</span>
																</td>
																<td class="ui-pg-button ui-state-disabled">
																	<span class="ui-separator"></span>
																</td>
																<td id="next_grid-pager" class="ui-pg-button ui-corner-all ui-state-disabled" title="Next Page" style="cursor: default;">
																	<span class="ui-icon ace-icon"><b> > </b></span>
																</td>
																<td id="last_grid-pager" class="ui-pg-button ui-corner-all ui-state-disabled" title="Last Page" style="cursor: default;">
																	<span class="ui-icon ace-icon"><b> >> </b></span>
																</td>
																<td dir="ltr">
																	<select id="perPageNum" class="ui-pg-selbox ui-widget-content ui-corner-all" role="listbox" title="Records per Page">
																		<option role="option" value="10" ${pageMaker.cri.perPageNum ==10 ? 'selected' : '' }>10</option>
																		<option role="option" value="20" ${pageMaker.cri.perPageNum ==20 ? 'selected' : '' }>20</option>
																		<option role="option" value="30" ${pageMaker.cri.perPageNum ==30 ? 'selected' : '' }>30</option>
																		<option role="option" value="50" ${pageMaker.cri.perPageNum ==50 ? 'selected' : '' }>50</option>
																		<option role="option" value="100" ${pageMaker.cri.perPageNum ==100 ? 'selected' : '' }>100</option>
																	</select>
																</td>
															</tr>
														</table>
													</td>
													<td id="grid-pager_right" align="right">
														<div dir="ltr" style="text-align:right" class="ui-paging-info">10 건</div>
													</td>
												</tr>
											</table>
										</div>
									</div>
								</div>								
							</div>
						</div>
					</div>
					<!-- jqGrid Ends -->
					</div>
				</div>
			</div>
		</div>		
	</div>
	
	<%@ include file="/WEB-INF/views/board/list_js.jsp" %>

</body>






