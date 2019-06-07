<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<script type="text/javascript">
	var popupWinCnt = 0;	
	function goSubmit(cmd, isNewWin ,docId)
	{
		var frm = document.getElementById("search");
		frm.method = "GET";
		switch(cmd){
			case "view":
				frm.docId.value = docId;
				frm.action = "read.htm";
				break;
			case "edit":
				frm.action = "form.htm";
				frm.pDocId.value = "";
				break;
			case "delete":
				if(!confirm("삭제 하시겠습니까?")) return;
				frm.action = "delete.htm";
				break;
			
			case "response":
				frm.action = "form.htm";
				frm.pDocId.value = frm.docId.value;
				frm.docId.value = "";
				break;
			
			default:
				return;
				break;
		}
		
			
				frm.useNewWin.value = false;
				frm.useLayerPopup.value = true;
			
			
		
		frm.submit();
	}

	var popupHistory,x,y;
	function ViewHistory(historyType ) {
		var url = "";
		x = 17;
		y = 80;
		switch(historyType)
		{
			case "edit":
				url = "./edit_history.htm?bbsId=bbs00000000000004&docId=2018042316273647";
				break;
			case "read":
				x = 90;
				url = "./read_history.htm?bbsId=bbs00000000000004&docId=2018042316273647";
				break;
			case "down":
				x = 163;
				url = "./down_history.htm?bbsId=bbs00000000000004&docId=2018042316273647";
				break;
			default :
				return;
				break;
		}
		ajaxRequest("GET", "", url, viewHistoryCompleted);
	}

	function hideHistory(){
		if (window.createPopup){
			popupHistory.hide()
		} else popupHistory.close();
	}

	function viewHistoryCompleted(data, textStatus, jqXHR) {
		wid = 500 ;
		hei = 194;
		
		ModalDialog({'t':'History', 'w':480, 'h':250, 'm':'html', 'c':data, 'modal':false, 'd':true, 'r':true });
		/*
		if(window.createPopup){
			popupHistory = window.createPopup();
			popupHistory.document.body.innerHTML = data ;
			popupHistory.show(x, y, wid, hei , document.body);
		} else {
			var features = "height=" + hei + ",width=" + wid + ",left=" + x + ",top=" + y + 
				",titlebar=no,menubar=no,scrollbars=no,status=no,location=no"
			popupHistory = window.open("about:blank", "popupHistory", features);
			popupHistory.document.body.innerHTML = data;
		}
		*/
	}
	

	function ShowUserInfoSetss() {
	     // Make sure to only match links to wikipedia with a rel tag
	     var strUrl = "/common/userinfo.htm?userId=" ;

	   	$('.maninfo').each(function()
	    {
	   		// We make use of the .each() loop to gain access to each element via the "this" keyword...
	   		$(this).qtip(
	   		{
	   			content: {
	   				// Set the text to an image HTML string with the correct src URL to the loading image you want to use
	   				//text: '<img class="throbber" src="/projects/qtip/images/throbber.gif" alt="Loading..." />',
	   				text: 'loading...',
	   				ajax: {
	   					//url: $(this).attr('rel') // Use the rel attribute of each element for the url to load
	   					//url: strUrl // Use the rel attribute of each element for the url to load
	   					url: strUrl + $(this).attr('rel') // Use the rel attribute of each element for the url to load
	   				},
	   				title: {
	   					text: 'Man Information - ' + $(this).text(), // Give the tooltip a title using each elements text
	   					//text: 'Man Infomation', // Give the tooltip a title using each elements text
	   					button: true
	   				}
	   			},
	   			position: {
	   				at: 'left center', // Position the tooltip above the link
	   				my: 'right center',
	   				viewport: $(window), // Keep the tooltip on-screen at all times
	   				effect: false // Disable positioning animation
	   			},
	   			show: { 
	   				event: 'click',
	   				solo: true // Only show one tooltip at a time
	   			},
	   			hide: 'unfocus',
	   			style: {
	   				//classes: 'qtip-wiki qtip-light qtip-shadow'
	   				classes: 'ui-tooltip-bootstrap ui-tooltip-shadow ui-tooltip-rounded',
					width:350
	   			}
	   		})
	   	})
    
	   	// Make sure it doesn't follow the link when we click it
		.click(function(event) { event.preventDefault(); });
	}
</script>
<script type="text/javascript">
	function TextCount(obj){
		var strsubject = obj.value;
		strlength = 0;
		document.getElementById("tmptext").innerHTML = strsubject.length;
		for (cntchar = 0; cntchar < strsubject.length; cntchar++) {
			if (strsubject.charCodeAt(cntchar) > 255){
				strlength += 2;
			}else{
				strlength++;
			}
			if (strlength >= 1000){
				alert("입력 문자는 최대 1000byte이므로 더이상 입력 할 수 없습니다");
				obj.value = obj.value.substring(0, cntchar);
				break;
			}
		}
	}

	function goCommentSubmit(cmd, comNo){
		var frm = document.getElementById("bbsCommentWebForm");
		frm.elements["search.useAjaxCall"].value = true;
		switch(cmd){
			
			case "edit" :
			    $.ajax({
			        type: 'post'
				    ,dataType: 'text'
			        ,async: true
			        ,url: './save_comment.htm'
			        ,data: $("#bbsCommentWebForm").serialize()
			        ,beforeSend: function() {
			        	$('#ajaxIndicator').show(); 
			        } 
			        ,complete: function(){ 
			        	$('#ajaxIndicator').hide();
			        }
			        ,success: function(data, status, xhr) {
			        	goCommentSubmit("list_comment","");
			        }
			        ,error: function(xhr, status, error) {
				        $("#commentArea").html(status + ":" + error);
			        }
			    });
				break;
			case "save" :
				frm.elements["bbsComment.id.comNo"].value = "-1";
				$.ajax({
			        type: 'post'
				    ,dataType: 'text'
			        ,async: true
			        ,url: './save_comment.htm'
			        ,data: $("#bbsCommentWebForm").serialize()
			        ,beforeSend: function() {
			        	$('#ajaxIndicator').show(); 
			        } 
			        ,complete: function(){ 
			        	$('#ajaxIndicator').hide();
			        }
			        ,success: function(data, status, xhr) {
			        	goCommentSubmit("list_comment","");
			        }
			        ,error: function(xhr, status, error) {
				        $("#commentArea").html(status + ":" + error);
			        }
			    });
				break;
			
			case "delete":
				if(TrimAll(comNo) == "") return;
				frm.elements["bbsComment.id.comNo"].value = comNo;
				if (!confirm("의견을 삭제 하시겠습니까?")) return;
			    $.ajax({
			        type: 'post'
			        ,async: true
			        ,url: './delete_comment.htm'
			        ,data: $("#bbsCommentWebForm").serialize()
			        ,beforeSend: function() {
			        	$('#ajaxIndicator').show().fadeIn('fast'); 
			        } 
			        ,complete: function() { 
			        	$('#ajaxIndicator').fadeOut();
			        }
			        ,success: function(data) {
			        	goCommentSubmit("list_comment","");
			        }
			        ,error: function(data, status, err) {
				        $("#commentArea").html(status + ":" + err);
			        }
			    });
			  	break;
			case "list_comment":
				//location.reload();
			    
				$.ajax({
			        type: 'post'
				    ,dataType: 'text'
			        ,async: true
			        ,url: './list_comment.htm'
			        ,data: $("#bbsCommentWebForm").serialize()
			        ,beforeSend: function() {
			        	$('#ajaxIndicator').show(); 
			        } 
			        ,complete: function(){ 
			        	$('#ajaxIndicator').hide();
			        }
			        ,success: function(data, status, xhr) {
			        	$("#commentArea").html(data);
			        }
			        ,error: function(xhr, status, error) {
				        $("#commentArea").html(status + ":" + error);
			        }
			    });
			    
				break;
			case "cancel":
				//댓글 편집 초기화
				setCommentReset();
				break;
			default:
				return;
				break;
		}
	}
	
	
	function getCommentText(comNo, cmtAnonymity){
		var frm = document.getElementById("bbsCommentWebForm");
		var id="#" + frm.elements["bbsComment.id.docId"].value + "_" + comNo;
		var comment = $(id).html();
		frm.elements["bbsComment.comments"].value = comment;
		frm.elements["bbsComment.id.comNo"].value = comNo;
		//$("#editButton").show();
		
		var saveObj = $("#commentSave");
		var editObj = $("#commentEdit");
		
		if ( saveObj ) {
			saveObj.attr("style", "display:none");
			saveObj.css("margin" , "8px");
		}
		if ( editObj ) {
			editObj.attr("style", "");
			editObj.css("margin" , "8px");
		}
		
		if(cmtAnonymity == "true"){
			$("input[name='cmtAnonymity']").closest(".checkbox").css("display", "none");	
// 			$("input[name='cmtAnonymity']").prop("checked", true);
		}else{
			$("input[name='cmtAnonymity']").closest(".checkbox").css("display", "");	
// 			$("input[name='cmtAnonymity']").prop("checked", false);
		}
		
		setCommentColor(comNo);
	}
	
	//댓글편집 선택 배경색
	function setCommentColor(comNo){
		var comId = "2018042316273647" + "_" + comNo;
		$(".dialogdiv").each(function(){
			if(comId == $(this).find(".body").find(".text").find("span").attr("id")){
				$(this).find(".body").css("background-color", "#f2dede");
				$(this).find(".body").css("border-color", "#ebccd1");
			}else{
				$(this).find(".body").css("background-color", "#ffffff");
				$(this).find(".body").css("border-color", "#dde4ed");
			}
		});
	}
	
	//댓글 편집 초기화
	function setCommentReset(comNo){
		var frm = document.getElementById("bbsCommentWebForm");
		frm.elements["bbsComment.comments"].value = "";
		
		var saveObj = $("#commentSave");
		var editObj = $("#commentEdit");
		
		if ( saveObj ) {
			saveObj.attr("style", "");
			saveObj.css("margin" , "8px");
		}
		if ( editObj ) {
			editObj.attr("style", "display:none");
			editObj.css("margin" , "8px");
		}
		setCommentColor("");
	}
	
	// 인쇄 시 수행버튼 숨김 처리 - 김정국 - chrome, ff에서 오류
	/*
	function window.onbeforeprint()
	{
		var btntbl = document.getElementsByName("btntbl");
		for( var i=0; i < btntbl.length; i++) {
			btntbl[i].style.display = "none";
		}
	}

	function window.onafterprint() {
		var btntbl = document.getElementsByName("btntbl");
		for( var i=0; i < btntbl.length; i++) {
			btntbl[i].style.display = "";
		}
	}
	*/
</script>
<script type="text/javascript">
$(document).ready(function(){
	
	var isNoticePopup = $.urlParam('isNoticePopup');
	if ( isNoticePopup == "true" ) {
		// 메인화면 새창 공지사항 일 경우 : 1.수행버튼 숨김, 2. 24시간 사용않음 버튼 하단에 추가
		$(".wizard-actions").hide();
		$("#close24").show();
	}
	
	//$(".wizard-actions").hide();
	//$("#close24").show();
	
// 	if (navigator.userAgent.match(/iPad/) == null && navigator.userAgent.match(/Mobile|Windows CE|Windows Phone|Opera Mini|POLARIS/) != null){
// 		var head = document.getElementsByTagName("head")[0];
// 		var s = document.createElement("meta");
// 		s.name = "viewport";
// 		s.content = "width=device-width, minimum-scale=0.4, maximum-scale=1, initial-scale=0.4, user-scalable=yes";
// 		head.appendChild(s);
// 		s = null;
// 	}
	
	ShowUserInfoSet();
	ViewHistorySet();
	
	pageScroll();	// page Scroll을 위해 사용. 2013-08-31
	
	setTimeout( "popupAutoResize2();", "500");		//팝업창 resize
	
	
});

//추천 (공감)
function fnRecommend(docId){
	$.ajax({
		url : "/bbs/setRecommend.htm",
		type : "post",
		dataType : "json",
		async : true,            //비동기식
		data : {
		  "docId" : docId
		},
		success : function(data, status, xhr) {
			location.reload();
			if (opener != null && opener.$("#grid-table").length > 0) {
    	    	opener.$("#grid-table").trigger("reloadGrid");
    	    }
		}
	});
}

function checkpopupoff(bbsId, docId, event, elem) {
	//event.stopPropagation();
	
	var bbsId = $.urlParam('bbsId');
	var docId = $.urlParam('docId');
	var id = bbsId+docId;
	var expdate = new Date();
	// 기본적으로 30일동안 기억하게 함. 일수를 조절하려면 * 30에서 숫자를 조절하면 됨
	expdate.setTime(expdate.getTime() + 1000 * 3600 * 24); // 30일
	setCookie("autoWindowPopup"+id, "off", expdate);
	
	self.close();
	//$(elem).closest(".gritter-item-wrapper").remove();
	
	//return false;
}
</script>

<script>
	function modify_go(category){
		location.href="../modify?category="+category+"&bno="+${board.bno};
	}
	function remove_go(category){
		location.href="../remove?category="+category+"&bno="+${board.bno};	
	}
</script>










