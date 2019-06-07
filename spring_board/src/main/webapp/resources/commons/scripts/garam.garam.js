
/**
 * bootstrap datepicker Default Option
 */
$.fn.datepicker.defaults.format = "yyyy-mm-dd";
$.fn.datepicker.defaults.language = "kr";
$.fn.datepicker.defaults.autoclose = true;
$.fn.datepicker.defaults.todayHighlight = true;

//2016.03.27 jkkim : body style set( common )
function bodyStyleSet() {
	//$("body").css({"font-family": "Open Sans, Dotum"});
	//$("body").css({"font-family": "Open Sans, Malgun Gothic"});
	
	//var g_skin = $.cookie('g_skin');
	//$('body').attr( "class" , "" );
	//$('body').addClass(g_skin);
}

//Here we set the altRows option globally - 2016.03.27 jkkim
function jqGrid_init(){
	jQuery.extend(jQuery.jgrid.defaults,{
		
		prmNames: {search: null, nd: null, rows: "rowsNum", page: "pageNo", sort: "sortColumn", order: "sortType"}, // url 공통 파라미터명 설정

		viewrecords: true,					//현페이지 행정보 표시
		recordtext: "{2} 건",				//recordtext: "View {0} - {1} of {2}",
	    emptyrecords: "No Data",		//emptyrecords: "Nothing to display",
		loadtext: " Data Loading...",
		pgtext : "{0} / {1}",					//pgtext : "Page {0} of {1}",
		
		gridview: true,
		altRows:true,							// 행간 줄 구분
		//rowNum:"${userConfig.listPPage}",	//한페이지 행수 - 안먹힘		
		rowList: [10, 20, 30, 50, 100],							//한페이지 행수선택
		width:"100%",
		loadError:function(xhr,st,err) {
			$("#errorDisplayer").css({
				"position" : "absolute",
				"width" : "100%",
				"top" : "50%",
				"margin-top" : "5em",
				"text-align" : "center"
			});
			$("#errorDisplayer").html("Type: "+st+"; Response: "+ xhr.status + " "+xhr.statusText);
	    	//<div style="position:absolute;top:50%;margin-top:-5em;width:100%;text-align:center;">등록된 자료가 없습니다.</div>
	    }
		
	});
	//jqGridNavigator(grid_selector, pager_selector); //그리드 네비게이션 버튼 설정	
}

function jqgridLoadComplete( grid ) {
	setTimeout(function() {
		updatePagerIcons(grid);			//그리드 페이지 이동 버튼 아이콘 대체
		enableTooltips(grid);				//그리드 네이게이션 버튼 툴팁 활성
	}, 0);

	gridObj = $(grid);
	var id = gridObj.attr("id");
	
	var noData = document.getElementById("noDataBody_"+id);
	if ( !noData ) {
		var emptyMsgDiv = $("<div id='noDataBody_"+id+"' style='width:100%;height:100%;position:relative;display:none;'><div class='noDataMsg blue bigger-200'><i class='red ace-icon fa fa-exclamation-circle'></i> No Data(s) </div></div>");	
		emptyMsgDiv.insertAfter( gridObj.parent() );
	}

	//앨범형 표시공간
	var imgData = document.getElementById("imgDataBody_"+id);
	if ( !imgData ) {
		var emptyMsgDiv = $("<div id='imgDataBody_"+id+"'style='width:100%;height:100%;position:relative;display:none;padding-top:12px;'></div>");
		emptyMsgDiv.insertAfter( gridObj.parent() );
	}

	var ids = gridObj.jqGrid('getDataIDs');
    if (ids.length == 0) {
    	$("#noDataBody_"+id).show();
    } else {
    	$("#noDataBody_"+id).hide();
    }

	ShowUserInfoSet(); //사용자 툴팁
	//listShowAttach();	 //첨부파일
	//$('[name=listAttach]').css({"cursor":"default"});
	
}

/**
 * jqGrid pagerIcons (그리드 페이지 이동 버튼 아이콘 대체)
 * @param table : 그리드객체
 */
function updatePagerIcons(table) {
	var replacement = {
		'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
		'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
		'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
		'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
	};
	$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function() {
		var icon = $(this);
		var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
		if ($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
	});
}

/**
 * jqGrid navButtons Tooltip (그리드 네이게이션 버튼 툴팁 활성)
 * @param table : 그리드객체
 */
function enableTooltips(table) {
	$('.navtable .ui-pg-button').tooltip({container:'body'});
	$(table).find('.ui-pg-div').tooltip({container:'body'});
}


/**
 * jqGrid reSize (그리드 크기 자동조절)
 * @param grid_selector : 그리드ID
 * @param width : 추가넓이
 * @param height : 추가높이
 */
function jqGridResizeTop(grid_selector, width, height, column) {
	
	//var paddingSize = 40;
	var parent_column = $(grid_selector).closest('[class*="col-"]');
	
	$(top.window).bind('resize', function() {
	//$(window).bind('resize.jqGrid', function() {
		setTimeout(function() {

			var mode = (window.matchMedia('(max-width: 480px)').matches) ? "1" : "";
			
			// mobile일 경우, grid 컬럼 숨김 및 보이기 - TEST 중 : 2016.05.12 jkkim
			if (window.matchMedia('(max-width: 480px)').matches) {
				$(grid_selector).jqGrid('hideCol', column);
				$(grid_selector).jqGrid('hideCol', "subject");
				$(grid_selector).jqGrid('showCol', "subjectM");
			} else {
				$(grid_selector).jqGrid('showCol',column);
				$(grid_selector).jqGrid('hideCol', "subjectM");
				$(grid_selector).jqGrid('showCol', "subject");
			}
			
			$(grid_selector).jqGrid('setGridWidth', parent_column.width() );
			
			var ttHei = top.$('#navbar').height();
			var sHei = top.$('#sidebar').height();	// side bar menu height
			
			var ssHei = top.$(window).height();					
			var bHei = $('.breadcrumbs').height();
			var wHei = $('.page-content').find('.row').height();
			var Hei = ssHei - (bHei + wHei);

			//alert( Hei + " = 최상위 : " + ttHei + "/ 상단메뉴 : " + sHei + "/ 로케이션 : " + bHei + "/ 수행버튼 : " + wHei);
			//$(grid_selector).parents('div.ui-jqgrid-bdiv').css("height", (Hei-100 ) );

			if ( $("ul.nav-tabs").length > 0 ) {
				Hei += $("ul.nav-tabs").height();
			}
			
			var c_url = self.location.href.toLowerCase();
			
			if( c_url.indexOf( "addressbook/list.htm" ) > -1 ) {
				$(grid_selector).parents('div.ui-jqgrid-bdiv').css("height", (Hei-130 ) );	// addressbook 일 경우. 임시처리 : 2016.05.09 jkkim
			} else if( c_url.indexOf( "/proposal/proposal_list_status.jsp" ) > -1 ) {
				$(grid_selector).parents('div.ui-jqgrid-bdiv').css("height", (Hei-135 ) );
			} else if( c_url.indexOf( "/proposal/proposal_list_prize.jsp" ) > -1 ) {
				if ("#grid-table1" == grid_selector) {
					$(grid_selector).parents('div.ui-jqgrid-bdiv').css("height", (Hei-220 ) );
				} else if ("#grid-table2" == grid_selector) {
					$(grid_selector).parents('div.ui-jqgrid-bdiv').css("height", (Hei-161 ) );
				}
			} else if( c_url.indexOf( "/fixtures/bookinglist.jsp" ) > -1 || c_url.indexOf( "/fixtures/requisition_list.jsp" ) > -1 ) {
				$(grid_selector).parents('div.ui-jqgrid-bdiv').css("height", (Hei-200 ) );	// 자원관리 일 경우. 임시처리 : 2016.05.09 jkkim
				
			} else if( c_url.split("").reverse().join("").lastIndexOf( "mail/list.htm?box=1&topbox=1".split("").reverse().join("") ) == 0
			                || c_url.split("").reverse().join("").lastIndexOf( "mail/list.htm?unread=1&topbox=1".split("").reverse().join("") ) == 0
			                || c_url.split("").reverse().join("").lastIndexOf( "mail/list.htm?box=2".split("").reverse().join("") ) == 0
			                || c_url.split("").reverse().join("").lastIndexOf( "mail/receipt_list.htm?box=2&topbox=2".split("").reverse().join("") ) == 0) {
			    //전자메일 (받은편지함/보낸편지함/읽지않은메일/수신확인) 목록일 경우 그리드 높이 재조절
			    $(grid_selector).parents('div.ui-jqgrid-bdiv').css("height", (Hei-200 ) );
			} else if( c_url.split("").reverse().join("").lastIndexOf( "/mail/config.htm?type=4&gubun=p".split("").reverse().join("") ) == 0
					|| c_url.split("").reverse().join("").lastIndexOf( "/mail/config.htm?type=4&gubun=s".split("").reverse().join("") ) == 0) {	//소문자 확인
				//메일그룹관리
				$(grid_selector).parents('div.ui-jqgrid-bdiv').css("height", (Hei+00) );
				
			} else if( 
					c_url.split("").reverse().join("").lastIndexOf( "club/list.htm?cmd=t".split("").reverse().join("") ) == 0 ||
					c_url.split("").reverse().join("").lastIndexOf( "club/my_list.htm?cmd=m".split("").reverse().join("") ) == 0
					) {
				//커뮤니티 목록
				$(grid_selector).parents('div.ui-jqgrid-bdiv').css("height", (Hei-200 ) );
				
			} else if( 
					c_url.split("").reverse().join("").lastIndexOf( "approval/receivelist.htm?menu=640".split("").reverse().join("") ) == 0 ||
					c_url.split("").reverse().join("").lastIndexOf( "approval/receivelist.htm?menu=640&readchk=f".split("").reverse().join("") ) == 0 ||
					c_url.split("").reverse().join("").lastIndexOf( "approval/receivelist.htm?menu=640&readchk=t".split("").reverse().join("") ) == 0
//					c_url.split("").reverse().join("").lastIndexOf( "approval/receivelist.htm?menu=640&formid=&readchk=f".split("").reverse().join("") ) == 0 ||
//					c_url.split("").reverse().join("").lastIndexOf( "approval/receivelist.htm?menu=640&formid=&readchk=t".split("").reverse().join("") ) == 0 ||
			) {
				//결재 수신
				$(grid_selector).parents('div.ui-jqgrid-bdiv').css("height", (Hei-200 ) );
				
			} else if( 
					c_url.split("").reverse().join("").lastIndexOf( "todo/list.htm?dscd=10&worktype=2&moduleid=".split("").reverse().join("") ) == 0 ||
					c_url.split("").reverse().join("").lastIndexOf( "todo/list.htm?dscd=20&worktype=2&moduleid=".split("").reverse().join("") ) == 0 ||
					c_url.split("").reverse().join("").lastIndexOf( "todo/list.htm?dscd=30&worktype=2&moduleid=".split("").reverse().join("") ) == 0
			) {
				//작업관리
				$(grid_selector).parents('div.ui-jqgrid-bdiv').css("height", (Hei-200 ) );
				
			} else if( c_url.indexOf("/bbs/list.htm?bbsid=") > -1) {	//게시판
				
				if ( $("ul.nav-tabs").length > 0 ) {
					$(grid_selector).parents('div.ui-jqgrid-bdiv').css("height", (Hei-200 ) );
				} else {
					$(grid_selector).parents('div.ui-jqgrid-bdiv').css("height", (Hei-130 ) );
				}
				
				/*
				//게시판분류 tabs 존재유무 확인
				if(fnBoardTabsCheck() == "true"){
					$(grid_selector).parents('div.ui-jqgrid-bdiv').css("height", (Hei-135 ) );
				}else{
					$(grid_selector).parents('div.ui-jqgrid-bdiv').css("height", (Hei-100 ) );
				}
				*/

			} else if( c_url.indexOf("/configuration/user_vacc_annual_selector.htm") > -1) { //전자결재 근태신청서 근태이력 선택기
				$(grid_selector).parents('div.ui-jqgrid-bdiv').css("height", height);
			} else if (c_url.indexOf("/weektime/") > -1) { //잔업시간
				$(grid_selector).parents('div.ui-jqgrid-bdiv').css("height", (Hei+height ) ); console.log(1);
			} else {
				$(grid_selector).parents('div.ui-jqgrid-bdiv').css("height", (Hei-120 ) );
			}			// inside container 일때와 아닐때 서로다름. 추후보완 : 2016-04-22 jkkim
			//container
		}, 100);
	}).trigger('resize');

	//top.ifListHeight();	// 김정국 추가 : 좀더 보완 필요함. 높이는 top의 body와 iflist 길이를 참조해야 함.
	
	/* jqGrid 공통 처리를 위해 삽입 - 2013.01 김정국 */
	//$(grid_selector).find(">tbody>tr.jqgrow:visible:odd").addClass("myAltRowClass");
	
	//alert("TEST");
}

function ifListHeight() {
    var wHeight = $(window).height(); // window height
    var ttHei = 0; // navbar height
    var sHei = 0; // side bar menu height
    
    if (top.$("#navbar:visible").length > 0) {
        ttHei = top.$("#navbar").height();
    }
    
    if (top.$("#sidebar:visible").length > 0) {
        sHei = top.$("#sidebar").height();
    }
    
    var hei =  wHeight - (ttHei + sHei + 1);
    //console.log("hei["+hei+"] =  wHeight["+wHeight+"] - (ttHei["+ttHei+"] + sHei["+sHei+"] + 5)");
    
    if ($("#if_list").attr("src") == "/main.htm") {
        hei = $("#if_list").contents().find("body").height();
    }
    
    $("#if_list").css("height", hei);
}

function ifListHeightss() {
	var wHeight = $(window).height();
	var nHeight = $("#navbar").find(".navbar-header").height() +3;
	var sHeight = 0;
	if (window.matchMedia('(min-width: 992px)').matches) {
		sHeight = $("#sidebar").height() +17;
	}
 
	var height1 = wHeight - nHeight - sHeight;
	var height2 = $("#if_list").contents().find("body").height();
	
	//alert( $("#if_list").attr("src") + "/" + height1 + "/" +  height2 );
	var height = height1 + 15;
	if( $("#if_list").attr("src") == "/main.htm") {
		//alert('main iframe resiz : ' + height2);
		height = height2;
	}
	
// 	if (height < height2) {
// 		height = height2;
// 	}
// 	$("#if_list_div").css("padding-bottom", height);
	$("#if_list").css("height", height);
}

function jqGridResizeTop___BK(grid_selector, width, height) {
	//var paddingSize = 40;
	var parent_column = $(grid_selector).closest('[class*="col-"]');
	$(window).bind('resize.jqGrid', function() {
		setTimeout(function() {
			//$(grid_selector).jqGrid('setGridWidth', $(window).width() + width - paddingSize);
			$(grid_selector).jqGrid('setGridWidth', parent_column.width() );
			
//			$(grid_selector).parents('div.ui-jqgrid-bdiv').css("min-height","50px");
			//$(grid_selector).jqGrid('setGridHeight', $(window).height() + height);
			
			
			$(grid_selector).parents('div.ui-jqgrid-bdiv').css("height", $(window).height() - 250 );
			//$(grid_selector).jqGrid('setGridHeight', $(window).height() - 250 );

			//$(grid_selector).find('div:not(.ui-jqgrid-titlebar)').filter(':not(.ui-pager-control)').width("100%");
			
		}, 0);
	}).trigger('resize').trigger('resize');
}

/**
 * jqGrid navButtons (그리드 네비게이션 버튼 설정)
 * @param grid_selector : 그리드ID
 */
function jqGridNavigator(grid_selector, pager_selector) {
	jQuery(grid_selector).jqGrid('navGrid', pager_selector, { 	//navbar options 페이지 부분에 버튼
		edit: false, add: false, del: false, search: false, view: false,
		refresh: true, refreshicon : 'ace-icon fa fa-refresh green'
	});
	
//	$('.ui-pg-selbox').css({"width":"40px"});
}

/**
 * Bootstrap Modal Open (모달창 IFRAME 열기)
 * @param url : iframe 주소
 * @param title : modal 제목
 * @param width : modal 내용 폭
 * @param height : modal 내용 높이
 */
function showIframeModal(url, title, width, height) {
	hideIframeModal();
	var dialog = $('<div class="modal fade" id="iframeModal"><div class="modal-dialog" style="width:' + width + 'px; max-width:'+width+'px;margin:10px auto;"><div class="modal-content"><div class="modal-body"></div></div></div></div>');
	var header = $('<div class="modal-header"><h4 class="modal-title">'+title+'</h4></div>').css({"padding":"10px 10px 3px"});
	var footer = $('<div class="modal-footer"></div>');
	var closeButton = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
	var iframe = $("<iframe src='"+url+"' width='100%' height='"+height+"'></iframe>").css({"border":"0"});
	var body = dialog.find(".modal-body").css({"padding":"0"});
    
	if (title != "") body.before(header.prepend(closeButton));
	body.html(iframe);
	//body.after(footer);
	
	$("body").append(dialog);
	
	dialog.modal({ backdrop: "static", show: true });
	
	var filter = "win16|win32|win64|mac|macintel";
	if ( navigator.platform ) {
		if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {	//mobile
		} else {	//pc
			dialog.draggable({ handle: ".modal-header" });	// drap & drop 활성화 : 2017.04.11 jkkim
		}
	}
	dialog.on('hidden.bs.modal', function (e) { $(this).remove(); });
}

/**
 * Bootstrap Modal Close (모달창 IFRAME 닫기)
 */
function hideIframeModal() {
	$("#iframeModal").modal("hide");
}

/**
 * JSTL form:checkbox 에서 생성한 input:hidden 태그를 form 마지막에 이동
 * 주의: input:hidden name이 언더바(_)로 시작하는 모든 태그를 이동시킴
 */
function inputHiddenTagMove() {
    $("input:hidden[name^='_']").each(function(index, element) {
        var form = $(this).parents("form");
        if (form) form.append($(this));
    });
}
 
//이메일 클릭(메일작성)
function openMailForm(mailto) {
	var url = "/mail/mail_form.htm?mailto=" + encodeURI(mailto);
	OpenWindow( url, "", "800" , "650" );
}

//기본폰트변경
function changeFontFamily(font) {
    var wins = new Array();
    wins.push(document);
    for(var i = 0; i < window.frames.length; i++) {
    	try { wins.push(window.frames[i].document); } catch (e) {}
    }
    
    for(var i = 0; i < wins.length; i++) {
        var doc = wins[i];
        var fontFamilyStyleSheet = doc.getElementById("fontFamilyStyleSheet");
        if (fontFamilyStyleSheet == null) {
            var style = document.createElement('style');
            style.id = "fontFamilyStyleSheet";
            doc.body.appendChild(style);
            fontFamilyStyleSheet = doc.getElementById("fontFamilyStyleSheet");
        }
        if (font != "") {
            fontFamilyStyleSheet.innerHTML = "body { font-family: '"+font+"', sans-serif !important; }";
        } else {
            fontFamilyStyleSheet.innerHTML = "";
        }
    }
    setAceSetting("fontFamily", font);
}

//에디터 기본 글꼴크기 변경
function changeEditerFontSize(size) {
  setAceSetting("editerFontSize", size);
}

//개인환경설정 저장 후 세션에 반영
function setAceSetting(key, value) {
    var data = {};
    switch(key) {
    	case "skinColor": data = {"skinColor":value}; break;
    	case "fontFamily": data = {"fontFamily":value}; break;
    	case "containerFixed": data = {"containerFixed":value}; break;
    	case "editerFontSize": data = {"editerFontSize":value}; break;
    }
    
    $.ajax({
        type: 'post',
        dataType: 'json',
        async: true,
        url: '/configuration/aceSetting.htm',
        data: data,
        beforeSend: function() {},
        complete: function() {},
        success: function(data, status, xhr) {},
        error: function(xhr, status, error) {}
    });
}

//2016-05-01 김정국 공통으로 추가
function pageInit() {
	// url ? parameter 추출 기본함수
	$.urlParam = function(name){
	    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	    if (results==null){
	       return null;
	    }
	    else{
	       return results[1] || 0;
	    }
	}
	
	// 문서 작성 시 화면 바뀜을 방지하기 위해 추가
	var msg = new Array();
	msg.push("현재 문서를 작성중에 있습니다.");	/*현재 문서를 작성중에 있습니다.*/
	msg.push("새로고침 또는 페이지를 벗어날 경우 내용이 사라집니다 !");	/*새로고침 또는 페이지를 벗어날 경우 내용이 사라집니다.*/
	msg.push("저장하려면 메시지 창을 닫은 후 [저장] 버튼을 클릭하세요.");	/*저장하려면 메시지 창을 닫은 후 저장버튼을 클릭하세요.*/
	// 아래 주소만 메시지 띄움
	var checkForm = ["/FORM.HTM","/MAIL_FORM.HTM","/GROUPFORM.HTM","/MAIL_REPRESENTATIONFORM.JSP","/IMSIDOC.HTM","CORPSCHEDULE_FORM.HTM","/FORM.JSP","/POLL_M_FORM.JSP"];
	var CURRENT_URL = self.location.href.toUpperCase();
	
	for(var i=0 ; i < checkForm.length ; i++){
		if( CURRENT_URL.indexOf( checkForm[i] ) > -1 ) {
			$(window).bind("beforeunload", function(event) {
				return msg.join("\n\n") + "\n";
			});
		}
	}
	
}

pageInit(); 	//test 중

// 페이지 로드 시간을 콘솔로 확인
function loadtime() {
    setTimeout(function() {
        var ntime = performance.timing;
        var total = ntime.loadEventEnd - ntime.navigationStart;
//      var redirect = ntime.redirectEnd - ntime.redirectStart;
//      var cache = ntime.domainLookupStart - ntime.fetchStart;
//      var dnslookup = ntime.domainLookupEnd - ntime.domainLookupStart;
//      var connect = ntime.connectEnd - ntime.connectStart;
        var request = ntime.responseStart - ntime.requestStart;
        var response = ntime.responseEnd - ntime.responseStart;
        var dom = ntime.domComplete - ntime.domLoading;
//      var load = ntime.loadEventEnd - ntime.loadEventStart;
        console.log("total : " + total + "ms");
//      console.log("redirect : " + redirect + "ms");
//      console.log("cache : " + cache + "ms");
//      console.log("dnslookup : " + dnslookup + "ms");
//      console.log("connect : " + connect + "ms");
        console.log("request : " + request + "ms");
        console.log("response : " + response + "ms");
        console.log("dom : " + dom + "ms");
//      console.log("load : " + load + "ms");
    }, 10);
}

//전자결재 - 가로세로 설정 부분. 
function setPaperType(paperType) {
    //Logger.debug(arguments.callee.name+"("+[].join.call(arguments, ', ')+")");
    
	// 가로 : 900 , 세로 1250. 기준 없음. 임의설정.
	var paperWidth = document.getElementById("paperWidth");
	var pWidth = 900;
	if ( paperType == "L") {
		pWidth = 1250; // 다음에디터는 +40px 확장필요 : 신규 작성시에만
	}
	
	if ( paperType == "L" ) {
		pWidth = pWidth + 0;
		wWidth = pWidth + 50;
		wHeight = 750;
	} else {
		pWidth = pWidth + 0;
		wWidth = pWidth + 50;
		wHeight = 750;
	}
	window.resizeTo( wWidth, wHeight);
	paperWidth.style.width = pWidth + "px";
	
	/*
	<style type="text/css" media="print">
    @page { 
        size: landscape;
    }
    body { 
        writing-mode: tb-rl;
    }
	</style>
	 */
	
	//window.resizeTo( wWidth, wHeight);
	//window.resizeTo( wWidth, wHeight);
	
	//paperWidth.style.width = pWidth + "px";
	//approvalDocWidth.style.width = (pWidth-13) + "px";
	
	//approvalDocWidth.style.width = pWidth + "px";
}

// 모바일 조회 시 버튼 생성. : 2019-02-18 jkkim
function MobileBtnCopy() {
	// 1. Mobile Btn Create
	if ( $("#mobile_Action_Btn").length > 0 ) return;
	
	var btnObj = $(".wizard-actions-L>button, .wizard-actions-L>div.btn-group");
//	if ( btnObj.length == 0 ) {
//		var btnObj = $(".wizard-actions>button, .wizard-actions>div.btn-group");
//	}
	
	if ( btnObj.length == 0 ) return;
	
	var tag = "";
	tag += '<div id="mobile_button_div" class="btn-group right">';
		tag += '<button id="mobile_Action_Btn" data-toggle="dropdown" class="btn btn-sm btn-danger btn-round dropdown-toggle" aria-expanded="false">';
		tag += 'Action<i class="ace-icon fa fa-angle-down icon-on-right"></i>';
		tag += '</button>';
	
		tag += '<ul id="Mobile_Action_UL" class="dropdown-menu dropdown-danger dropdown-menu-right"></ul>';
		
		tag += '</div>';
		
	$(".breadcrumb").after( tag );
	

	// 2. 수행버튼 검색 후 존재하면 모바일용 버튼리스트 추가. 없으면 버튼 숨김처리.
	var mBtn = "#Mobile_Action_Btn";
	var mMenu = "#Mobile_Action_UL";
	
	
	if ( btnObj.length == 0 ) {
		//리스트에 버튼이 없으면 숨김.
		$(mBtn).hide();
	} else {
		//버튼이 있으면, 버튼을 생성
		$(btnObj).each(function() {
			//var $li=$("<li>" + $(this).parent().html() + "</li>");
			
			if ( this.tagName == "BUTTON" ) {
				var o_li=$("<li style='padding:0px 5px; height:35px;'>" + $(this).clone().wrapAll("<button/>").parent().html() + "</li>");					
				$(o_li).find("button").css("width" , "100%");
				$(o_li).find("button").css("text-align" , "left");
				$(mMenu).append(o_li);
//				console.log( this.tagName + " Append");
			} else {
				//btn-group 일 경우,... find(li) ==> li > a.html을 그대로 적용
				var li_Obj = $(this).find("li");
				$(li_Obj).each(function() {
					var o_li = $('<li style="padding:0px 5px; height:25px;">' + $(this).html() + '</li>');
//					console.log( this.tagName + " Append");
					$(mMenu).append(o_li);
				});
			}
		});
		$(mMenu).css("padding-top", "0px");
		//console.log ( $(mMenu).html() );
	}
	
		// 모바일 검색기능 표시 : .wizard-inner-R 또는 #searchKey 기준으로 버튼 생성함.
	return;
	
		if ( $(".wizard-inner-R").length > 0) {
			tag = '<button class="btn btn-sm btn-inverse btn-round" style="margin-left:5px;" onclick="mobileSearch();">';
			tag += '<i class="ace-icon fa fa-search bigger-130 no-margin"></i>';
			tag += '</button>';
			$(mMenu).after(tag);
		}
}

// 상위.모바일 용 검색 버튼 클릭 시. : 2019-02-18 jkkim
function mobileSearch() {
	//검색상자를 모달로 오픈... wizard-inner-R
	var sTag = "<div id='mSrch'>" + $(".wizard-inner-R").html() + "</div>";
	var bDialog = bootbox.dialog({
		title: "Search",
		message: sTag,
		modal: true,
		resizable: false,
		closeButton: true,
		width: 170
	});
	
	var srchHtml = $("#mSrch");
	var sSel = srchHtml.find("select");
	var sInput = srchHtml.find("input");
	var sReset = srchHtml.find("#gridSearchReset");
	
	srchHtml.find(".input-group").css("display" , "initial");
	srchHtml.find("#gridSearchReset").css("display" , "");
	
	$(sSel).css("width" , "100%");
	$(sInput).css( "width" , "75%");
	$(sInput).css( "margin-left" , "");
	
	$("div.bootbox-body span#gridSearch").bind("click", function() {
		var sKey = $(sSel).val(); 
		var sVal = $(sInput).val();
		$("select[name='searchKey']").eq(0).val( sKey );
		$("input[name='searchValue']").eq(0).val( sVal );

		$('#gridSearch').eq(0).trigger('click');
	});
	
	$("div.bootbox-body input#searchValue").keydown(function(e) {
		if (e.keyCode == 13) {
			var sKey = $(sSel).val(); 
			var sVal = $(sInput).val();
			$("select[name='searchKey']").eq(0).val( sKey );
			$("input[name='searchValue']").eq(0).val( sVal );

			$('#gridSearch').eq(0).trigger('click');
		}
	});
	
	$("div.bootbox-body span#gridSearchReset").bind("click", function() {
		$('#gridSearchReset').eq(0).trigger('click');
	});
}

$(function() {
	MobileBtnCopy();
});
