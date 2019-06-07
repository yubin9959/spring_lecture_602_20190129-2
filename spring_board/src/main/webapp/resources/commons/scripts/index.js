
function reURL(mCode) {
    // HTML5 지원브라우저에서 사용 가능
    if (typeof(history.pushState) == 'function') {
        //현재 주소를 가져온다.
        var renewURL = location.href;
        //현재 주소 중 .htm 뒤 부분이 있다면 날려버린다.
        renewURL = renewURL.substring(0, renewURL.indexOf(".htm")+4);

        if (mCode != 'MENU90') {
            renewURL += "?mCode="+mCode;
        }
         
        //페이지를 리로드하지 않고 페이지 주소만 변경할 때 사용
        history.pushState(null, null, renewURL);
    } else {
        location.hash = "#"+mCode;
    }
}

/**
 * 주소의 메뉴코드를 입력한 URL의 메뉴코드로 변경
 * @param url 메뉴의 URL
 */
function setMenuURL(url) {
    link_element = $('#sidebar').find('a[data-url="'+url+'"]');
    var mCode = link_element.attr("data-mcode");
    
    // HTML5 지원브라우저에서 사용 가능
    if (typeof(history.pushState) == 'function') {
        //현재 주소를 가져온다.
        var renewURL = location.href;
        //현재 주소 중 .htm 뒤 부분이 있다면 날려버린다.
        renewURL = renewURL.substring(0, renewURL.indexOf(".htm")+4);

        if (mCode != 'MENU90') {
            renewURL += "?mCode="+mCode;
        }
         
        //페이지를 리로드하지 않고 페이지 주소만 변경할 때 사용
        history.pushState(null, null, renewURL);
    } else {
        location.hash = "#"+mCode;
    }
    return window;
}

/**
 * URL 문자열에서 파라미터 정보 반환
 */
function getStrUrlParam(url) {
	var params = {};
	if (url.indexOf("?") > -1) {
		var a = url.split("?")[1];
		var b = a.split("&");
		for (var i = 0; i < b.length; i++) {
			var c = b[i].split('=');
	        params[c[0]] = c[1];
		}
	}
	return params;
}

/**
 * 주소의 메뉴코드로 메뉴이동
 */
function menuMove() {
	var params = {};
	var hashes = location.search.substring(1).split("&");
	for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        params[hash[0]] = hash[1];
    }
    onTopMenu(params['mCode']);
}

function initHash() {
    var ages = location.hash.split("/"); // Hash
    var mCode = ages[0].substring(1) || ""; // MenuCode
    var lCode = ages[1] || ""; // LinkCode
    var tCode = ""; // TopMenu
    var sCode = ""; // SubMenu
    
    if (mCode.length >= 8) {
        tCode = mCode.substring(0, 8);
    }
    
    if (lCode.length > 0) {
        sCode = lCode;
    } else if (mCode.length >= 10) {
        sCode = mCode.substring(0, 10);
    }
    
    var topStr = "onTopMenu('"+tCode+"','"+sCode+"');";
    try {
        if (tCode.length > 0) eval(topStr);
    } catch(e) {
        try { console.log("Exception eval:"+topStr); } catch(e) {}
    }
}

function getTelInfoHtml() {
    var url = "/common/tel_explorer.htm";
    var title = "전화번호 검색"; /* 전화번호 검색 */
    var opt = "width=940px,height=400px,resize=1,scrolling=1,center=1";
    
    OpenWindow(url, title, "940", "450");	//2018-01-16 팝업으로 변경 대현
//    showIframeModal(url, title, 940, 400);
    //dhtmlwindow.open(url, "iframe", url, title, opt, "recal");
}

function newContents( args ) {
    var url = "";
    
    switch(args) {
    case 1 :        //new mail
        url = "/mail/mail_form.htm";
        OpenWindow( url, "", "800" , "630" );
        break;
    case 2 :        //new approval
        //url = "/approval/imsidoc.htm?menu=110&formId=2016040816305407";
        url = "/approval/gianlist.htm";
        OpenWindow( url, "", "870" , "800" );
        break;
    case 3 :        //new schedule
        url = "/schedule/form.htm";
        OpenWindow( url, "", "800" , "490" );
        break;
    case 4 :        //new task
        url = "/todo/form.htm";
        OpenWindow( url, "", "800" , "750" );
        break;
    case 5 :        //new sms
        url = "/sms/sms_form.jsp";
        OpenWindow( url, "", "800" , "500" );
        break;
    }
}

/* clock set */
function setClock(lang) {
    // Create two variable with the names of the months and days in an array
	//영어
    var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 
    var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    //한국어
    var monthNamesKo = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12" ]; 
    var dayNamesKo= ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"]

    // Create a newDate() object
    var newDate = new Date();
    // Extract the current date from Date object
    newDate.setDate(newDate.getDate());
    // Output the day, date, month and year    
    //언어확인
    if("ko" == lang.toLowerCase()){
    	$('#Date').html(newDate.getFullYear() + '년 ' + monthNamesKo[newDate.getMonth()] + '월 '+ newDate.getDate()+ '일 ' + dayNamesKo[newDate.getDay()]);
    }else{
    $('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());
    }
    $("#point, #point1").html(":");
    
    var ssFunc = function() {
        // Create a newDate() object and extract the seconds of the current time on the visitor's
        var seconds = new Date().getSeconds();
        // Add a leading zero to seconds value
        $("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
    };
    ssFunc();
    setInterval(ssFunc, 1000);
        
    var mmFunc = function() {
        // Create a newDate() object and extract the minutes of the current time on the visitor's
        var minutes = new Date().getMinutes();
        // Add a leading zero to the minutes value
        $("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
    };
    mmFunc()
    setInterval(mmFunc, 1000);
        
    var hhFunc = function() {
        // Create a newDate() object and extract the hours of the current time on the visitor's
        var hours = new Date().getHours();
        // Add a leading zero to the hours value
        $("#hours").html(( hours < 10 ? "0" : "" ) + hours);
    };
    hhFunc();
    setInterval(hhFunc, 1000);
}


function menuA(menu, mCode, lang) {
    var ul = $("<ul></ul>");
    
    for(var i = 0; i < menu.subMenuCode.length; i++) {
        var subMenu = menu.subMenuCode[i];
        
        if (subMenu.codeName == 'category') continue;
        if (subMenu.enable != true) continue;
        
        //if (subMenu.tpCode == 'MENU05') {
        //  if (subMenu.codeLevel > 1 && subMenu.subMenuCode.length > 0)
        //      continue;
        //}
        
        var isCategory = false;
        if (subMenu.subMenuCode.length == 1) {
            for(var j = 0; j < subMenu.subMenuCode.length; j++) {
                if (subMenu.subMenuCode[j].codeName == 'category') {
                    isCategory = true;
                }
            }
        }
        
        var li = $("<li class='hover highlight'></li>");
        
        if (mCode.indexOf(subMenu.mCode) > -1) {
            li.addClass("active");
            li.addClass("open");
        }
        
        if (subMenu.mCode == "MENU1601" ||
            subMenu.mCode == "MENU1602" ||
            subMenu.mCode == "MENU1603" ||
            subMenu.mCode == "MENU1604" ||
            subMenu.mCode == "MENU1605" ||
            subMenu.mCode == "MENU1609" ||
            subMenu.mCode == "MENU1905" ||	//커뮤니티 ID가 필수인 메뉴는 숨김처리 추가
            subMenu.mCode == "MENU1907" ||
            subMenu.mCode == "MENU1908" ||
            subMenu.mCode == "MENU1910" ||
            subMenu.mCode == "MENU1911") {
            li.addClass("hide");
        }

        //승인메일을 사용하지 않으면 보낼편진함, 승인검토함, 승인이력함 숨김
        if (mailApprUse == "0" && (subMenu.mCode == "MENU0114" || subMenu.mCode == "MENU0115" || subMenu.mCode == "MENU0116")) {
    		continue;
        }
        
        var a = $("<a></a>");
        a.attr("data-mcode", subMenu.mCode);
        a.attr("data-url", subMenu.url);
        a.attr("href", "#"); //javascript:reURL('"+subMenu.mCode+"'); , '"+subMenu.lCode+"' // "#"+subMenu.mCode+"/"+subMenu.lCode
        
        if (subMenu.urlFlag == true) {
            a.attr("onclick", "onTopMenu('"+subMenu.mCode+"', '"+subMenu.lCode+"');");
        }
        
        if (subMenu.jsText && subMenu.jsText.length > 0) {
            a.attr("onclick", subMenu.jsText);
        }
        
        if (subMenu.subMenuCode.length > 0 && isCategory == false) {
            a.addClass("dropdown-toggle");
        }
        
        var icon = $("<i class='menu-icon fa'></i>");
        if (subMenu.codeLevel == 1) {
            icon.addClass(subMenu.iconFile);
            icon.addClass(subMenu.iconColor);
            icon.css({"float":"left"});
        } else {
            icon.addClass("fa-caret-right");
        }
        a.append(icon);

        var menuName = "";
        switch(lang) {
            case "ko": menuName = subMenu.codeNameKo; break;
            case "en": menuName = subMenu.codeNameEn; break;
            case "ja": menuName = subMenu.codeNameJa; break;
            case "zh": menuName = subMenu.codeNameZh; break;
            default: menuName = subMenu.codeName; break;
        }
        
        if (subMenu.codeLevel == 1) {
            a.append("<span class='menu-text'>"+menuName+"</span>");
        } else {
            a.text(menuName);
        }
        
        if (subMenu.subMenuCode.length > 0 && isCategory == false) {
            a.append("<b class='arrow fa fa-angle-down'></b>");
        }
        
        var b = $("<b class='arrow'></b>");
        
        li.append(a);
        li.append(b);

        var sub = $("<ul class='submenu'></ul>");
        
        if (subMenu.subMenuCode.length > 0 && isCategory == false) {
            sub.append(menuA(subMenu, mCode, lang));
        }
        
        if (subMenu.mCode == 'MENU05') {
            //sub.append(menuA(bbs));
        }
        
        if (sub.find("li").length > 0) {
            li.append(sub);
        }
        
        ul.append(li);
    }
    
    return ul.html();
}



function switchSidebar(mCode) {
    if (mCode == 'MENU90') {
        $("#if_list_div").removeClass("show").addClass("hide"); //.hide();
        $(".main-style").removeClass("hide").addClass("show"); //.show();
        $('#sidebar2').hide();
//        portal();
        $(".sidebar + .main-content").css({"margin-left":"0px"});
    } else { 
        $("#if_list_div").removeClass("hide").addClass("show"); //.show();
        $(".main-style").removeClass("show").addClass("hide"); //.hide();
        $('#sidebar2').show();
        $(".sidebar + .main-content").css({"margin-left":""});
    }
    reURL(mCode);
}

function loadSidebar(mCode, sCode) {
    $.ajax({ type: 'post' ,dataType: 'html' ,async: true
        ,url: '/configuration/sideMenu2.htm'
        ,data: { 'mCode': mCode }
        ,beforeSend: function() {} 
        ,complete: function() {}
        ,success: function(data, status, xhr) {
            if (data.indexOf('id="redirectURL" name="redirectURL" type="hidden"') == -1) { // 로그인 페이지 인지 확인
                $("#sidebar2 > ul").html(data);
                //환경설정 선택시 tabs이동 오류 수정 2018-01-15
                link_element = $('#sidebar').find('a[data-mcode="'+mCode+'"]');
                link_element2 = $('#sidebar2').find('a[data-mcode="'+mCode+'"]');
                link_element2.attr("data-url", link_element.attr("data-url"));
                if (sCode && sCode != 'undefined') onSubMenu(sCode); else onSubMenu(mCode);
            } else {
                location.href = '/login.htm?redirectURL=' + encodeURIComponent(location.pathname + location.hash) ;
            }
        }
        ,error: function(xhr, status, error) {}
    });
}

function onTopMenu(mCode, sCode, elem) {
	var obj = elem || {};
    link_element = $('#sidebar').find('a[data-mcode="'+mCode+'"]');
    if (link_element.length > 0 && link_element.closest('li').find(".submenu").length == 0) {
        var nav = link_element.closest('.nav');
        
        if (nav.length > 0) {
            nav.find('.active').each(function() {
                var $class = 'active';
                if ($(this).hasClass('hover')) $class += ' open';
                
                $(this).removeClass($class);
                $(this).find(' > .submenu').css('display', '');
            });
            
            var active_li = link_element.closest('li').addClass('active').parents('.nav li').addClass('active open');
            nav.closest('.sidebar[data-sidebar-scroll=true]').each(function() {
                var $this = $(this);
                $this.ace_sidebar_scroll('reset');
                $this.ace_sidebar_scroll('scroll_to_active');//first time only
            });
            
            loadSidebar(mCode, sCode);
            switchSidebar(mCode);

            //$("#if_list").attr("src", link_element.attr("data-url"));
            if ($("button[data-target='#sidebar']").attr("aria-expanded") == 'true') {
                $("button[data-target='#sidebar']").click();
            }
        }
    } else {
    	//767px 이상이면 TOP MENU 클릭 시 로케이션 이동. 아니면 메뉴펼침. || 2017-07-04 모바일버전 오류수정
        if (!window.matchMedia('(max-width: 767px)').matches
        		|| $(obj).hasClass("actionMore") || $(obj).closest("div").hasClass("infobox")) {
            var link_element = $('#sidebar').find('a[data-mcode="'+sCode+'"]');
            if (link_element.length > 0) { // TOP MENU 에서 하위연결의 메뉴가 있다면
//                location.hash = link_element.attr("href");
                link_element.click();
            } else { // TOP MENU 에서 하위연결의 메뉴가 없다면
                link_element = $('#sidebar').find('a[data-mcode="'+mCode+'"]');
                
                var nav = link_element.closest('.nav');
                
                if (nav.length > 0) {
                    nav.find('.active').each(function() {
                        var $class = 'active';
                        if ($(this).hasClass('hover')) $class += ' open';
                        
                        $(this).removeClass($class);
                        $(this).find(' > .submenu').css('display', '');
                    });
                    
                    var active_li = link_element.closest('li').addClass('active').parents('.nav li').addClass('active open');
                    nav.closest('.sidebar[data-sidebar-scroll=true]').each(function() {
                        var $this = $(this);
                        $this.ace_sidebar_scroll('reset');
                        $this.ace_sidebar_scroll('scroll_to_active');//first time only
                    });

                    loadSidebar(mCode, sCode);
                    switchSidebar(mCode);
                    
                    
                    //location.hash = link_element.attr("href");
                    $("#if_list").attr("src", link_element.attr("data-url"));
                    
                    if ($("button[data-target='#sidebar']").attr("aria-expanded") == 'true') {
                        $("button[data-target='#sidebar']").click();
                    }
                }
            }
        }
    }
}

//전자메일 내편지함 tree 새로고침
function fnMailboxReload(){
	myboxMail();
	setTimeout(function(){
		$("#mybox_tree_area").dynatree("getTree").reload();
	}, 100);
}

var projModuleId = ""; //마지막으로 선택한 프로젝트 ID
var projModuleNm = ""; //마지막으로 선택한 프로젝트 명

function onProjModuleMenu() {
    $(".projModuleMenu").removeClass("hide"); // 프로젝트 ID가 필수인 메뉴를 활성화 한다
    $(".projModuleIntro").removeClass("hide");	// 프로젝트 소개 메뉴를 활성화 한다
    
    var url = $("#proj_tree_area").attr("data-menu-url");
    jQuery(function($) {dmsSmenu((url+projModuleId).replace("_xml", "_json"),'proj_tree_area');}); // 프로젝트 커뮤니티 메뉴를 가져온다

	//프로젝트 명
	var introTitle = "<i class=\"menu-icon fa fa-info-circle info\"></i>";
	introTitle += "<span class=\"menu-text\">";
	introTitle += projModuleNm;
	introTitle += "</span>";
	
	if (projModuleNm != "") {
		$(".projModuleIntro").find("a").css({
		    "text-overflow":"ellipsis",
		    "white-space":"nowrap",
		    "word-wrap":"normal",
		    "width":"100%",
		    "overflow":"hidden"
		});
		$(".projModuleIntro").find("a").html(introTitle);
		$(".projModuleIntro").find("a").attr("title", projModuleNm)
	}
    
	$(".projModuleMenu").css("padding-left", "10px");
}

var clubModuleId = ""; //마지막으로 선택한 커뮤니티 ID
var clubTitle = ""; //마지막으로 선택한 커뮤니티 ID

//커뮤니티 sub메뉴 활성화, 게시판 reload
function onClubModuleSub() {
	$(".clubModuleSub").removeClass("hide");		//일정,게시판,설문 등 커뮤니티 메뉴를 활성화
	$(".clubModuleIntro").removeClass("hide");	//소개 메뉴를 활성화
	onClubModuleAdmin();	//관리자 확인
	
	//게시판
	$(function($) {
		var elemId = "clubBbsCategory";
		var url = ($("#"+elemId).attr("data-menu-url")+clubModuleId).replace("_xml", "_json");
		clubBbsMenu(url, elemId);
	});
	
	$(".clubModuleSub").css("padding-left", "10px");
	$(".clubModuleAdmin").css("padding-left", "10px");
}

//커뮤니티 관리메뉴 활성화
function onClubModuleAdmin() {
	$.ajax({
        url: "/club/checkAdminJson.htm",
        type: 'POST',
        dataType: 'json',
        data:{"clubId": clubModuleId},
        success: function(data) {
        	if(data.isAdmin){	//관리자
        		$(".clubModuleAdmin").removeClass("hide");	
        	}else{	//일반사용자
        		$(".clubModuleAdmin").addClass("hide");	        		
        	}
        }
    });
}

//커뮤니티 게시판 
function clubBbsMenu(sUrl, elemId) {
	var startingPoint = $("#"+elemId);
	$(".syncMenusClubBbs").remove();
	
    $.post(sUrl, function(datas) {
        if (datas && datas.length > 0) {
        	for(var i = 0; i < datas.length; i++) {
        		var data = datas[i];
        		var str = "<li class=\"clubModuleSub syncMenusClubBbs\" style=\"padding-left: 10px;\">"
        				+ "<a data-mcode=\""+data.mCode+"\" data-url=\""+data.url+"\" href=\"#\" onclick=\"onSubMenu('"+data.mCode+"');\">"
        				+ "<i class=\"menu-icon fa fa-comments-o\"></i>"
        				+ "<span class=\"menu-text\">"+data.title+"</span>"
        				+ "</a>"
        				+ "<b class=\"arrow\"></b>"
        				+ "</li>";
        		startingPoint.before(str);
        	}
        }
    }, "json");
    
}

//커뮤니티 sub메뉴 비활성화
function onClubModuleMain() {
	$(".clubModuleSub").addClass("hide");		//일정,게시판,설문 등 커뮤니티 메뉴를 비활성화
	$(".clubModuleAdmin").addClass("hide");	//커뮤니티 > 관리 메뉴를 비활성화
	$(".clubModuleIntro").addClass("hide");	//커뮤니티 > 소개 메뉴를 비활성화
}

//나의 커뮤니티 선택변경
function fnClubChange(clubId, clubName){
	
	clubModuleId = clubId
	clubTitle = clubName
	
	onClubModuleSub();
	onSubMenu('MENU1910');	//소개 페이지 이동 

	//커뮤니티 명 변경
	var introTitle = "<i class=\"menu-icon fa fa-info-circle info\"></i>";
	introTitle+="<span class=\"menu-text\">";
	introTitle+=clubTitle;
	introTitle+="</span>";
	$(".clubModuleIntro").find("a").html(introTitle);
	$(".clubModuleIntro").find("a");
}

//커뮤니티 개설 - 적용여부 확인
function fnNewClub(){
	var url = "/club/form.htm?clubId=" ;
	OpenWindow(url, "", "960" , "600");
}

function onSubMenu(mCode) {
    //서버메뉴에 선택메뉴 활성화
    link_element = $('#sidebar2').find('a[data-mcode="'+mCode+'"]');
    if (link_element.length > 0 && link_element.closest('li').find(".submenu").length == 0) {
        var nav = link_element.closest('.nav');
        if (nav.length > 0) {
            nav.find('.active').each(function() {
                var $class = 'active';
                if ($(this).hasClass('open')) $class += ' open';
                
                $(this).removeClass($class);
                $(this).find('.submenu').css('display', '');
            });
            
            var active_li = link_element.closest('li').addClass('active').parents('.nav li').addClass('active open');
            nav.closest('.sidebar[data-sidebar-scroll=true]').each(function() {
                var $this = $(this);
                $this.ace_sidebar_scroll('reset');
                $this.ace_sidebar_scroll('scroll_to_active');//first time only
            });

            //프로젝트에서만 사용하는 전달 값
            var isProj = mCode.indexOf("MENU16") == 0;
            var projParam = "";
            if (isProj) {
                if (link_element.attr("data-url").indexOf("?") == -1) {
                    projParam = "?";
                } else {
                    projParam = "&";
                }
                projParam += "workType=2&moduleId=" + projModuleId;
            }
            //커뮤니티 게시판은 submenu.jsp에서 처리됨
            //커뮤니티 일정 에서만 사용하는 전달 값
            var isClub = mCode.indexOf("MENU1907") == 0;
            if (isClub) {
            	if (link_element.attr("data-url").indexOf("?") == -1) {
            		projParam = "?";
            	} else {
            		projParam = "&";
            	}
            	projParam += "workType=3&scheId=" + clubModuleId;
            }
            //커뮤니티 설문 에서만 사용하는 전달 값
            isClub = mCode.indexOf("MENU1908") == 0;
            if (isClub) {
            	if (link_element.attr("data-url").indexOf("?") == -1) {
            		projParam = "?";
            	} else {
            		projParam = "&";
            	}
            	projParam += "workType=3&pollId=" + clubModuleId;
            }
            //커뮤니티 관리 에서만 사용하는 전달 값
            isClub = mCode.indexOf("MENU1905") == 0;
            if (isClub) {	
            	if (link_element.attr("data-url").indexOf("?") == -1) {
            		projParam = "?";
            	} else {
            		projParam = "&";
            	}
            	if(mCode.indexOf("MENU190502") == 0){ //커뮤니티 게시판관리 에서만 사용하는 전달 값
            		projParam += "workType=3&moduleId=" + clubModuleId;
            	}else{
            		projParam += "workType=3&clubId=" + clubModuleId;
            	}
            	
            }
            
            //커뮤니티 소개 에서만 사용하는 전달 값
            isClub = mCode.indexOf("MENU1910") == 0;
            if (isClub) {
            	if (link_element.attr("data-url").indexOf("?") == -1) {
            		projParam = "?";
            	} else {
            		projParam = "&";
            	}
            	projParam += "workType=3&clubId=" + clubModuleId;
            }

            $("#if_list").attr("src", link_element.attr("data-url")+projParam);
            //if ($("#if_list").attr("src") != link_element.attr("data-url")+projParam) {
            //}
            
            if ($("button[data-target='#sidebar']").attr("aria-expanded") == 'true') {
                $("button[data-target='#sidebar']").click();
            }
        }

        reURL(mCode);
        
        //탑메뉴에 선택메뉴 활성화
        mCode = active_li.find('a').first().attr('data-mcode');
        link_element = $('#sidebar').find('a[data-mcode="'+mCode+'"]');
        if (link_element.length > 0 && link_element.closest('li').find(".submenu").length == 0) {
            var nav = link_element.closest('.nav');
            if (nav.length > 0) {
                nav.find('.active').each(function() {
                    var $class = 'active';
                    if ($(this).hasClass('hover')) $class += ' open';
                    
                    $(this).removeClass($class);
                    $(this).find(' > .submenu').css('display', '');
                });
                
                var active_li = link_element.closest('li').addClass('active').parents('.nav li').addClass('active open');
                nav.closest('.sidebar[data-sidebar-scroll=true]').each(function() {
                    var $this = $(this);
                    $this.ace_sidebar_scroll('reset');
                    $this.ace_sidebar_scroll('scroll_to_active');//first time only
                });
            }
        }
    }
}

//전자메일 편지함 카운트
function resetLeftCount(mailboxID, selectCount, readCount, cmd, moveboxID, unReadCheck){
    
    var listCount = $("#lCount"+mailboxID).text();
    var noReadCount = $("#lCount0").text();
    var toCount = $("#lCount1").text();
    var dListCount = $("#lCount4").text();
//    console.log("cmd="+cmd+", unRead='"+unReadCheck+"', id='"+mailboxID+"', read= '"+readCount+"'");
    
    switch(cmd){
        case 'reading' :
            if(mailboxID != 3 && mailboxID != 4 && mailboxID != 6 && mailboxID != 7){
                $("#lCount0").html((Number(noReadCount))-(Number(readCount)));
                $("#lCount"+mailboxID).html((Number(listCount))-(Number(readCount)));
            }
            break;
        
        case 'deleteList' : //삭제(지운편지함으로 이동)
            if(unReadCheck != 1){
                if(mailboxID == 2 || mailboxID == 3 || mailboxID == 6 || mailboxID == 7){
                    $("#lCount"+mailboxID).html((Number(listCount))-(Number(selectCount)));
                    $("#lCount4").html((Number(dListCount))+Number((selectCount)));
                }else if(mailboxID == 4){
                    $("#lCount4").html((Number(dListCount))-Number((selectCount)));
                }else{
                    $("#lCount"+mailboxID).html((Number(listCount))-(Number(readCount)));
                    $("#lCount0").html((Number(noReadCount))-(Number(readCount)));
                    $("#lCount4").html((Number(dListCount))+Number((selectCount)));
                }
            }else{
//                $("#lCount0").html((Number(noReadCount))-(Number(readCount)));	//읽지않은 편지메뉴 사용안함
                $("#lCount1").html((Number(listCount))-(Number(readCount)));
                $("#lCount4").html((Number(dListCount))+Number((selectCount)));
            }
            break;
            
        case 'deleteAll' :  
            if(mailboxID == 2 || mailboxID == 3 || mailboxID == 6 || mailboxID == 7){
                $("#lCount"+mailboxID).html((Number(listCount))-(Number(selectCount)));
            }else{
                $("#lCount0").html((Number(noReadCount))-(Number(readCount)));
                $("#lCount"+mailboxID).html((Number(listCount))-(Number(readCount)));
            }
            break;                  
                        
        case 'moveList' :   //편지함 이동
            var beforeCount =  $("#lCount"+moveboxID).text();
            if(mailboxID == 4){ //지운편지함인 경우
                $("#lCount4").html(Number(dListCount) - Number(selectCount));
                if(moveboxID !=2 ){
                    $("#lCount0").html(Number(noReadCount) + Number(readCount));
                    $("#lCount"+moveboxID).html(Number(beforeCount) + Number(readCount));
                }
            } else{                     //지운편지함 아닌경우 
                if(moveboxID == 4){
                    //읽지않은 편지함에서 이동및 삭제했을때 카운트 하지 않음
                    if(unReadCheck != 1){
                        $("#lCount"+mailboxID).html((Number(listCount))-(Number(readCount)));
                    }
                    if(mailboxID != 2){
                        $("#lCount0").html((Number(noReadCount))-(Number(readCount)));
                        $("#lCount4").html((Number(dListCount))+Number((selectCount)));
                    }else{
                        $("#lCount4").html((Number(dListCount))+Number((selectCount)));
                    }
                }else{
                    if(unReadCheck != 1){
                        $("#lCount"+mailboxID).html(Number(listCount) - Number(readCount));
                    }
                    $("#lCount"+moveboxID).html((Number(beforeCount))+(Number(readCount)));
                }
            }
            break;
            
        case 'clearTrash' :
            $("#lCount4").html("");
            break;
            
        case 'readDelete' : //read.jsp 삭제
            if(mailboxID == 4){
                $("#lCount4").html((Number(dListCount))-(Number(selectCount)));
            }else{
                $("#lCount4").html((Number(dListCount))+(Number(selectCount)));
            }
            break;
            
        case 'readMove' :   //read.jsp 이동
            var beforeCount =  $("#lCount"+moveboxID).text();
            if(moveboxID == 4){
                $("#lCount4").html((Number(beforeCount))+(Number(selectCount)));
            }else{
                $("#lCount"+moveboxID).html((Number(beforeCount))+(Number(readCount)));
            }
            if(mailboxID == 4){
                $("#lCount4").html(Number(listCount) - Number(selectCount));
            }else{
                $("#lCount"+mailboxID).html(Number(listCount) - Number(readCount));
            }
            break;
            
        case 'read' :   //읽음
            if(unReadCheck != 1){
                $("#lCount"+mailboxID).html(Number(listCount) - Number(readCount));
                $("#lCount0").html(Number(noReadCount) - Number(readCount));
            }else{
                $("#lCount0").html(Number(noReadCount) - Number(readCount));
            }
            break;
            
        case 'unread' : //안읽음
            if(mailboxID != 2 && mailboxID != 3 && mailboxID != 4 && mailboxID != 6 && mailboxID !=7){
                if(unReadCheck != 1){
                    $("#lCount"+mailboxID).html(Number(listCount) + Number(readCount));
                    $("#lCount0").html(Number(noReadCount) + Number(readCount));
                }else{
                    $("#lCount0").html(Number(noReadCount) + Number(readCount));
                }
            }
            break;
            
        case 'draft' :
            $("#lCount"+mailboxID).html(Number(listCount) + Number(selectCount));
            break;
            
        case 'spamDelete' : 
            $("#lCount7").html(Number(listCount) - Number(selectCount));
            $("#lCount0").html(Number(noReadCount) + Number(readCount));
            $("#lCount1").html(Number(toCount) + Number(readCount));
            break;
            
        case 'spam' :
            var afterCount = $("#lCount7").text();
            if(mailboxID != 7){
                if(unReadCheck == 1){
                    $("#lCount0").html(Number(noReadCount) - Number(readCount));
                }else{
                    $("#lCount0").html(Number(noReadCount) - Number(readCount));
                    $("#lCount"+mailboxID).html(Number(listCount) - Number(readCount));
                }
                $("#lCount7").html(Number(afterCount) + Number(selectCount));
            }
            break;
        
        case 'approval' : /* 승인검토함에서 사용 */
            var afterCount = $("#lCount15").text();
        	$("#lCount15").html(Number(afterCount) - Number(selectCount)); //검토한 수만큼 뺄샘
        	break;
        
        case 'noti' :
        	var afterCount = $("#lCount21").text();	//읽지않은 쪽지의 수
        	if(selectCount == 0){		//삭제가 아닌경우 (단순조회)
    			$("#lCount20").html(Number(afterCount) - readCount);
    			$("#lCount21").html(Number(afterCount) - readCount);
    		}else{	//삭제(다중가능)
    			$("#lCount20").html(Number(afterCount) - Number(selectCount));
    			$("#lCount21").html(Number(afterCount) - Number(selectCount));
        	}
        	break;
        
    }
    
    $(".num").each(function(i){
        if($(this).text() == 0 || $(this).text() < 0){
            $(this).html("");
        }   
    });
    
}

function inboxMail() {
    
    $.post("/mail/mail_unread_cnt_json.htm", function(data) {
        var result = eval("("+$.trim(data)+")");
        $("#lCount1").html(result.mailUnRead);
        $("#lCount0").html(result.mailboxUnreadSummary);
        $("#lCount7").html(result.iSpamMailCnt);
        $("#lCount3").html(result.iDraftMailCnt);
        $("#lCount6").html(result.iReservedMailCnt);
        $("#lCount4").html(result.iTrashMailCnt);
        $("#lCount15").html(result.lApprovalMailCnt);
        $("#lCount20").html(result.unReadNotiCnt);
        $("#lCount21").html(result.unReadNotiCnt);
        
        $("#mailQuota").html(result.mailQuota + " MB");
        
        var mailUsage = result.mailUsage + " MB";
        if (mailUsage.indexOf("0.") > -1) {
            mailUsage = Math.ceil(Number(result.mailUsage) * 1024) + " KB"
        }
        $("#mailUsage").html(mailUsage);
        
        var mailPercent = result.mailPercent;
        if (mailPercent == "") mailPercent = "0";
        $("#mailPercent").html(mailPercent + " %");
        $("#mailPercentWidth").css("width", mailPercent + "%");
    });
    
    $.post("/mail/mailbox_json.htm?boxid=1&dbpath=mail&opentype=TOP", function(data) {
        if (data && data.length > 0) {
            $("#inbox_tree_area").dynatree({
                children: data,
                generateIds: true,
                idPrefix: "P",
                onClick: function(node, e) {
                    var targetType = node.getEventTargetType(e);
                    if (targetType) {
                        if (node.data.key == -10) {
                            document.getElementById("if_list").src = "/mail/list.htm?unread=1&topbox=1";
                        } else {
                            document.getElementById("if_list").src = "/mail/list.htm?box="+node.data.key+"&topbox=1";
                        }
                    } else return false;
                },
                onLazyRead: function(node) {
                    node.appendAjax({
                        url: "/mail/mailbox_json.htm",
                        data: { boxid: node.data.key, dbpath: node.data.dbpath, opentype: node.data.opentype },
                        success: function(node) {
                            node.visit(function(n) {
                                n.expand(true);
                            })
                        }
                    });
                },
                onCustomRender: function(dtnode) {
                    returnHtmls = "<a href='#' class='dynatree-title'> "
                                + dtnode.data.name 
                                + "</a><span class='num badge badge-primary' style='margin-left: 6px; colors: #2B7DBC; font-weight: bold;' id='lCount"+dtnode.data.key+"'>";
                    
                    if (dtnode.data.count > 0) {
                        returnHtmls += dtnode.data.count;
                    }
                    
                    returnHtmls +="</span>";
                    
                    return returnHtmls;
                }
            });

            for(var i = 0, len = data.length; i < len; i++) {
            	try{
            		$("#inbox_tree_area").dynatree("getTree").getNodeByKey(data[i].key).toggleExpand();
            	}catch(e){}
            }
            
        } else {
            $("#inbox_tree_area").hide();
        }
    }, "json");
}

function outboxMail() {
    $.post("/mail/mailbox_json.htm?boxid=2&dbpath=mail&opentype=TOP", function(data) {
        if (data && data.length > 0) {
            $("#outbox_tree_area").dynatree({
                children: data,
                generateIds: true,
                idPrefix: "P",
                onClick: function(node, e) {
                    var targetType = node.getEventTargetType(e);
                    if (targetType) {
                        if (node.data.key == -11) {
                            document.getElementById("if_list").src = "/mail/mail_receiptlist.htm?box=2&topbox=2";
                        } else {
                            document.getElementById("if_list").src = "/mail/list.htm?box="+node.data.key+"&topbox=2";
                        }
                    } else return false;
                },
                onLazyRead: function(node) {
                    node.appendAjax({
                        url: "/mail/mailbox_json.htm",
                        data: { boxid: node.data.key, dbpath: node.data.dbpath, opentype: node.data.opentype },
                        success: function(node) {
                            node.visit(function(n) {
                                n.expand(true);
                            })
                        }
                    });
                }
            });

            for(var i = 0, len = data.length; i < len; i++) {
                $("#outbox_tree_area").dynatree("getTree").getNodeByKey(data[i].key).toggleExpand();
            }
        } else {
            $("#outbox_tree_area").hide();
        }
    }, "json");
}

function getQueryString() {
    var key = false, res = {}, itm = null;
    // get the query string without the ?
    var qs = location.search.substring(1);
    // check for the key as an argument
    if (arguments.length > 0 && arguments[0].length > 1)
      key = arguments[0];
    // make a regex pattern to grab key/value
    var pattern = /([^&=]+)=([^&]*)/g;
    // loop the items in the query string, either
    // find a match to the argument, or build an object
    // with key/value pairs
    while (itm = pattern.exec(qs)) {
      if (key !== false && decodeURIComponent(itm[1]) === key)
        return decodeURIComponent(itm[2]);
      else if (key === false)
        res[decodeURIComponent(itm[1])] = decodeURIComponent(itm[2]);
    }
    return key === false ? res : null;
}

function myboxMail() {
	var tpCode = $("#mybox_tree_area").attr("data-tpcode");
	var pCode = $("#mybox_tree_area").attr("data-pcode");
	var mCode = getQueryString("mCode"); //new URL(location.href).searchParams.get("mCode");
	
	if (window[tpCode] == undefined) window[tpCode] = {};
	if (tpCode != undefined && pCode == mCode) {
		window[tpCode].isAutoClick = window[tpCode].isAutoClick || true;
	} else {
		window[tpCode].isAutoClick = false;
	}
    
    $.post("/mail/mail_unread_cnt_json.htm", function(data) {
        var result = eval("("+$.trim(data)+")");
        $("#lCount1").html(result.mailUnRead);
        $("#lCount0").html(result.mailboxUnreadSummary);
        $("#lCount7").html(result.iSpamMailCnt);
        $("#lCount3").html(result.iDraftMailCnt);
        $("#lCount6").html(result.iReservedMailCnt);
        $("#lCount4").html(result.iTrashMailCnt);
        $("#lCount15").html(result.lApprovalMailCnt);
        $("#lCount20").html(result.unReadNotiCnt);
        $("#lCount21").html(result.unReadNotiCnt);
        $("#mailQuota").html(result.mailQuota + " MB");
        
        var mailUsage = result.mailUsage + " MB";
        if (mailUsage.indexOf("0.") > -1) {
            mailUsage = Math.ceil(Number(result.mailUsage) * 1024) + " KB"
        }
        $("#mailUsage").html(mailUsage);
        
        var mailPercent = result.mailPercent;
        if (mailPercent == "") mailPercent = "0";
        $("#mailPercent").html(mailPercent + " %");
        $("#mailPercentWidth").css("width", mailPercent + "%");
    });
    
    $.post("/mail/mailbox_json.htm?boxid=10&dbpath=mail&opentype=TOP", function(data) {
        if (data && data.length > 0) {
            $("#mybox_tree_area").dynatree({
                children: data,
                generateIds: true,
                idPrefix: "P",
                onClick: function(node, e) {
                    var targetType = node.getEventTargetType(e);
                    if (targetType) {
                        if (node.data.key == -10) {
                            document.getElementById("if_list").src = "/mail/list.htm?unread=1&topbox=1";
                        } else {
                            document.getElementById("if_list").src = "/mail/list.htm?box="+node.data.key+"&topbox=1";
                        }
                    } else return false;
                },
                onFocus: function(node) {
                	if (window[tpCode].isAutoClick) {
                        if (node.data.key == -10) {
                            document.getElementById("if_list").src = "/mail/list.htm?unread=1&topbox=1";
                        } else {
                            document.getElementById("if_list").src = "/mail/list.htm?box="+node.data.key+"&topbox=1";
                        }
            			node.toggleSelect();
            			node.activate();
                		window[tpCode].isAutoClick = false;
                	}
                },
                onLazyRead: function(node) {
                    node.appendAjax({
                        url: "/mail/mailbox_json.htm",
                        data: { boxid: node.data.key, dbpath: node.data.dbpath, opentype: node.data.opentype },
                        success: function(node) {
                            node.visit(function(n) {
                                n.expand(true);
                            })
                        }
                    });
                },
                onCustomRender: function(dtnode) {
                    returnHtmls = "<a href='#' class='dynatree-title'> "
                                + dtnode.data.name 
                                + "</a><span class='num badge badge-primary' style='margin-left: 6px; colors: #2B7DBC; font-weight: bold;' id='lCount"+dtnode.data.key+"'>";
                    
                    if (dtnode.data.count > 0) {
                        returnHtmls += dtnode.data.count;
                    }
                    
                    returnHtmls +="</span>";
                    
                    return returnHtmls;
                }
            });

            for(var i = 0, len = data.length; i < len; i++) {
            	try{
            		$("#mybox_tree_area").dynatree("getTree").getNodeByKey(data[i].key).toggleExpand();
            	}catch(e){}
            }
            
        } else {
            $("#mybox_tree_area").hide();
        }
    }, "json");
}

/**
 * 서브메뉴에서 사용하는 트리메뉴 표시
 * @param sUrl 트리메뉴 JSON 주소
 * @param sElemId 트리메뉴영역 ID
 */
function subDynaTreeMenu(sUrl, sElemId) {
	var tpCode = $("#"+sElemId).attr("data-tpcode");
	var pCode = $("#"+sElemId).attr("data-pcode");
	var mCode = getQueryString("mCode"); //new URL(location.href).searchParams.get("mCode");

	if (window[tpCode] == undefined) window[tpCode] = {};
	if (tpCode != undefined && pCode == mCode) {
		window[tpCode].isAutoClick = window[tpCode].isAutoClick || true;
	} else {
		window[tpCode].isAutoClick = false;
	}
	
	$("#"+sElemId).dynatree({
		persist: true,
		initAjax: {
			url: sUrl, addActiveKey: true, addFocusedKey: true, addExpandedKeyList: true,
			data: { activeKey: null, focusedKey: null, expandedKeyList: null, selectedKeyList: null }
		},
		onPostInit: function(isReloading, isError) {
			//var submenu = $("#"+sElemId).closest(".submenu");
			//if (this.getRoot().getChildren() == undefined) { //데이터가 없는 경우
			//	$("#"+sElemId).hide();
			//} else {
			//	$("#"+sElemId).show();
			//}
	        this.reactivate();
	    },
	    onClick: function(node, e) {
	    	if (node.data.isFolder == true){
            	if (node.isExpanded()) {
            		node.timer = setTimeout(function() { node.expand(false); }, 200);
            	} else {
            		node.timer = setTimeout(function() { node.expand(true); }, 200);
            	}
            }
	    	
            var targetType = node.getEventTargetType(e);
            if (targetType) {
				subDynaTreeMenuActivate(this.options.initAjax.url, node.data.key);
            	node.toggleSelect();
    			node.activate();
            } else return false;
        },
        onFocus: function(node) {
        	if (window[tpCode].isAutoClick) {
    			subDynaTreeMenuActivate(this.options.initAjax.url, node.data.key);
    			node.toggleSelect();
    			node.activate();
        		window[tpCode].isAutoClick = false;
        	}
        }
    });
}
/**
 * 트리메뉴 선택 시 처리
 * @param sUrl 트리메뉴 JSON 주소
 * @param sKey 트리메뉴 ID
 */
function subDynaTreeMenuActivate(sUrl, sKey) {
	var param = getStrUrlParam(sUrl.toUpperCase());
	var uri = param["URI"];
	var url = "";

	if (uri.indexOf("/DMS/") > -1) { //문서관리
		var cType = param["CTYPE"];
		if (cType == "P") { //개인문서함
			url = "/dms/list.htm?menuid=MENU0306&catId="+sKey+"&cateType="+cType;
		} else if (cType == "S") { //공용문서함
			url = "/dms/list.htm?menuid=MENU0303&catId="+sKey+"&cateType="+cType;
		}
	}

	if (url != "") $("#if_list").attr("src", url);
}

function dmsSmenu(sUrl, elemId) {
    $.post(sUrl, function(data) {
        if (data && data.length > 0) {
            $("#"+elemId).dynatree({
                children: data,
                onClick: function(node, e) {
                	if (node.timer) clearTimeout(node.timer);
                    var targetType = node.getEventTargetType(e); // 클릭한 노드영역
                    if (targetType) {
                    	node.toggleSelect();
                        if ("" != node.data.url) {
                            document.getElementById("if_list").src = node.data.url;
                        }
        	    		if (node.data.isFolder == true){
                        	if (node.isExpanded()) {
                        		node.timer = setTimeout(function() { node.expand(false); }, 200);
                        	} else {
                        		node.timer = setTimeout(function() { node.expand(true); }, 200);
                        	}
                        }
                    } else return false;
                },
                onLazyRead: function(node) {
                    node.appendAjax({
                        url: sUrl,
                        data: { pCode: node.data.key },
                        success: function(node) {
                            node.visit(function(n) {
                                //n.expand(true);
                            })
                        }
                    });
                }
            });
            $("#"+elemId).dynatree("getTree").reload();	//새로고침 2017-08-24 대현 (커뮤니티 변경시 변경)
        } else {
            $("#"+elemId).hide();
        }
    }, "json");
    
}

function webhardSmenu(sUrl, elemId) {
	$.post(sUrl, function(data) {
		if (data && data.length > 0) {
			$("#"+elemId).dynatree({
				children: data,
				onClick: function(node, e) {
					if (node.timer) clearTimeout(node.timer);
					var targetType = node.getEventTargetType(e); // 클릭한 노드영역
					if (targetType) {
						node.toggleSelect();
						if ("" != node.data.url) {
							document.getElementById("if_list").src = node.data.url;
						}
						
						if(elemId != "swebhard_tree_area"){	//공유받은폴더 열지않음
							
							if (node.data.isFolder == true){
								if (node.isExpanded()) {
									node.timer = setTimeout(function() { node.expand(false); }, 200);
								} else {
									node.timer = setTimeout(function() { node.expand(true); }, 200);
								}
							}
						}else{
							node.data.isLazy = false;	//하위폴더 열지않음
							
						}
					} else return false;
				},
				onLazyRead: function(node) {
					node.appendAjax({
						url: sUrl,
						data: { pCode: node.data.key },
						success: function(node) {
							node.visit(function(n) {
								//n.expand(true);
							})
						}
					});
				}
			});
			$("#"+elemId).dynatree("getTree").reload();
		} else {
			$("#"+elemId).hide();
		}
	}, "json");
	
}

//주소록분류 트리메뉴
function addressSmenu(sUrl, elemId) {
    $.post(sUrl, function(data) {
        if (data && data.length > 0) {
            $("#"+elemId).dynatree({
                children: data,
                onClick: function(node, e) {
                	if (node.timer) clearTimeout(node.timer);
                    var targetType = node.getEventTargetType(e); // 클릭한 노드영역
                    if (targetType) {
                    	node.toggleSelect();
                        if ("" != node.data.url) {
                            document.getElementById("if_list").src = node.data.url;
                        }
        	    		if (node.data.isFolder == true){
                        	if (node.isExpanded()) {
                        		node.timer = setTimeout(function() { node.expand(false); }, 200);
                        	} else {
                        		node.timer = setTimeout(function() { node.expand(true); }, 200);
                        	}
                        }
                    } else return false;
                },
                onLazyRead: function(node) {
                	var datas = {};
                	datas.pCode = node.data.pCode;
                	if (node.data.pCode != node.data.key) {
                		datas.pacid = node.data.key;
                	}
                    node.appendAjax({
                        url: sUrl,
                        data: datas,
                        success: function(node) {
                            node.visit(function(n) {
                                //n.expand(true);
                            })
                        }
                    });
                }
            });
            $("#"+elemId).dynatree("getTree").reload();	//새로고침 2017-08-24 대현 (커뮤니티 변경시 변경)
        } else {
            $("#"+elemId).hide();
        }
    }, "json");
}

//profile 또는 settings 선택시 환경설정의 기본 tab를 지정한다.
function fnSelfEdit(type){
    $(".nav-list").find("li").find("a").each(function(idx, value){
        if($(this).attr("data-mcode") == "MENU0801"){
            $(this).attr("data-url", "/configuration/self_edit.htm?position="+type);
            $(this).trigger("click");
        }
    });
}


function setWidgetCount(apprType) {
    var u_Str = "";
    switch(apprType) {
        case 5: //전자메일 읽지 않은 수
            url_Str = '/mail/widgetCount.htm';
            break;
        case 6: //사내쪽지 읽지 않은수
            url_Str = '/notification/WidgetCount.htm';
            break;
        default: //전자결재 관련 카운터
            url_Str = '/approval/apprWidgetCount.htm?apprType='+apprType;
            break;
    }
    
    $.ajax({
        url: url_Str,
        type: 'POST',
        dataType: 'text',
        success: function(data, text, request) {
            var objSpan = document.getElementById("appr_idx"+apprType);
            var cnt = parseInt($.trim(data));
            if (isNaN(cnt)) cnt = 0;
            $(objSpan).html( cnt );
        }
    });
}



/* main */


function sessionCheck(){
    $.ajax({
        url: '/test.jsp',
        cache: false,
        success: function(str) {
        }
    });
}

// 쪽지 체크.
function noteCheckDate() {
    var oldDate = $.cookie('nekNote_Date') || "";
    
	$.ajax({
        url: '/notification/note_check_date_last.htm',
        cache: false,
        success: function(str) {
            var data = eval("("+$.trim(str)+")");
            var newDate = data.date;
            
            if (oldDate == null || oldDate == "") {                                        // 최초 데이터 이면, 
                $.cookie('nekNote_Date', newDate, { path: '/' });       // 쿠키에 일시를 저장.  
            } else if (newDate > oldDate) {                             // 이전 데이터 일시와 비교하여 새로운 일시 이면, 
                $.cookie('nekNote_Date', newDate, { path: '/' });       // 쿠키에 일시를 저장하고,
                
                var noteMessage = '<a href="#" style="font-family:맑은 고딕; font-size:10pt; font-weight:bold;" onclick="newNoteOpen(\''+data.noteid+'\')"> '
				                + '    <img style="position:relative; top:-1px;" src="/common/images/icon-mail-temp.png" align="absmiddle"> '
				                + '    새로운 쪽지 수신 알림 - ' + data.subject + ' - ' + data.sender + ' [' + data.created + ']'
				                + '</a> '
                
                $.gritter.add({
                    title: noteMessage,
                    text: '',
                    sticky: false,
                    time: 10000,
                    class_name: 'gritter-success gritter-light',
                    position: 'bottom-left'
                });
            }
        }
	});
}

// 쪽지 팝업 조회. 
function newNoteOpen(noteid) {
	var url = "/notification/read.htm?noteId=" + noteid;
    OpenWindow(url, noteid, "900" , "620");
}

// 메일 체크. 
function mailCheckDate() {
    var oldDate = $.cookie('nekMail_Date') || "";
    
    $.ajax({
        url: '/mail/mail_check_date_last.htm',
        cache: false,
        success: function(str) {
            var data = eval("("+$.trim(str)+")");
            var newDate = data.date;
            
            if (oldDate == null || oldDate == "") {                                        // 최초 데이터 이면, 
                $.cookie('nekMail_Date', newDate, { path: '/' });       // 쿠키에 일시를 저장.  
            } else if (newDate > oldDate) {                             // 이전 데이터 일시와 비교하여 새로운 일시 이면, 
                $.cookie('nekMail_Date', newDate, { path: '/' });       // 쿠키에 일시를 저장하고,
                
                //메일목록 새로고침 2018-06-07
                if( ($("#if_list").attr("src").indexOf("mail/list.htm") > -1 || $("#if_list").attr("src").indexOf("mail/list.htm?box=1&topbox=1"))
                		&& window.frames["if_list"].document.getElementById("refresh_grid-table") != null){
                	
            		window.frames["if_list"].document.getElementById("refresh_grid-table").click();
            		var boxId = data.mailBoxId;
            		if(boxId==null) boxId = 1;
            		resetLeftCount(boxId, 0, 1, "unread", 0, 0);
            	}
                getMessagePopup(data);                                  // 메시지 팝업을 호출한다. 
            }
        }
    });
    
}

// 메시지 팝업을 실행. 
function getMessagePopup(data) {
    var msg = data.subject+' - '+data.sender+' ['+data.created+']';
//    var noty = generate('bottom', 'success', newMailMessageFormatter(msg, data.message_name));
//    setTimeout(function() { $.noty.close(noty.options.id); }, 10000);   // 10초 뒤에 사라지도록 설정 

    $.gritter.add({
        // (string | mandatory) the heading of the notification
        title: newMailMessageFormatter(msg, data.message_name),
        // (string | mandatory) the text inside the notification
        text: '',
        // (bool | optional) if you want it to fade out on its own or just sit there
        sticky: false,
        // (int | optional) the time you want it to be alive for before fading out (milliseconds)
        time: 10000,
        // (string | optional) the class name you want to apply directly to the notification for custom styling
        class_name: 'gritter-success gritter-light',
        // defaults to 'top-right' but can be 'bottom-left', 'bottom-right', 'top-left', 'top-right' (added in 1.7.1)
        position: 'bottom-left'
    });
}

// 메시지 팝업에 사용할 메일알림 형식. 
function newMailMessageFormatter(value, id) {
    return '<a href="#" style="font-family:맑은 고딕; font-size:10pt; font-weight:bold;" onclick="newMailOpen(\''+id+'\')"> '
         + '    <img style="position:relative; top:-1px;" src="/common/images/icon-mail-temp.png" align="absmiddle"> '
         + '    새로운 메시지 수신 알림 - ' + value
         + '</a> ';
}

// 메일 팝업 조회. 
function newMailOpen(id) {
    OpenWindow("/mail/read.htm?message_name="+id, "", "900" , "620");
}


function getCookie(Name) {
	var search = Name + "="
	if (document.cookie.length > 0) { // 쿠키가 설정되어 있다면
		offset = document.cookie.indexOf(search)
		if (offset != -1) { // 쿠키가 존재하면
			offset += search.length;
			// set index of beginning of value
			end = document.cookie.indexOf(";", offset);
			// 쿠키 값의 마지막 위치 인덱스 번호 설정
			if (end == -1)
				end = document.cookie.length
			return unescape(document.cookie.substring(offset, end));
		}
	}
	return "";
}

//상단 알림창 - 레이어
function getNoticePopup() {
	$.ajax({
		url: '/bbs/notice_popup.htm',
		type: 'POST',
		dataType: 'html',
		success: function(data, text, request) {
			var tmp = data.split("</a>");
			for( var i=0; i < tmp.length-1; i++) {
				//var topNoty = generate('topRight', 'alert', tmp[i] + "</a>");
				//setTimeout(function() {
				//	$.noty.close(topNoty.options.id);
				//}, 10000 );
				
				var a = $(tmp[i]+"</a>");
				var dataBbsid = a.attr("data-Bbsid");
				var dataDocid = a.attr("data-Docid");

				if (getCookie("autoWindowPopup"+dataBbsid+dataDocid) != "off") {
				
				 var url = "/bbs/read.htm?bbsId=" + dataBbsid + "&docId=" + dataDocid;
				 url += "&useNewWin=false&useLayerPopup=true&isNoticePopup=true";
				 
				 var winName = "popup_" + i;
				 winleft = ( (screen.width - 800) / 2) + (i*50);
				 wintop = ((screen.height - 500) / 2) + (i*50);
				 var win = window.open(url , winName , "scrollbars=yes,width="+ 800 +", height="+ 500 +", top="+ wintop +", left=" + winleft + ", resizable=yes, status=yes"  );
				    
				 //OpenWindow(url, winName, "800", "500");

					/*
					$.gritter.add({
						// (string | mandatory) the heading of the notification
						title: tmp[i] + "</a>",
						// (string | mandatory) the text inside the notification
						text: '',
						// (bool | optional) if you want it to fade out on its own or just sit there
						sticky: false,
						// (int | optional) the time you want it to be alive for before fading out (milliseconds)
						time: 6000,
						// (string | optional) the class name you want to apply directly to the notification for custom styling
						class_name: 'gritter-success gritter-light',
						// how fast the notices fade out
						fade_out_speed: 0
					});
					*/
					
				}
			}
		}
	});
}

function getPasswordPopup() {
	$.ajax({
	    url: '/common/getCountNewPasswordNeeded.htm', dataType: 'json',
	    success: function(data, text, request) {
	    	var msg = "";
	    	if (data.msg != "") {
		    	msg = '<a href="#" style="text-align: center; display: block;">'
					+ '<span style="font-family: Sans-serif; font-size:16px; line-height: 160%; font-weight:bold; color: #486bab;">'+data.msg+'</span>'
					+ '</a>';
	    	}
	    	
			if (msg != "") {
			    $.gritter.add({ title: msg, text: '', sticky: false, time: 10000, class_name: 'gritter-success gritter-light', position: 'bottom-left' });
			}
	    }
	});
}

//패스워드 만료 안내
function getPasswordPopup() {
	$.ajax({
	    url: '/common/getCountNewPasswordNeeded.htm', dataType: 'json',
	    success: function(data, text, request) {
	    	var msg = "";
	    	if (data.msg != "") {
		    	msg = '<a href="#" style="text-align: center; display: block;">'
					+ '<span style="font-family: Sans-serif; font-size:16px; line-height: 160%; font-weight:bold; color: #486bab;">'+data.msg+'</span>'
					+ '</a>';
	    	}
	    	
			if (msg != "") {
			    $.gritter.add({ title: msg, text: '', sticky: false, time: 10000, class_name: 'gritter-success gritter-light', position: 'bottom-left' });
			}
	    }
	});
}

//뉴스티커 표시
function getNewsTicker() {
    $.ajax({
        url: '/bbs/newsTicker_marquee.htm',
        type: 'POST',
        dataType: 'html',
        success: function(data, text, request) {
            if ($.trim(data || "").length > 0) {
                $("#marquee").html(data);
                $('.marquee').marquee({
                    //speed in milliseconds of the marquee
                    duration: 15000,
                    //gap in pixels between the tickers
                    gap: 150,
                    //time in milliseconds before the marquee will start animating
                    delayBeforeStart: 0,
                    //'left' or 'right'
                    direction: 'left',
                    //true or false - should the marquee be duplicated to show an effect of continues flow
                    duplicated: true
                });
            } else {
                $("#marquee").parent().parent().hide();
            }
        }
    });
}

function setWidgetCount(apprType) {
  var u_Str = "";
  
  switch(apprType)
  {
  case 5: //전자메일 읽지 않은 수
      url_Str = '/mail/widgetCount.htm';
      break;
  case 6: //사내쪽지 읽지 않은수
      url_Str = '/notification/WidgetCount.htm';
      break;
//case 10:    //대여
//    url_Str = '/fixtures/data/fixturesWidgetCount.jsp';
      break;
  case 7:     // 제안문서
  case 8:     // 심사문서
      url_Str = '/proposal/data/proposalWidgetCount.jsp?menu=' + apprType;
      break;
  case 9:     // 문서관리 (문서관리 전체보기의 최근 7일이내 작성된 문서의 수)
      url_Str = '/dms/widgetCount.htm?countType=7';
      break;
  case 10:    // 프로젝트 할당된 작업 (진행중인 해야할일/검토할일 합한 수)
      url_Str = '/todo/widgetCount.htm';
      break;
  case 11:    // 휴가자 수
      url_Str = '/vacation/data/widgetCount.jsp';
      break;
  case 12:    // 출장자 수
      url_Str = '/trip/data/widgetCount.jsp';
      break;
  case 13:    // 금일 개인.공유 일정
      url_Str = '/schedule/widgetCount.htm?startDate=&endDate=';
      break;
  default :   //전자결재 관련 카운터
      url_Str = '/approval/apprWidgetCount.htm?apprType='+ apprType;
      break;
  }

  $.ajax({
      url: url_Str,
      type: 'POST',
      dataType: 'text',
      success: function(data, text, request) {
          var objSpan = document.getElementById("appr_idx" + apprType);
          var cnt = parseInt($.trim(data));
          if (isNaN(cnt)) cnt = 0;
          //objSpan.innerHTML = cnt;
          $(objSpan).html(cnt);
      }
  });
}

function openTodoDoc(docid) {
  var url = '/todo/read.htm?docid=' + docid;
  OpenWindow(url, "Project", "800", "600");
}

//오늘의 일정 가져오기
function getScheIngData(date) {
  $.ajax({
      url: '/schedule/widget.htm?listcount=999&ctype=1&date=' + date,
      type: 'POST',
      dataType: 'html',
      success: function(data, text, request) {
          var dateHeight = $("#sche_datepicker").height();    //메인화면 달력의 세로길이
          /**
              해당월이 총 몇주인가에 따라 달력의 세로 길이가 변한다.
              변하는 세로길이에 맞춰 생일자 항목의 세로 길이를 조정한다.
          */
          if(dateHeight >= 180){  //6주
              $(".birthDiv").css("height", "97");
          }else if(dateHeight >= 159){    //5주
              $(".birthDiv").css("height", "115");
          }else if(dateHeight <= 138){    //4주
              $(".birthDiv").css("height", "138");
          }
          $("#sche").html( data );
      }
  });
}

//메일 가져오기
function getMailData() {
$.ajax({
    url: '/mail/widget.htm?listCount=5',
    type: 'POST',
    dataType: 'html',
    success: function(data, text, request) {
        $("#tabs-mail").html( data );
    }
});
}
		
//결재 가져오기 : 1번 결재할 문서, 2번 결재중인 문서
function getApprovalData(args) {
$.ajax({
    url: '/approval/widget.htm?listCount=5&ctype=' + args,
    type: 'POST',
    dataType: 'html',
    success: function(data, text, request) {
        $("#tabs-approval").html( data );
    }
});
}

//EDMS 가져오기
function getDmsData() {
$.ajax({
    url: '/dms/widget.htm?listCount=5&listMode=alllist',
    type: 'POST',
    dataType: 'html',
    success: function(data, text, request) {
        $("#tabs-dms").html( data );
    }
});
}

//Todo 가져오기
function getTodoData() {
$.ajax({
    url: "/todo/widget.htm?listCount=6&dscd=20&stcd='10','20'",
    type: 'POST',
    dataType: 'html',
    success: function(data, text, request) {
        $("#tabs-todo").html( data );
    }
});
}

//식단표 가져오기
function getScheMenuData() {
	$.ajax({
		url: "/schedule/widget_menu.htm",
		type: 'POST',
		dataType: 'html',
		success: function(data, text, request) {
			$("#tabs-sche_menu").html( data );
		}
	});
}

//생일자 가져오기
function getBirthdayData() {
  $.ajax({
      url: '/schedule/widgetBirthday.htm',
      type: 'POST',
      dataType: 'html',
      success: function(data, text, request) {
          $("#birthday").html( data );
      }
  });
}

//휴가현황 가져오기
function getVacationData() {
	$.ajax({
		url: '/configuration/widget_vacation.htm',
		type: 'POST',
		dataType: 'html',
		success: function(data, text, request) {
			$("#tabs-vacation").html( data );
		}
	});
}

//설문조사 가져오기
function getPollData() {
  $.ajax({
      url: '/poll/widget.htm?pollState=2&pollId=00000000000000&rowCnt=5&workType=1',
      type: 'POST',
      dataType: 'html',
      success: function(data, text, request) {
          $("#poll").html( data );
      }
  });
}

//마지막 접속일시
function getlastLoginTime() {
  $.ajax({
      url: '/common/getLastLoginTime.htm',
      type: 'POST',
      dataType: 'html',
      success: function(data, text, request) {
          $("#lastLoginTime").html( data );
      }
  });
}

//공지사항 가져오기
function getAnnounceData() {
  $.ajax({
      url: '/bbs/widget.htm?listCount=3&bbsId=bbs00000000000000',
      type: 'POST',
      dataType: 'html',
      success: function(data, text, request) {
          $("#announce").html( data );
      }
  });
}

//최근게시글 가져오기
function getNewestData() {
  $.ajax({
      url: '/bbs/widget_board.htm?endNum=5',
      type: 'POST',
      dataType: 'html',
      success: function(data, text, request) {
          $("#board").html( data );
      }
  });
}

//게시판 가져오기
function getBbsData() {
  $.ajax({
      url: '/bbs/widget.htm?listCount=6&bbsId=bbs00000000000004',
      type: 'POST',
      dataType: 'html',
      success: function(data, text, request) {
          $("#board").html( data );
      }
  });
}

//날짜 가져오기
function weatherReload() {
  $('#global1').html("");
  $('#global2').html("");
  $('#local').html("");
  
  //LA Peiching Sydney 
  //$('#global1').weatherfeed(['499747','2122265','1030077','140644','134047'],{
  $('#global1').weatherfeed(['2442047','2137120','1105779'],{
      unit: 'c',
      image: true,
      country: true,
      highlow: false,
      wind: false,
      humidity: false,
      visibility: false,
      sunrise: false,
      sunset: false,
      forecast: false,
      link: false,
      woeid: true
  });
  //  NewYork Moscow Hawai 
  $('#global2').weatherfeed(['2459115','2122265','2347570'],{
      unit: 'c',
      image: true,
      country: true,
      highlow: false,
      wind: false,
      humidity: false,
      visibility: false,
      sunrise: false,
      sunset: false,
      forecast: false,
      link: false,
      woeid: true
  });
  
  //Busan Seoul Jeju daejeon ullungdo (,'1132467','12495862')
  $('#local').weatherfeed(['1132447','1132599','1132454'],{
      unit: 'c',
      image: true,
      country: false,
      highlow: true,
      wind: false,
      humidity: false,
      visibility: false,
      sunrise: false,
      sunset: false,
      forecast: false,
      link: false,
      woeid: true
  });
  
  setTimeout( function() {
      $(".weatherItem").css("background-image", function() {
          if ( this.style.backgroundImage.indexOf('20d.png') > -1 ) {
              this.style.backgroundImage = this.style.backgroundImage.replace(/20d\.png/gi,"28s.png");
              this.style.backgroundPositionX = "center";
          } else if ( this.style.backgroundImage.indexOf('20n.png') > -1 ) {
              this.style.backgroundImage = this.style.backgroundImage.replace(/20n\.png/gi,"28s.png");
              this.style.backgroundPositionX = "center";
          } else {
              this.style.backgroundImage = this.style.backgroundImage.replace(/d\.png/gi,"s.png");
              this.style.backgroundImage = this.style.backgroundImage.replace(/n\.png/gi,"s.png");
              this.style.backgroundPositionX = "center";
          }
      });
  }, 1000 );
}

function weatherResize() {
  //console.log("weatherResize");
  // 기본 d.png , n.png 를 s.png로 변경
  $('.weatherItem').css( 'background-image', function() {
      if ( this.style.backgroundImage.indexOf('20d.png') > -1 ) {
          this.style.backgroundImage = this.style.backgroundImage.replace(/20d\.png/gi,"28s.png");
      } else if ( this.style.backgroundImage.indexOf('20n.png') > -1 ) {
          this.style.backgroundImage = this.style.backgroundImage.replace(/20n\.png/gi,"28s.png");
      } else {
      this.style.backgroundImage = this.style.backgroundImage.replace(/d\.png/gi,"s.png");
      this.style.backgroundImage = this.style.backgroundImage.replace(/n\.png/gi,"s.png");
      }
  });
}

function wTime(hoffset) {
  var wDate = new Date();
  var offset = hoffset * 3600000;
  var tz = wDate.getTime() - SyncTimeL + offset + ServerTimeZ + ClientTimeZ;
  wDate.setTime(tz);
  var sDate = leftZero(wDate.getMonth()+1) + "-" + leftZero(wDate.getDate()) + " " + leftZero(wDate.getHours()) + ":" + leftZero(wDate.getMinutes());
  return sDate;
}

function ywTime(hoffset) {
  var wDate = new Date();
  var offset = hoffset * 3600000;
  var tz = wDate.getTime() - SyncTimeL + offset + ServerTimeZ + ClientTimeZ;
  wDate.setTime(tz);
  var sDate = wDate.getFullYear() + "-" + leftZero(wDate.getMonth()+1) + "-" + leftZero(wDate.getDate()) + " " + leftZero(wDate.getHours()) + ":" + leftZero(wDate.getMinutes());
  return sDate;
}

function leftZero(num) { return ((num < 10)? "0": "") + num; }

//run the currently selected effect
function runEffect() {
   
  // get effect type from
  //var selectedEffect = $( "#effectTypes" ).val();
  var selectedEffect = "slide";
  // most effect types need no options passed by default
  var options = {};
  // some effects have required parameters
  if ( selectedEffect === "scale" ) {
  options = { percent: 0 };
  } else if ( selectedEffect === "size" ) {
  options = { to: { width: 200, height: 60 } };
  }
  // run the effect
  $( "#effect" ).toggle( selectedEffect, options, 500 );
  $( "#effect1" ).toggle( selectedEffect, options, 500 );
};

//callback function to bring a hidden box back
function callback() {
  //$( "#effect1:none" ).removeAttr( "style" ).fadeOut();
  $( "#effect1" ).toggle( selectedEffect, options, 500 );
};


var message_community = "게시판"; // 커뮤니티 
var message_approval = "전자결재"; // 전자결재 
var message_document = "문서관리"; // 문서관리 
var message_mailread = "메일읽기"; // 메일읽기 
var message_message = "쪽지"; // 쪽지 

//front mail open
function OnClickOpenMail(messageName){
  var WinWidth = 1000 ;
  var WinHeight = 500 ;
  var winleft = (screen.width - WinWidth) / 2;
  var wintop = (screen.height - WinHeight) / 2;
  var UrlStr = "/mail/read.htm?front=&message_name=" + messageName ;
  if (typeof dhtmlwindow == "undefined") {
      OpenWindow(UrlStr, "", WinWidth, WinHeight);
  } else {
      OpenWindow(UrlStr, "", WinWidth, WinHeight);
  }
}

//front noty open
function OnClickOpenNote(boxID, noteID) {
  var WinWidth = 850 ; 
  var WinHeight = 500 ; 
  var winleft = (screen.width - WinWidth) / 2;
  var wintop = (screen.height - WinHeight) / 2;
  var UrlStr = "/notification/read.htm?newwin=&noteId=" + noteID + "&boxId=" +boxID+"&indexMain=Y" ;
   if (typeof dhtmlwindow == "undefined") {
       OpenWindow(UrlStr, "", WinWidth, WinHeight);
   } else {
       OpenWindow(UrlStr, "", WinWidth, WinHeight);
   }
}

function openScheDoc(id) {
  var url = "/schedule/read.htm?docId=" + id;
  OpenWindow(url, "Sche", "800", "400");
  return;
  
  if (typeof dhtmlwindow == "undefined") {
      OpenWindow(url, "Sche", "800", "400");
      //ModalDialog({'t':'일정 조회', 'w':800, 'h':550, 'm':'iframe', 'u':url, 'modal':true, 'd':false, 'r':false });
  } else {
          parent.dhtmlwindow.open(
          url, "iframe", url, "일정 조회", 
          "width=800px,height=400px,resize=1,scrolling=1,center=1", "recal"
      );
  }
}

function openBbs(cmd, isNewWin ,bbsId, docId){
  var url = "/bbs/read.htm?bbsId=" + bbsId + "&docId=" + docId;
  
  if(isNewWin == "true"){
      url += "&useNewWin=true&useLayerPopup=false";
      var winName = "popup_" + popupWinCnt++;
      OpenWindow(url, winName, "760", "610");
  } else {    //self
      url += "&useNewWin=false&useLayerPopup=true";
      if (typeof dhtmlwindow == "undefined") {
          OpenWindow(url, message_community, "800", "500");
      } else {
          OpenWindow(url, message_community, "800", "500");
      }
  }
}

function openBbsWidget(cmd, isNewWin, type, bbsId, docId){
  var url = "";
  if(type == "board"){
      url ="/bbs/read.htm?bbsId=" + bbsId + "&docId=" + docId;
  }else{
      url = "/bbswork/read.htm?docId=" + docId;
  }
  
  if(isNewWin == "true"){
      url += "&useNewWin=true&useLayerPopup=false";
      var winName = "popup_" + popupWinCnt++;
      OpenWindow(url, winName, "760", "610");
      
      //var a = ModalDialog({'t':'document title', 'modal':false, 'w':800, 'h':500, 'm':'iframe', 'u':url});
  } else {    //self
      url += "&useNewWin=false&useLayerPopup=true";
      //alert(url);
      if (typeof dhtmlwindow == "undefined") {
          var a = ModalDialog({'t':'커뮤니티', 'modal':false, 'w':800, 'h':500, 'm':'iframe', 'u':url});
      } else {
          parent.dhtmlwindow.open(
              url, "iframe", url, "커뮤니티", 
              "width=800px,height=500px,resize=1,scrolling=1,center=1", "recal"
          );
      }
  }
}

function openBbsWork(cmd, isNewWin, docId){
  var url = "/bbswork/read.htm?docId=" + docId;
  
  if(isNewWin == "true"){
      url += "&useNewWin=true&useLayerPopup=false";
      var winName = "popup_" + popupWinCnt++;
      OpenWindow(url, winName, "760", "610");
      
  } else {    //self
      url += "&useNewWin=false&useLayerPopup=true";
      if (typeof dhtmlwindow == "undefined") {
          OpenWindow(url, message_community, "800", "500");
      } else {
          OpenWindow(url, message_community, "800", "500");
      }
  }
}

function goApprIng(apprtype, isNewWin, apprid, popcheck)
{
  var UrlStr = "";
  if( apprtype == "3" ){
      UrlStr = "/approval/apprdoc.htm?menu=340&apprId="+apprid+"&pop=" + popcheck ;
  }else{
      UrlStr = "/approval/apprdoc.htm?menu=240&apprId="+apprid+"&pop=" + popcheck ;
  }
  
  //apprdocPopupWidth=880; //800;
  if(isNewWin == "true"){
      UrlStr += "&useNewWin=true&useLayerPopup=false";
      var winName = "popup_" + popupWinCnt++;
      OpenWindow(UrlStr, winName, "880", "550");
  } else {    //self
      UrlStr += "&useNewWin=false&useLayerPopup=true";
      if (typeof dhtmlwindow == "undefined") {
          OpenWindow(UrlStr, message_approval, "880", "550");
      } else {
    	  //apprdocPopupWidth=880; //820;
          OpenWindow(UrlStr, message_approval, "880", "550");
      }
  }
}

//DMS 문서조회
function goDmsWidget(docId){
  var UrlStr = "/dms/read.htm?docId="+docId;
  OpenWindow(UrlStr, "<spring:message code='main.Document.Management' text='문서관리' />", "840", "610");
}

function generate(layout, ntype, nText) {
  var n = noty({
      text: nText,
      type: ntype,
      dismissQueue: true,
      layout: layout,
      theme: 'defaultTheme'
  });
  //console.log('html: '+n.options.id);
  return n;
}

function generateAll() {
  generate('topRight', 'information');
  generate('bottomRight', 'success');
}

//년도별 직원증감 차트
function getChatData1() {
$("#my-widget-85").find(".widget-body").html("");
  $.ajax({
      url: '/common/getChatData1.htm',
      type: 'POST',
      dataType: 'json',
      success: function(data, text, request) {
          new Morris.Line({
              element: 'tabs-chart1',
              data: data,
              xkey: 'year',
              ykeys: ['c', 'a', 'b'],
              labels: ['총인원','입사자', '퇴사자'],
              resize: true
          });
      }
  });
}

//오늘자 근태현황 차트
function getChatData2() {
  var yesterday = moment().add(-1, 'days').format("YYYY-MM-DD");
  $(".tabs-chart").html("");
  $.ajax({
      url: '/common/getChatData2.htm?date='+yesterday,
      type: 'POST',
      dataType: 'json',
      success: function(data, text, request) {
          new Morris.Donut({
              element: 'tabs-chart2',
              data: data,
              formatter: function (x) { return x + " 명"},
              resize: true
          }).on('click', function(i, row){
              //row.code
          });
      }
  });

  var today = moment().format("YYYY-MM-DD");;
  $.ajax({
      url: '/common/getChatData2.htm?date='+today,
      type: 'POST',
      dataType: 'json',
      success: function(data, text, request) {
          new Morris.Donut({
              element: 'tabs-chart3',
              data: data,
              formatter: function (x) { return x + " 명"},
              resize: true
          }).on('click', function(i, row){
              //row.code
          });
      }
  });

  var tomorrow = moment().add(1, 'days').format("YYYY-MM-DD");
  $.ajax({
      url: '/common/getChatData2.htm?date='+tomorrow,
      type: 'POST',
      dataType: 'json',
      success: function(data, text, request) {
          new Morris.Donut({
              element: 'tabs-chart4',
              data: data,
              formatter: function (x) { return x + " 명"},
              resize: true
          }).on('click', function(i, row){
              //row.code
          });
      }
  });
}

//카운트 스케줄
function scheduleJob() {
    $(".fa-bell").removeClass("icon-animated-bell"); // 알림벨 움직임 정지
    $(".infobox-icon").find(".ace-icon").removeClass("icon-animated-vertical"); // 위젯카운트 움직임 정지
    
    $(".notifications_count").html(0);
    widgetCountNumber(1);   // 결재할 문서
//    widgetCountNumber(9);   // EDMS 문서
    widgetCountNumber(13);  // 개인.공유 일정 
    widgetCountNumber(14);  // 읽지않은 메일
//    widgetCountNumber(15);  // 읽지않은 쪽지
//    widgetCountNumber(16);  // 할당된 작업
    
    mailCheckDate(); // 메일 알림
    noteCheckDate(); // 쪽지 알림
}

//위젯.알림벨 카운트 수
function widgetCountNumber(cntType) {
    var cnt = 0;
    var url = "";
    switch(cntType) {
        case  1: //결재할 문서
        case  2: //진행중 문서
        case  3: //완료문서
        case  4: //임시보관함
        case  5: //수신함 (전체)
        case  6: url = "/approval/apprWidgetCount.htm?apprType="+cntType; break; //회람함 (받은회람문서)
        case  7: //제안문서
        case  8: url = "/proposal/data/proposalWidgetCount.jsp?menu="+cntType; break; //심사문서
        case  9: url = "/dms/widgetCount.htm?countType=7"; break; //문서관리 (문서관리 전체보기의 최근 7일이내 작성된 문서의 수)
        case 10: url = "/fixtures/data/fixturesWidgetCount.jsp"; break; //대여
        case 11: url = "/vacation/data/widgetCount.jsp"; break; //휴가자 수
        case 12: url = "/trip/data/widgetCount.jsp"; break; //출장자 수
        case 13: url = "/schedule/widgetCount.htm?startDate=&endDate="; break; //금일 개인.공유 일정
        case 14: url = "/mail/widgetCount.htm"; break; //전자메일 읽지 않은 수
        case 15: url = "/notification/WidgetCount.htm"; break; //사내쪽지 읽지 않은수
        case 16: url = "/todo/widgetCount.htm"; break; //프로젝트 할당된 작업 (진행중인 해야할일/검토할일 합한 수)
        default: url = ""; break;
    }

    $.ajax({
        url: url,
        type: "POST",
        cache: false,
        dataType: "text",
        success: function(data, text, request) {
            cnt = parseInt($.trim(data));
            if (isNaN(cnt)) cnt = 0;
            
            var oldCount = $.cookie("widget_count_"+cntType) || 0;
            $.cookie("widget_count_"+cntType, cnt, { path: '/' });
            
            if (cnt > 0 && (cntType == 14 || cntType == 1 || cntType == 16 || cntType == 13)) {
                // 알림벨 움직임 동작
                if (oldCount < cnt) {
                    $(".fa-bell").addClass("icon-animated-bell");
                }
                // 알림벨 총 카운트
                var objNoti = $(".notifications_count");
                objNoti.html(parseInt(objNoti.html()) + cnt);
            }

            // 알림벨 세부 카운트
            var objSpans = $(".widget_count_"+cntType);
            for(var i = 0; i < objSpans.length; i++) {
                var objSpan = $(objSpans[i]);
                var before = objSpan.attr("data-before") || "";
                objSpan.html(before+cnt);
                
                // 위젯카운트 움직임 동작
                var icon = objSpan.attr("data-icon") || "";
                if (icon != "" && oldCount < cnt) {
                    $(".infobox-icon").find("."+icon).addClass("icon-animated-vertical");
                }
            }
        }
    });
    
    return cnt;
}

//사이트맵 팝업
function fnSitemapPop() {
	var url = "/configuration/sitemap.htm";
	var title = "그룹웨어 사이트맵";
	OpenWindow(url, title, "970", "600");
}

//결재할문서 enabler 버튼 클릭 시  결재데이타 가져옴
function apSwitchCheck(state) {
	if ( state == false ) {
		getApprovalData(2);
	} else {
		getApprovalData(1);
	}
	$("#apSwitch").attr("checked" , state );
}