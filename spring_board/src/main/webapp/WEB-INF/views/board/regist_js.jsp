<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>



<!-- inline scripts related to this page end -->

<script type="text/javascript">
	function validCheck(){
		
    	var isValid = validator.form();
    	if(!isValid) validator.focusInvalid();
		return isValid;
	}
	
	function docSubmit(){
		var form = document.getElementById("registForm");
		// setEditorForm(); // 에디터의 데이터를 폼에 삽입
        if (!validCheck()) return false;
		if (!confirm("저장 하시겠습니까?")) return false;

		$(window).unbind("beforeunload");
		
		$("#closeDate").removeAttr("disabled");
		
		
		waitMsg();	/* Processing message */
		
		if ($('.template-upload') && $('.template-upload').length > 0) {
			//$('#fileuploadstartconfirm').val(1);
			$('.fileupload-buttonbar').find('.start').click();
//			$('button[type=submit]').click();
			//return false;
		} else {			
			$.ajax({
				url:"<%=request.getContextPath()%>/upload",
				type:"post",
				data:formData,
				processData:false,
				contentType:false,
				success:function(data){
				
					var fileName="";
					if(checkImageType(data)){
						fileName=data.substring(14).split('$$')[1];
						fileType="1";
					}else{
						fileName=data.substring(12).split('$$')[1];
						fileType="0";
					}
					
					var uploadPath=data.substring(0,12).replace(/\//g,"\\");
								
					var input1=$('<input>').attr('type','hidden')
					   					   .attr('name','attachList['+i+'].fileName')
					   					   .val(fileName);
					var input2=$('<input>').attr('type','hidden')
										   .attr('name','attachList['+i+'].fileType')
										   .val(fileType);
					var input3=$('<input>').attr('type','hidden')
										   .attr('name','attachList['+i+'].uploadPath')
										   .val(uploadPath);
					
					form.append(input1).append(input2).append(input3);
				}
			});
			
			controlSubmit(form);			
		}
		
	}

	function togglePopupPeriod(show){
		if(show) $("#popupPeriod").show();
		else $("#popupPeriod").hide();
	}

	function goSubmit(cmd,docId){ 
		var frm = document.getElementById("registForm");
		switch(cmd) {
			case "post":				 
				//if (!docSubmit()) return;
				docSubmit();
				//frm.submit();
				break;
			case "close":
				if(confirm("편집중인 문서는 저장되지 않습니다 !\n창을 닫으시겠습니까 ?")){
					window.close();
				}
				return;
				break;
			default:
				return;
				break;
		}
	}

	//시작-종료일 비활성화
	function blarDate(id){
		 if (id == "sDate"){
		 	$('#eDate').datepicker( "option", "minDate", $("#sDate").val() );
		 }else if (id == "eDate"){
		  	$('#sDate').datepicker( "option", "maxDate", $("#eDate").val() );
		 }
	}

	var result = null; // 다운로드 템플릿에 들어갈 JSON 데이터
	
	function fnSendCheck() {
	    var sendCheck = "";
	    if (sendCheck == "mailRead") {
	        var message_name = opener.$("[name='message_name']").val();
	        var contents = opener.$("#mailHtmlBody").html();
	        
	        var upload = opener.$("#fileupload");
	        var names = upload.find(".name");
	        var sizes = upload.find(".size");
	        var files = [];
	        for(var i = 0; i < names.length; i++) {
	            files[i] = { no: '', url: '', thumbnail_url: '', type: '', delete_url: '', delete_type: '',
	                 name: $(names[i]).text(),
	                 size: parseInt($(sizes[i]).attr("data-size"))
	            };
	        }
	        result = { files : files };
	        
	        $("[name='message_name']").val(message_name);
	        Editor.modify({ content: contents });
		    setTimeout("fnFileData();", "1000");
	    }
	    
	}
	
	function fnFileData() {
	    $("#upload").each(function () {
			var that = this;
			if (result.files.length > 0) {
				if ($("#upload").data("blueimpJUI-fileupload")) $(this).data('fileupload', $("#upload").data("blueimpJUI-fileupload"));
				$(that).fileupload('option', 'done').call(that, null, {result: result.files});
			}
			$(".fileupload-buttonbar").find(".delete").find("button").hide();
			$(".fileupload-buttonbar").find(".delete").find("[type='checkbox']").hide();
		});
	}
</script>
<script type="text/javascript">
var validator = null;
$(document).ready(function(){
	
	inputHiddenTagMove();	//ace theme - checkbox 오류해결을 위한 함수
	
	$("#openDate, #closeDate, #sDate, #eDate").datepicker({})
	.on('changeDate', function(e) {
		var minDate = new Date(e.date.valueOf());
		//팝업기간
		if ($(this).attr('id') == 'sDate') {
			$('input[id=eDate]').datepicker('setStartDate', minDate);
		} else if ($(this).attr('id') == 'eDate') {
			$('input[id=sDate]').datepicker('setEndDate', minDate);
		//게시기간
		} else if ($(this).attr('id') == 'openDate') {
			$('input[id=closeDate]').datepicker('setStartDate', minDate);
		} else if ($(this).attr('id') == 'closeDate') {
			$('input[id=openDate]').datepicker('setEndDate', minDate);
		}
	});;
	
	
/*
	var content = document.getElementById("bbs.content").value;
	var editor = document.getElementById("twe");	// tagFree
	if (editor == null || editor == undefined){
		//var txtContent = document.getElementById("txtContent");
		//txtContent.value = content;
		// 에디터에 데이터 삽입 
		Editor.modify({
			"content": content / 내용 문자열, 주어진 필드(textarea) 엘리먼트 /
		});
	}
	*/
	validator = $("#registForm").validate({
		rules:{
			"witer":{ required:true },
			"title":{ required:true },
			"cotent":{ required:true },
			"category":{ required:true },
// 			"bbs.closeDate":{ required:true }
		},
		messages:{
			"writer":{ required:"작성자를 입력해 주십시오 !" },
			"title":{ required:"제목을 입력해 주십시오 !" },
			"content":{ required:"내용을 입력해 주십시오 !" },
			"category":{ required:"분류를 선택해 주십시오 !" }
// 			"bbs.closeDate":{ required:"게시기간 종료일을 선택하십시요" }
		},
		focusInvalid:true
	});
	
	// 영구보존 관련 추가
	var cdate = "";
	 $('#never').click(function() {
       var ischecked = $('#never').is(":checked");
       if(ischecked){
           // 이전 값 보존 후, 영구설정.
           cdate = $("#closeDate").val();
           $("#closeDate").val( "2025-12-30" );
           $("#openDate").attr("disabled", "true" );
           $("#closeDate").attr("disabled", "true" );
       }else{
           // 이전 값 보존.
    	   $("#closeDate").val( cdate );
    	   $("#openDate").attr("disabled", "false");
           $("#closeDate").removeAttr("disabled");
       }
    });
	 
	 
	 
	if("false"){
	   	Organizations.formatAddress("sharelist");
	   	$('#sharelist').bind('dblclick', function() {
			var title = '조직도';
			var caption = '공유자 선택';
	   		Organizations.open('sharelist', title, caption, 0, 0, 1);
	   	});
	}
	
	//커뮤니티 조직도
	if($("input[name='search.workType']").val() == "3"){
		Organizations.setOpenFunc(function(str, titleStr, captionStr, onlyuserNum, onlydeptNum, multipleNum) {
			var that = this;
			var elem = document.getElementById(str);
			var url = "/club/member_selector.htm?";
			var par = new Array();
				par.push("title=" + encodeURI(titleStr));
				par.push("caption=" + encodeURI(captionStr));
				par.push("onlyuser=" + onlyuserNum);
				par.push("onlydept=" + onlydeptNum);
				par.push("multiple=" + multipleNum);
				par.push("clubId=" + $("input[name='search.moduleId']").val());
				
			var if_list = this.getFrameByName("if_list");
			var if_main = (this.isParent && this.isFrame && if_list)? if_list.parent.window: top;
			
			if_main.organizationsArgument = {};
			if_main.organizationsArgument.Item = that.Item;
			if_main.organizationsArgument.Data = that.Data[str] || [];
			if_main.organizationsArgument.Func = function(ret) {
				if (ret != null) {
					that.Data[str] = new Array();
					for(var i = 0; i < ret.length; i++) {
						var data = that.convert(ret[i]);
						that.Data[str].push(data);
						that.userFunc(str, data);
					}
					that.refreshSelect(elem, that.Data[str]);
				}
				try {
					hideIframeModal();
				} catch (e) {
					if_main.modalwindow.hide();
				}
			};
			
			var winWidth = (this.multiple)?550:280 + "px";
			
			try {
				showIframeModal(url+par.join("&"), 'Member Selector', '490', '410');
			} catch (e) {
				if_main.modalwindow = if_main.dhtmlmodal.open(
						url, "iframe", url+par.join("&"), title,
						"width="+winWidth+",height=410px,center=1,resize=1,scrolling=0", "recal"
				);
			}
		});
	}
	
	pageScroll();	// page Scroll을 위해 사용. 2013-08-31
	
	setTimeout( "popupAutoResize2();", "500");		//팝업창 resize
	
	fnSendCheck();
});

jQuery.validator.addMethod("datetimePeriod", function(value, element) {
	var sDateTime = $("#sDate").datepicker("getDate");
	var eDateTime = $("#eDate").datepicker("getDate");
	var isSTimePM = $("#sTimeAMPM").val() == "PM";
	var isETimePM = $("#eTimeAMPM").val() == "PM";
	var sTimeHour = parseInt($("#sTimeHour").val());
	var eTimeHour = parseInt($("#eTimeHour").val());
	var sTimeMinute = parseInt($("#sTimeMinute").val());
	var eTimeMinute = parseInt($("#eTimeMinute").val());
	if(isSTimePM) sTimeHour += 12;
	if(isETimePM) eTimeHour += 12;
	sDateTime.setHours(sTimeHour, sTimeMinute);
	eDateTime.setHours(eTimeHour, eTimeMinute);
    return eDateTime > sDateTime;
}, "기간선택이 올바르지 않습니다");

//분류 변경
function fnChangeCategory(){
	var form = $("#registForm");
	var category = $("select[name=category]").val();
	//alert(category);
	form.attr("action",category+"/regist");
	if(category=="free"){	
		$('div#upload').css("display","none");	
		form.attr("enctype","application/x-www-form-urlencoded");
		$('div.bbsId').css("display","none");
		$('div.preserveId').css("display","none");
		$('div.openDate').css("display","none");
		$('div.sharelist').css("display","none");
	}else if(category=="notice"){		
		$('div#upload').css("display","block");
		form.attr("enctype","multipart/form-data");
		$('div.bbsId').css("display","block");
		$('div.preserveId').css("display","none");
		$('div.openDate').css("display","block");
		$('div.sharelist').css("display","none");
		
		$('select[name="point"]').attr("disabled",false);
		$('select[name="point"]').empty();		
		var option2=$('<option>').prop("selected",true).attr("value","0").text("일반");		
		var option1=$('<option>').attr("value","1").text("중요");
		$('select[name="point"]').append(option1).append(option2);
		
	}else{		
		$('div#upload').css("display","block");
		form.attr("enctype","multipart/form-data");
		$('div.bbsId').css("display","block");
		$('div.preserveId').css("display","block");
		$('div.openDate').css("display","block");
		$('div.sharelist').css("display","block");
	}
}

</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.1.2/handlebars.min.js"></script>
<script id="templateAttach" type="text/x-handlebars-template">
<li style="width:10%;font-size:0.8em;position:relative;">
	<a href="{{fileName}}" class="btn btn-default btn-xs pull-right delbtn"
	   style="position:absolute;right:0;top:0;padding:0;" >
		<i class="fa fa-fw fa-remove"></i>
	</a>
	
	<span class="mailbox-attachment-icon has-img">
      <img src="{{imgsrc}}" alt=""></span> 
	 <span class="over" >{{fileName}}</span>
	    
</li>
</script>

<script>
var template=Handlebars.compile($('#templateAttach').html());

function getUploadFileInfo(fileName,imgsrc){
	
	var fileNameFormat = fileName.substring(fileName.lastIndexOf('.')+1);	
	if(!checkImageType(fileNameFormat)){
		var icon="";
		switch(fileNameFormat){
		case "doc":case "docx": icon="doc"; break;
		case "ppt":case "pptx": icon="ppt"; break;
		case "xlsx": case "xls": case "csv": icon="xls"; break;
		case "hwp": icon = "hwp"; break;
		case "zip": icon = "zip"; break;
		case "pdf": icon = "pdf"; break;
		default:icon = "file";		
		}		
		
		imgsrc="<%=request.getContextPath()%>/resources/commons/images/"+icon+".png";
	}
	
	return {fileName:fileName,imgsrc:imgsrc};
}

function checkImageType(fileName){
	var pattern=/jpg|gif|png|jpeg/i;	
	return fileName.toLowerCase().match(pattern);
}


$(document).on("dragenter dragover drop",function(event){
	event.preventDefault();
});

var formData = new FormData();
$('.fileDrop').on('drop',function(event){
	event.preventDefault();
	
	var files=event.originalEvent.dataTransfer.files;	
	var attachedNum=$('.uploadedList li').length;
	
	if((files.length+attachedNum)>3){
		alert("파일 업로드는 3개까지만 허용됩니다.");
		return;
	}
	var fileName,imgsrc,getLink;
	
	for(var file of files){		
		if(file.size>1024*1024*5){
			alert("파일 용량이 5MB를 초과하였습니다.");
			return false;
		}		
		//getUploadFileInfo(file);
		const reader = new FileReader();

		reader.onload = function (event) {
			formData.append(file.name,file);
			var fileInfo=getUploadFileInfo(file.name,reader.result);
			var html=template(fileInfo);
			$(".uploadedList").append(html);			
		};
		
		reader.readAsDataURL(file);
	}
});

$('.uploadedList').on('click','.delbtn',function(e){
	e.preventDefault();
	
	var that=$(this).parent('li').remove();
	formData.delete($(this).attr("href"));
});
</script>














