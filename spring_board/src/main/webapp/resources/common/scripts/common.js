//---------------------------------------------------------------------------------

var winx = 0;
var winy = 0;

// return xmlhttprequest
function createXmlHttp() {
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
}

//값이 있는지 없는지 검사.
//fld_name : input이나 id의 name
function isEmpty( fld_name ) {
	var fld = document.getElementById(fld_name);
	if(fld == null) {
		fld = document.getElementsByName(fld_name)[0];
	}
	var val = fld.value;
    if (val == null || val.replace(/ /gi,"") == "") {
        return true;
    }
    return false;
}

function TrimAll(str)
{
    var empty = "" ;
    empty = Trim(str, "LEFT")
    empty = Trim(empty, "RIGHT")
    return empty ;
}

//공백 하러 넘어 온값
function Trim(str,flag){
    var Sindex = -1;
    var ilen = str.length ;
	var strReturn = str;
    switch(flag.toUpperCase()){
	case "LEFT" :
		for(j=0 ; j< ilen ;j++){
  			if(str.charAt(j) == " "){
				Sindex = j;
			} else break;
		}
		if (Sindex > -1) strReturn = str.substring(Sindex+1, ilen);
		break ;

	case "RIGHT" :
		for(j=ilen-1 ;j >= 0  ;j--){
			if(str.charAt(j) == " "){
				Sindex = j;
			}
			else break;
		}
		if (Sindex > -1) strReturn = str.substring(0, Sindex);
		break ;
	}
	return strReturn;
}

//---------------------------------------------------------------------------------
//인자값으로 받은 문자열에서 모든 공백을 무조건 제거하는 함수
function TrimStr(fldValue) {
    var empty = fldValue.replace(/ /gi,"") ;
    return empty ;
}

//---------------------------------------------------------------------------------
//문자 삭제
//주어진 문자열에서 curStr문자이후 문자를 가져온다.
function cutAfter(str, cutStr){
	var revalue=cut(str, cutStr, "after");
	return revalue;
}

//주어진 문자열에서 curStr 문자 이전 문자를가져온다.
function cutBefore(str, cutStr){
	var revalue = cut(str, cutStr, "before");
	return revalue;
}

//주어진 문자열에서 curStr 문자 이전혹은 이후 문자열을 가져온다(flag값에 따라 다름)
//배열값은 ,로 구분을 함.
function cut(str, cutStr, flag){
	var strs = str.split(",");
	var revalue = "";
	flag = flag.toLowerCase();

	for(var i = 0 ; i < strs.length ; i++){
		var sindex = strs[i].indexOf(cutStr);
		if(revalue != "") revalue += ",";
		if( sindex == -1){
			revalue += strs[i];	//짜를 문자열이 없을때  값을 그대로 돌림.
		}else{
			revalue += (flag == "after" ? strs[i].substr(sindex) : strs[i].substring(0, sindex) );
		}
	}
	return revalue;
}

//---------------------------------------------------------------------------------
//팦업창들 뛰우기
//새로운 Window창을 Open할 경우 사용되는 함수 ( arg : 주소 , 창타이틀 , 넓이 , 길이 )
function OpenWindow(UrlStr, WinTitle, WinWidth, WinHeight) {
	winleft = (screen.width - WinWidth) / 2;
	wintop = (screen.height - WinHeight) / 2;
	var win = window.open(UrlStr , WinTitle , "scrollbars=yes,width="+ WinWidth +", height="+ WinHeight +", top="+ wintop +", left=" + winleft + ", resizable=yes, status=yes"  );
    win.focus() ; 
}

function OpenWindowNoScr(UrlStr, WinTitle, WinWidth, WinHeight) {
	winleft = (screen.width - WinWidth) / 2;
	wintop = (screen.height - WinHeight) / 2;
	var win = window.open(UrlStr , WinTitle , "width="+ WinWidth +", height="+ WinHeight +", top="+ wintop +", left=" + winleft + ", resizable=yes, status=yes"  );
    win.focus() ; 
}

function OpenModal( modal_url , modal_arg , modal_width , modal_height ) {
	// url       : 모달로서 호출할 페이지 주소 ( argument 포함한 전체 경로 )
	// arg      : 모달l로 넘겨줄 argument ( ex: document or field 등... )
	// width   : 모달 창 넓이
	// height : 모달 창 길이

	modal_left = (screen.width - modal_width) / 2;
	modal_top = (screen.height - modal_height) / 2;
	returnvalue = self.showModalDialog( modal_url , modal_arg,
     	             "status:no;scroll:no;dialogLeft:" + modal_left + ";dialogTop:" + modal_top + ";help:no;dialogWidth:" + modal_width + "px;dialogHeight:" + modal_height + "px");
	return returnvalue;
}

function OpenModeless( modal_url , modal_arg , modal_width , modal_height ) {
	// url       : 모달로서 호출할 페이지 주소 ( argument 포함한 전체 경로 )
	// arg      : 모달l로 넘겨줄 argument ( ex: document or field 등... )
	// width   : 모달 창 넓이
	// height : 모달 창 길이

	modal_left = (screen.width - modal_width) / 2;
	modal_top = (screen.height - modal_height) / 2;
	returnvalue = self.showModelessDialog( modal_url , modal_arg,
     	             "status:no;scroll:no;dialogLeft:" + modal_left + ";dialogTop:" + modal_top + ";help:no;dialogWidth:" + modal_width + "px;dialogHeight:" + modal_height + "px;dialogHide:no;");
	return returnvalue;
}

//---------------------------------------------------------------------------------
//사용자 정보 보여주기 이것을 사용하면 xmlhttp.vbs 도 포함해라.
// 사용자의 간단한 정보를 보여주는 화면호출 함수
var oPopup ;
function ShowUserInfo(event, userId) {
	try {
		
		var img = $(event.srcElement);
		winx = img.position().top + 20;
		winy = img.position().left - 400;
	} catch(e) {
		winx = "";
		winy = "";
	}

	var url = "../common/userinfo.htm?userId=" + userId ;
	var xmlHttpRequest = getXmlHttpRequest();
	xmlHttpRequest.onreadystatechange = function(){
		if ( xmlHttpRequest.readyState == 4 ) {
			if ( xmlHttpRequest.status != 200 ) {
				alert( '오류가 발생하였습니다 : XMLHTTP\n\n오류위치 : ShowUserInfo()' );
				return;
			}
			wid = 355 ;
			hei = 170;
			//x = 367 ;
			//x = document.body.clientWidth - 360;
			//y = 48 ;
			
			data = xmlHttpRequest.responseText;
			ModalDialog({'t':'사용자 프로파일', 'tp':winx, 'lp':winy, 'w':400, 'h':210, 'm':'html', 'c':data, 'modal':false, 'd':false, 'r':false });
			/*
			if(window.createPopup){
				oPopup = window.createPopup();
				var oPopupBody = oPopup.document.body;
				oPopupBody.innerHTML = xmlHttpRequest.responseText ;
				oPopup.show(x, y, wid, hei , document.body);
			} else {
				var features = "height=" + hei + ",width=" + wid + ",left=" + x + ",top=" + y + 
					",titlebar=no,menubar=no,scrollbars=no,status=no,location=no"
				oPopup = window.open("about:blank", "oPopup", features);
				oPopup.document.body.innerHTML = xmlHttpRequest.responseText;
			}
			*/
		}
	}
	xmlHttpRequest.open("GET", url, true);
	xmlHttpRequest.send();
}

function ShowUserInfo(userId) {
	try {
		
		var img = $(event.srcElement);
		winx = img.position().top + 20;
		winy = img.position().left - 400;
	} catch(e) {
		winx = "";
		winy = "";
	}

	var url = "../common/userinfo.htm?userId=" + userId ;
	var xmlHttpRequest = getXmlHttpRequest();
	xmlHttpRequest.onreadystatechange = function(){
		if ( xmlHttpRequest.readyState == 4 ) {
			if ( xmlHttpRequest.status != 200 ) {
				alert( '오류가 발생하였습니다 : XMLHTTP\n\n오류위치 : ShowUserInfo()' );
				return;
			}
			wid = 355 ;
			hei = 170;
			//x = 367 ;
			//x = document.body.clientWidth - 360;
			//y = 48 ;
			
			data = xmlHttpRequest.responseText;
			ModalDialog({'t':'사용자 프로파일', 'tp':winx, 'lp':winy, 'w':400, 'h':210, 'm':'html', 'c':data, 'modal':false, 'd':false, 'r':false });
			/*
			if(window.createPopup){
				oPopup = window.createPopup();
				var oPopupBody = oPopup.document.body;
				oPopupBody.innerHTML = xmlHttpRequest.responseText ;
				oPopup.show(x, y, wid, hei , document.body);
			} else {
				var features = "height=" + hei + ",width=" + wid + ",left=" + x + ",top=" + y + 
					",titlebar=no,menubar=no,scrollbars=no,status=no,location=no"
				oPopup = window.open("about:blank", "oPopup", features);
				oPopup.document.body.innerHTML = xmlHttpRequest.responseText;
			}
			*/
		}
	}
	xmlHttpRequest.open("GET", url, true);
	xmlHttpRequest.send();
}

function HideUserInfo() {
	if(window.createPopup) oPopup.hide();
	else oPopup.close();
}
//---------------------------------------------------------------------------------
//버튼이미지 처리
function btn_on( btn ) {
	//현재 소스명에서 처음부터 뒤자리만...
	imgsrc = btn.src.substring( 0, btn.src.length - 7 ) ;
	if ( imgsrc.substring(imgsrc.length -1 , imgsrc.length) == '_' ) {
		btn.src = imgsrc + "on.gif" ;
	} else {
		btn.src = imgsrc + "_on.gif" ;
	}
}

function btn_off( btn) {
	imgsrc = btn.src.substring( 0, btn.src.length - 6 ) ;
	if ( imgsrc.substring(imgsrc.length -1 , imgsrc.length) == '_' ) {
		btn.src = imgsrc + "off.gif" ;
	} else {
		btn.src = imgsrc + "_off.gif" ;
	}
}

function mailsender(mailto){
	location.href("../mail/mail_form.jsp?to=" + mailto);
}

//---------------------------------------------------------------------------------
//달력처리
//날짜 입력 버튼 선택
function SelectDate( arg1 ) {
	returnvalue = OpenCalendar();

	if ( returnvalue == null ) {
	} else {
		document.all[arg1].value = returnvalue ;
	}
}

//날짜 선택창 팝업
function OpenCalendar( arg1 ) {
	x = 300;
	y = 100;
	winwidth = "197px";
	winheight = "215px";

	winleft = x + 180 - 100 ;	//왼쪽 여백 기준 : Position + 180 - 100( 창 절반크기 )
	wintop = y + 74 + 100 ;	//높이 기준 : position + 74 + 100( 창 절반크기 )
	var url = "../common/calendar.jsp";
	fld = document.all[ arg1 ];	//값을 설정할 필드개체

	returnvalue = window.showModalDialog(url, fld , "scroll:no; status:no; dialogLeft:" + winleft + "; dialogTop:" + wintop + "; help:no; dialogWidth:" + winwidth+"; dialogHeight:" + winheight);
	return returnvalue;
}

//---------------------------------------------------------------------------------
//인자로 받은 id에 대한 show / hidden을 반복적으로 수행.
function showid( args ) {
//해당 개체가 없으면 수행하지 않는다.
	if(!document.all[ args ]) return;

	if (document.all[ args ].style.display == "none") {
		document.all[ args ].style.display = "";
	} else {
		document.all[ args ].style.display = "none";
	}
}

//---------------------------------------------------------------------------------
//값 검사.
//Field Validation Check 하는 함수
//Field의 값이 부적절하다면 FALSE 를 반환
//fldr : 필드 객체, fldName : 필드 이름 , fldType :필드 형태
function FieldNullCheck(fld , fldName , fldType) {
    fldType = fldType.toUpperCase() ;
    switch(fldType.toUpperCase()){
    case "MULTILIST" :
	        // List Box ( Multi Select )   -1 : No Select , 0 : Default Value
		if (fld.selectedIndex==-1 || fld.selectedIndex==0 ){
			alert( '"' + fldName + '" 을(를) 선택하여 주십시오.'  );
			fld.focus() ;
			return false;
		}
        break ;
    case "RADIO" :
		//Radio Button
		var Checked = "FALSE" ;
		for (var i = 0; i < fld.length; i++) {
			if (fld[i].checked == true) {
				Checked = "TRUE" ;
			}
		}

		if (Checked == "FALSE") {
			alert( '"' + fldName + '" 을(를) 선택하여 주십시오.') ;
			//     fld.focus();
			return false;
		}
        break ;
    case "CHECK" :
		//Check Box
		var Checked = "FALSE";
		for (var i = 0; i < fld.length; i++) {
			if (fld[i].checked == true) {
				Checked = "TRUE" ;
			}
		} ;
		if (Checked == 'FALSE' ) {
			alert( '"' + fldName + '" 이(가) 선택되지 않았습니다.' );
			//    fld.focus() ;
			return false;
		}
        break ;
    case "COMBO" :
		//Combo Box  [ Default Value is None ]
		if (fld.selectedIndex < 1) {
			alert('"' + fldName + '" 을(를) 선택하여 주십시오.');
			fld.focus() ;
			return false;
		}
        break ;
    case "TEXT" :
		//TEXT or NUMERIC Field
		var tStr = TrimAll(fld.value);
		if (tStr == '') {
			alert('"' + fldName + '" 을(를) 입력하여 주십시오.');
			fld.focus() ;
			return false;
		}else if (fld.name.toUpperCase() == "SUBJECT") {
			//제목필드에 대해 태그 사용여부 체크함.
			if ( FieldTagCheck( fld , fldName ) == false ){
			return false;
			}
		}
        break ;
    }

}

//제목 Field에서 태그가 사용되는 지를 Check 하는 함수
function FieldTagCheck(fld , fldName) {
	strTag="A,ACRONYM,ADDRESS,APPLET,AREA,B,BASE,BASEFONT,BDO,BGSOUND,BIG,BLOCKQUOTE,BODY,BR,BUTTON,CAPTION,CENTER,CITE,CODE,COL,COLGROUP,CUSTOM,DD,DEL,DFN,DIR,DIV,DL,DOCUMENT,DT,EM,EMBED,FIELDSET,FONT,FORM,FRAME,FRAMESET,HEAD,HN,HR,HTML,I,IFRAME,IMG,INS,KBD,LABEL,LEGEND,LI,LINK,LISTING,MAP,MARQUEE,MENU,OL,P,PLAINTEXT, PRE,Q,S,SAMP,SCRIPT,SELECT,SMALL,SPAN,STRIKE,STRONG,SUB,SUP,TABLE,TBODY,TD,TEXTAREA,TFOOT,TH,THEAD,TITLE,TR,TT,U,UL,VAR,XMP";
	arrTag=strTag.split(',');

	for( var cnt=0; cnt<arrTag.length;cnt++){
		chkTag1 = "<"+arrTag[cnt];
		chkTag2 = "</"+arrTag[cnt];
		if (fld.value.toUpperCase().indexOf(chkTag1) != -1 || fld.value.toUpperCase().indexOf(chkTag2) != -1 ){
			alert('"' + fldName + '" 에 태그를 사용하실수 없습니다. "' + fldName + '" 을(를) 다시 입력하여 주십시요.');
			fld.focus();
			return false;
		}
	}

}


//---------------------------------------------------------------------------------
// 숫자형필드에서 다른문자의 입력을 막는 함수. 필요한 키코드가 더 있다면 Copy해서 갖다 쓰도록 하세엽!
function CheckKeyCode() {

		// 숫자 필드에서 숫자[0~9]키, BackSpace, '-' 등 예외키만을 허용함.
		if ( !( event.keyCode == 8 || event.keyCode ==13  || event.keyCode == 45 || (event.keyCode >= 48 && event.keyCode <= 57) ) ) {
				return false;
		}
		return true;
}

//---------------------------------------------------------------------------------
// 필드의 입력되는 문자수를 계산하여 입력유무를 반환
function CheckTextCount(field, maxlength){
	strfield = field.value;
	strlength = 0;
	for (cntchar = 0; cntchar < strfield.length; cntchar++) {
		if (strfield.charCodeAt(cntchar) > 255){
			strlength += 2;
		}else{
			strlength++;
		}

		if (strlength >= maxlength){
			alert("입력 문자는 최대 " + maxlength + "byte이므로 더이상 입력 할 수 없습니다.");
			field.value = strfield.substring(0, cntchar);
			break;
		}
	}
}


function SetHelpIndex(helpidx)
{
	if (top.frames['frtop'] != null && top.frames['frtop'].document.all.helpidx !=null)	top.frames['frtop'].document.all.helpidx.value = helpidx;
}


//----------------------------------------------------------------------------------------
//Div 목록 사이즈 재조정
function div_resize() {
	var objDiv = document.getElementById("viewList");
	var objTbl = document.getElementById("viewTable");
	var objPg = document.getElementById("viewPage");

	//objDiv.style.width = document.body.clientWidth - 40;
	//objDiv.style.width = document.body.clientWidth + 40;
   	//objDiv.style.height = document.body.clientHeight - 146 ;
   	
   	objDiv.style.height = document.body.clientHeight - 115 ;
}

//------------------------------------------------------------------------------------------
//PNG24 이미지 
function setPng24(obj) {
	obj.width=obj.height=1;
	obj.className=obj.className.replace(/\bpng24\b/i,'');
	obj.style.filter =
	"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');"
	return '';
}
//이미지 
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

/* 2009.11.05 김정국 추가. 양식내 모든 필드에 대해 focus Event 적용 */
function fld_over_handle_BK() {
	alert();
	return;
	var tag = "INPUT^TEXTAREA".split("^");
	var isFocus = false;
	for( var k=0; k < tag.length; k++ ) {
		var tmp = document.getElementsByTagName( tag[k] );
		for( var i=0; i < tmp.length; i++ ) {
			if( tmp[i].type == 'text' || tmp[i].tagName == "TEXTAREA" ) {
				tmp[i].onfocusin = function() {
//					this.style.border = "1px groove #7F9DB9";
					this.style.border = "1px solid #E95A05";					
					this.style.backgroundColor = "#F4F4F4";
				}
				tmp[i].onfocusout = function() {
					this.style.border = "1px solid #7F9DB9";
					this.style.backgroundColor = "#FFFFFF";
				}
				if( !isFocus ) {
					tmp[i].focus();
					isFocus = true;
				}
			}
		}
	}
}

/* Frame Preview set function */

var v_type = 0;
//현재 프레임 구조를 확인한 후 설정해야 함. - 하단일 경우 1, 우측일 경우 2로 설정
function preview( args, setflag ) {
	return;
	
	// 0 : 해제, 1 : 하단미리보기 , 2: 우측미리보기
	v_type = args;
	var fs_list = parent.document.getElementById("fs_list");
	
	var fr_list = parent.document.getElementById("fr_list");
	var fr_right = parent.document.getElementById("fr_preview_right");
	var fr_bottom = parent.document.getElementById("fr_preview_bottom");

	if ( args == 0 ) {
		fs_list.rows = "100%,0";
		fs_list.cols = "100%,0%";
	} else if( args == 1 ) {
		// 하단
		fs_list.rows = "50%,50%";
		fs_list.cols = "100%,0%";

		fr_bottom.style.border = "1px solid #D7E4F5";
		fr_bottom.style.borderWidth = "1px 0px 0px 0px";
		fr_bottom.style.borderTopStyle = "ridge";

		fr_right.style.border = "0px solid #D7E4F5";
		fr_right.style.borderWidth = "0px 0px 0px 0px";

		fr_bottom.src = fr_right.src;
		fr_right.src = "about:blank";
	} else if ( args == 2 ) {
		// 우측
		fs_list.rows = "100%,0%";
		fs_list.cols = "50%,50%";

		fr_bottom.style.border = "0px solid #D7E4F5";
		fr_bottom.style.borderWidth = "0px 0px 0px 0px";

		fr_right.style.border = "0px solid #D7E4F5";
		fr_right.style.borderWidth = "0px 0px 0px 1px";
		fr_right.style.borderLeftStyle = "ridge";

		fr_right.src = fr_bottom.src;
		fr_bottom.src = "about:blank";
	}
	
	// 두번째 argument가 없을때만...
	if( setflag == null ) {
		if(document.all){
			if( args == 0 ) {
				document.all.p0.className = "p_sel";
				document.all.p1.className = "p";
				document.all.p2.className = "p";
			} else if (args == 1) {
				document.all.p0.className = "p";
				document.all.p1.className = "p_sel";
				document.all.p2.className = "p";
			} else if (args == 2) {
				document.all.p0.className = "p";
				document.all.p1.className = "p";
				document.all.p2.className = "p_sel";
			}
		} else {
			if( args == 0 ) {
				document.getElementById("p0").className = "p_sel";
				document.getElementById("p1").className = "p";
				document.getElementById("p2").className = "p";
			} else if (args == 1) {
				document.getElementById("p0").className = "p";
				document.getElementById("p1").className = "p_sel";
				document.getElementById("p2").className = "p";
			} else if (args == 2) {
				document.getElementById("p0").className = "p";
				document.getElementById("p1").className = "p";
				document.getElementById("p2").className = "p_sel";
			}
		}			
		setPreview(args);
	}
}

function setVeiwPage( args ){
	var viewType = args;
	switch(viewType){
		case "0" : preview(0);
		break;
		case "1" : preview(1);
		break;
		case "2" : preview(2);
		break;
	}
}

function setPreview(viewType) {
	var strXmlSrc = "/common/preview.jsp?viewtype=" + viewType;
	var objXmlReq = getXmlHttpRequest();
	objXmlReq.open("POST", strXmlSrc, true);
	objXmlReq.send();
}

function previewCancel() {
	return;
	var fs_list = parent.document.getElementById("fs_list");

	if ( !fs_list ) {
		var fs_list = parent.parent.document.getElementById("fs_list");
	}

	fs_list.rows = "100%,0";
	fs_list.cols = "100%,0%";
}
/*******************************************************************/
//카테고리ID Formatting CXXX / bbs_manager_view.jsp, bbs_admin_form.jsp
	function formatCategoryId(iValue)
	{
		var iLength = 1;
		if (iValue < 10) iLength = 1;
		else
		{
			if (iValue > 9 && iValue < 100) iLength = 2;
			else iLength  = 3;
		}
		var formatVal = iValue;
		for (var i=0;i<(3-iLength);i++)
		{
			formatVal = "0" + formatVal;
		}
		return "C" + formatVal;
	}
	//bbs_manager_view.jsp, bbs_admin_form.jsp
	function setCategory(categoryPool)
	{
		var frm = document.submitForm;
		var categoryInfo = categoryPool.split("|");
		if (categoryInfo.length > 0 )
		{
			frm.categoryid.value = categoryInfo[0];
			frm.categoryname.value = categoryInfo[1];
		}
	}
	
	//bbs_admin_form.jsp, bbs_admin_view.jsp, menucode_edit.jsp, menucode_form.jsp
	function setShare(sharePool)
	{
		var frm = document.submitForm;
		var shareInfo = sharePool.split("|");
		if (shareInfo.length > 0)
		{
			frm.shareid.value = shareInfo[0];
			frm.sharename.value = shareInfo[1];
			frm.sharetype.value = shareInfo[2];
			if(shareInfo[3] == "true") frm.ischilddept.checked = true;
			else frm.ischilddept.checked = false;
		}
	}
	
	//bbs_admin_form.jsp, menucode_edit.jsp, menucode_form.jsp
	function deleteFromList(selObj)
	{
		//if (selObj.type != "select-one") return;
		var idx = selObj.selectedIndex;
		if (idx > -1)
		{
			selObj.remove(idx);
		}
	}
	
	
	//bbs_admin_form.jsp, bbs_admin_view.jsp, bbs_manager_view.jsp, menucode_edit.jsp
	function getAdminId()
	{
		var frm = document.submitForm;
		var winwidth = "300";
		var winheight = "450";

		var url = "../common/department_selector.jsp?openmode=1&onlyuser=1";

		returnvalue = window.showModalDialog( url , "" ,
						 "status:no;scroll:no;center:yes;help:no;dialogWidth:" + winwidth + "px;dialogHeight:" + winheight + "px");

		if (returnvalue != null  && returnvalue != "")
		{
			var adminInfo = returnvalue.split(":");
			frm.adminid.value = adminInfo[1];
			frm.adminname.value = adminInfo[0] + "/" + adminInfo[3];
		}
	}
	
	//bbs_admin_form.jsp, bbs_admin_view.jsp, menucode_edit.jsp, menucode_form.jsp
	function getShareId()
	{
		var frm = document.submitForm;
		var winwidth = "300";
		var winheight = "450";

		var url = "../common/department_selector.htm?openmode=1";

		var returnvalue = window.showModalDialog( url , "" ,
						 "status:no;scroll:no;center:yes;help:no;dialogWidth:" + winwidth + "px;dialogHeight:" + winheight + "px");

		if (returnvalue != null  && returnvalue != "")
		{
			var shareInfo = returnvalue.split(":");
			if (shareInfo.length == 4)
			{
				frm.sharetype.value = "P";
				frm.shareid.value = shareInfo[1];
				frm.sharename.value = shareInfo[0] + "/" + shareInfo[3];
			}
			else if (shareInfo.length == 2)
			{
				frm.sharetype.value = "D";
				frm.shareid.value = shareInfo[1];
				frm.sharename.value = shareInfo[0];
			}
			else
			{
				alert("반환값이 올바르지 않습니다");
				return;
			}

		}
	}
	//bbs_diary_read.jsp, bbs_img_read.jsp, bbs_img_read_preview.jsp, bbs_read.jsp, bbs_read_preview.jsp, notification_read.jsp
	function TextCount(){
		var obj = null;
		strsubject = "";
		if(document.all) obj = document.all.comment;
		else obj = document.getElementById("comment");
		if(obj == null) document.getElementsByName("comment");
		strsbuject = obj.value;
		strlength = 0;
		document.getElementById("tmptext").innerText = strsubject.length;
		for (cntchar = 0; cntchar < strsubject.length; cntchar++) {
			if (strsubject.charCodeAt(cntchar) > 255){
				strlength += 2;
			}else{
				strlength++;
			}

			if (strlength >= 1000){
				alert("입력 문자는 최대 1000byte이므로 더이상 입력 할 수 없습니다.");
				obj.comment.value = obj.value.substring(0, cntchar);
				break;
			}
		}
	}

	// AJAX 호출을 실행
	// type : GET|POST
	// data : POST type일 경우 sumit 데이터
	// url : URL
	// fn : 성공시 실행할 fucntion
	// -- need jquery
	// since nekjava 3.0
	function ajaxRequest(type, data, url, fn){
		$.ajax({
			type : type,
			url : url,
			data : data,
			success : function(data, textStatus, jqXHR){
				if (fn != null){
					fn(data, textStatus, jqXHR);
				}
			},
			error :function(jqXHR, textStatus, errorThrown){
				alert(textStatus + ":" + errorThrown);
			}
		});
	}
	
	// 새로은 XMLHttpRequest를 생성하여 반환한다.
	// since nekjava 3.0
	function getXmlHttpRequest() {
		var xmlHttpRequest = null;
		try {
			xmlHttpRequest = new XMLHttpRequest();
		} catch(e) {
			try {
				xmlHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {
					return null;
				}
			}
		}
		return xmlHttpRequest;
	}

	function printdoc() {
		var url = "/support/PrintPreview.jsp";
		
		OpenWindow(url, "", 850, 600 );
	}
	
	function docPrint() {
		beforePrint();
		window.print();
		
		//OpenWindow(url, "", 840, 600 );
	}

    var beforePrint = function() {
        $("#ActionButton,#btntbl").css("display" , "none");
        
        // 공문인쇄 추가조건
        var gongmoonHeader = $(".gongmoon");
        if (gongmoonHeader.length > 0) {
        	gongmoonHeader.css("display", "none");
        	
        	$(".out_layer").css("background" , "#fff");
        	$(".out_layer").css("padding" , "0px");
        	
        	$(".paper_bg").css( "border", "0px");
        	$(".paper_bg").css( "box-shadow", "none");
        	
//        	$("#ApComment").css("display", "none");
//        	$("#apprdoc_footer").css("display", "none");
        }
    };
    
	// ie or chrome print event handler : 2014.09.22 jkkim - reference by stackoverflow
	(function() {

	    var afterPrint = function() {
	        $("#ActionButton,#btntbl").css("display" , "");
			// 공문인쇄 추가조건
	        var gongmoonHeader = $(".gongmoon");
	        if (gongmoonHeader.length > 0) {
	        	gongmoonHeader.css("display", "");
	        	
	        	$(".out_layer").css("background" , "#e2e1e0");
	        	$(".out_layer").css("padding" , "20px");
	        	
	        	$(".paper_bg").css( "border", "1px solid #ccc");
	        	$(".paper_bg").css( "box-shadow", "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22");
	        	
//	        	$("#ApComment").css("display", "");
//	        	$("#apprdoc_footer").css("display", "");
	        }
	    };

	    if (window.matchMedia) {
	        var mediaQueryList = window.matchMedia('print');
	        mediaQueryList.addListener(function(mql) {
	            if (mql.matches) {	//인쇄를 했음
	                beforePrint();
	            } else {	//인쇄종료 or 취소
	                afterPrint();
	            }
	        });
	    }
	    window.onbeforeprint = beforePrint;
	    window.onafterprint = afterPrint;
	}());

	
//jquery 이후에 js 선언되어야 함. - 닫기 버튼
function closeDoc() {
	//$(window).unbind("beforeunload");
	
	if ( window.opener ) {
		window.close();
	} else {
		try {
	 		var ifrm = $(window.frameElement).parent();
	 		var mdiv = ifrm.parent();
	 		mdiv.remove();
		} catch(e) {
			//alert( ifrm );
		}
	}
}

function closeDoc2(win) {
	var t_win = (win !== undefined)? win: window;
	var isWindow = (top == t_win);
	var isFrame = (t_win.frameElement != null);
	var isOpener = (t_win.opener != null);
	var isParent = (t_win.parent != null);
	//console.log(isWindow + "/" + isFrame + "/" + isOpener + "/" + isParent);
	
	if (isOpener && isWindow) {
		t_win.close();
	} else if (isParent && isFrame) {
		var elem = t_win.frameElement.parentElement.parentElement;
		var className = elem.getAttribute("class") || elem.className;
		//if (className.toLowerCase().indexOf("dhtmlwindow") > -1) {
			try { 
				parent.hideIframeModal();
				return;
				parent.modalwindow.hide(); 
			} catch(e) {
				try { console.log(e); } catch(e) {}
			}
			elem.outerHTML = "";
		//}
	}
}

function parentReload2(url, win) {
	var list = getFrameByName("if_list", win);
	if (list) {
		if (url) {
			if (list.src = url && list.document.getElementById("dataGrid")) {
				list.$("#dataGrid").trigger("reloadGrid");
			} else {
				list.src = url;
			}
		} else {
			if (list.document.getElementById("dataGrid")) {
				list.$("#dataGrid").trigger("reloadGrid");
			} else {
				list.src = list.src;
			}
		}
	}
}

function getFrameByName(name, win) {
	var t_win = (win !== undefined)? win: window;
	var isWindow = (top == t_win);
	var isFrame = (t_win.frameElement != null);
	var isOpener = (t_win.opener != null);
	var isParent = (t_win.parent != null);	
	var f_windows = new Array();
	var f_window = null;
	//console.log(isWindow + "/" + isFrame + "/" + isOpener + "/" + isParent); 
	
	if (isOpener && isWindow) 
		f_windows = t_win.opener.frames;
	else if (isParent && isFrame) 
		f_windows = t_win.top.frames;

	for(var i = 0; i < f_windows.length; i++) {
		if (f_windows[i].name == name)
			f_window = f_windows[i];
	}
	return f_window;
}

/* jqGrid List Resize : 2012.11.20 by jkkim */
/* update: 20013.09.07 */
/*
 * arguments[0]: 그리드ID
 * arguments[1]: 그리드 높이에서 감할 숫자 (기본값: -134)
 * arguments[2]: 그리드가 if_list 프레임안에 있는지 여부 (기본값: true)
 **/
function gridResize(gridName) {
	var grid = $("#" + gridName);
	var wid = 0;
	var hei = 134; //132;
	var isIfList = true;

	if (arguments.length >= 2) {
		hei = arguments[1] + 2;
	}
	if (arguments.length >= 3) {
		isIfList = arguments[2];
	}
	
	$(top.window).bind('resize', function() { setTimeout(function() {
		grid.setGridWidth(iflist_width(isIfList)-wid);
		grid.setGridHeight(iflist_height(isIfList)-hei);
	}, 0);}).trigger('resize').trigger('resize');
}

/* jqGrid Page Numbering Trick : 2012.11.20 by jkkim */
function jqGridNumbering( grid, this1, i, myPageRefresh ) {
		
	noData( grid );
	
	/* http://stackoverflow.com/questions/5800400/add-numeric-pager-to-jqgrid */
	MAX_PAGERS = 5;
	$(grid[0].p.pager + '_center td.myPager').remove();
    var pagerPrevTD = $('<td>', { "class": "myPager"}), prevPagesIncluded = 0,
        pagerNextTD = $('<td>', { "class": "myPager"}), nextPagesIncluded = 0,
        totalStyle = grid[0].p.pginput === false,
        startIndex = totalStyle? this1.p.page-MAX_PAGERS*MAX_PAGERS: this1.p.page-MAX_PAGERS;

    for (i=startIndex; i<=this1.p.lastpage && (totalStyle? (prevPagesIncluded+nextPagesIncluded<MAX_PAGERS*2):(nextPagesIncluded<MAX_PAGERS)); i++) {
        if (i<=0 || i === this1.p.page) { continue; }

        var link = $('<a>', { href:'#', click:myPageRefresh });
        link.text(String(i));
        if (i<this1.p.page || totalStyle) {
            //if (prevPagesIncluded>0) { pagerPrevTD.append('<span>,&nbsp;</span>'); }
            if (prevPagesIncluded>0) { pagerPrevTD.append('<span>&nbsp;</span>'); }
            pagerPrevTD.append(link);
            prevPagesIncluded++;
        } else {
//             if (nextPagesIncluded>0 || (totalStyle && prevPagesIncluded>0)) { pagerNextTD.append('<span>,&nbsp;</span>'); }
            if (nextPagesIncluded>0 || (totalStyle && prevPagesIncluded>0)) { pagerNextTD.append('<span>&nbsp;</span>'); }
            pagerNextTD.append(link);
            nextPagesIncluded++;
        }
    }
    if (prevPagesIncluded > 0) {
    	$(grid[0].p.pager + '_center td[id^="prev"]').after(pagerPrevTD);
    }
    if (nextPagesIncluded > 0) {
    	$(grid[0].p.pager + '_center td[id^="next"]').before(pagerNextTD);
    }
    $("#dataGridPager_center").width("75%");

    var pgno = $(grid[0]).getGridParam('page');
	var td = document.getElementById("dataGridPager_center");
	var tbl = td.childNodes[0];
	
	$("#sp_1_dataGridPager").css("display", "none");
	
	var pTd = $(".ui-pg-input").parent();
	pTd.css("padding", "0px");
	
	var objInput = $(".ui-pg-input");
	var objSpan = $("#sp_1_dataGridPager");
	objInput.addClass( "pg_no" );
	objInput.attr("readonly", "true");
	objInput.css("background", "none");
	
	pTd.text("");
	pTd.append( objInput );
	pTd.append( objSpan );
	
    /* jqGrid 공통 처리를 위해 삽입 - 2013.01 김정국 */
	$(".ui-jqgrid tr.jqgrow:odd").addClass('myAltRowClass');
	
	/*
	if ( $.browser.msie ) $(".ui-jqgrid-htable th").css("padding", "3px 2px 0px 3px");
	
	if( $.browser.safari ) {
		$(".ui-jqgrid tr.jqgfirstrow td").css("padding", "0px");
		$(".ui-jqgrid tr.jqgfirstrow td").css("border-right-width", "0px");
	}
	*/
	//gridResize( "dataGrid" );
}

function ShowUserInfoSet() {
    // Make sure to only match links to wikipedia with a rel tag
    var strUrl = "../common/userinfo.htm?userId=" ;

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

//새창인 경우, 아닌 경우 처리 2013.06.10 김정국 : 스타리온 용
var isWindowOpen = function() { return "true" == getCookie("isWindowOpen"); };	// 
var winWidth = "880"; //"835";
var winHeight = "600"; 
var isSystemWindow = false;	// true = window, false = layer

//layer로 여는 경우 임.
function OpenLayer(url, title, wid, hei, isTop) {
	//isTop인 경우는 parent에서 호출 아니면 current에서
	//console.log( "TEST START");
	var layer = null;
		
	winWidth = ( wid == winWidth ) ? winWidth : wid; 
	winHeight = ( wid == winHeight ) ? winHeight : hei;
	
	if (isWindowOpen()) {
		if( isSystemWindow ) {
			OpenWindow( url, "", winWidth , winHeight );
		} else {
			winResize = "1", winCenter = "1";
			layer = top.dhtmlwindow.open(
					url, "iframe", url, title, 
					"width=" + winWidth + "px,height=" + winHeight + "px,resize=" + winResize + ",scrolling=1,center=" + winCenter, "recal"
			);
			$(".drag-handle").css("display", "");
			$(".dhtmlwindow").css({"border":"2px solid #000000","padding":"1px"});
		}

//		$(window).bind('resize', function() {
//			layer.setSize( winWidth, winHeight);
//		}).trigger('resize');
	} else {
		$(".dhtmlwindow").remove();
		winWidth = iflist_width(), winHeight = iflist_height(), winResize = "0", winCenter = "0";
		layer = dhtmlwindow.open(
				url, "iframe", url, title, 
				"width=" + winWidth + "px,height=" + winHeight + "px,resize=" + winResize + ",scrolling=1,center=" + winCenter, "recal"
		);
		$(".drag-handle").css("display", "none");
		$(".dhtmlwindow").css({"border":"0px solid #000000","padding":"0px","min-width":"765px","width":iflist_width()+"px"});
		
		$(top.window).bind('resize', function() { setTimeout(function() {
			layer.setSize(iflist_width(), iflist_height() -8);
		}, 0);}).trigger('resize');
	}
	return layer;	
}
 
function pageScroll() {
	if (isiPad()) setTimeout("pageScrollRun()", 0);

	// 현재 pageScroll()이 모든 페이지에 설정되어 있기 때문에 활용함. 스타일 시트 틀어지는 현상 수정. 2017.11.23 jkkim edited
	var g_value = $(".g_value");
	$(g_value).each(function() {
		if( $(this).find("input, select").length == 0 ) {
			$(this).css("padding-top" , "8px")
		}
	})
	
}

function pageScrollRun() {
	$(document.getElementById("pageScroll")).css({
		"position": "absolute",
		"z-index": "1",
		"top": "0",
		"bottom": "0",
		"left": "0",
		"width": iflist_width()+"px",
		"overflow-x": "scroll",
		"overflow-y": "scroll"
	});
	
//	new iScroll('pageScroll',{ 
//		hideScrollbar: false, 
//		snap: true,
//		bounce: false,
//		momentum: false 
//	});
}


//function touchScrolling() {
//	var deviceAgent = navigator.userAgent.toLowerCase();
//	if (deviceAgent.match(/(iphone|ipod|ipad)/)) {
//		$('.drag-contentarea').css("overflow", "hidden");
//		$(".drag-contentarea").css({"overflow":"scroll","-webkit-overflow-scrolling":"touch"});
//	}
//}

//function pageScrollRun() {
//
//	new iScroll(document.getElementById("pageScroll"));
//	
//	$('#pageScroll').css("height", iflist_height()); 
//	$('#pageScroll').css("width", iflist_width()); 
//	$('#pageScroll').css("overflow-x", "scroll");
//	$('#pageScroll').css("overflow-y", "scroll");
//	$(document.body).css("scrollWidth", iflist_width());
//	$(document.body).css("scrollHeight", iflist_height());
//
//	new iScroll('pageScroll', {
//		bounce: false,		// 스크롤 끝에서 반동되는 효과 없애기
//		momentum: false		// 스크롤을 던져지는 효과 없애기
//	});
//	
//	
//	var ifr_hei = $(window.frameElement).parent().css("height") || "0";
//	ifr_hei = ifr_hei.replace(/px/gi, "");
//	
//	//if (navigator.userAgent.match(/iPad/) == null && navigator.userAgent.match(/Mobile|Windows CE|Windows Phone|Opera Mini|POLARIS/) != null){
//	var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");
//	if( isiPad > -1 ) {
//		var head = document.getElementsByTagName("head")[0];
//		var s = document.createElement("meta");
//		s.name = "viewport";
//		s.content = "width=device-width, minimum-scale=0.4, maximum-scale=1, initial-scale=0.4, user-scalable=yes";
//		head.appendChild(s);
//		s = null;
// 
//		//컨텐츠의 크기에 따라서 값이 유동적이어야 함.
//		$('#pageScroll').css("height", (ifr_hei-10) ); 
//		$('#pageScroll').css("overflow-y", "scroll" );
//		//$('#pageScroll').css("border", "1px solid red" );
//
//		if ( document.getElementById("fileupload") ) {
//			var bHei = $(document.body).css( "scrollHeight").replace(/px/, "");
//			var dHei = $('#fileupload').css("height").replace(/px/, "");
//			tHei = Number(bHei) + Number(dHei);
//			//alert( bHei + " / " + dHei + " / " + tHei );
//			$(document.body).css( "scrollHeight", tHei );
//			//alert( $(document.body).css( "height") );
//		}
//
//		$('#pageScroll').css({"width":"100%","height":"100%"});
//		
//		new iScroll('pageScroll', {
//		hScroll: true,
//		hScrollbar: true,
//		vScroll: true,
//		vScrollbar: true,
//			bounce: false,		// 스크롤 끝에서 반동되는 효과 없애기
//			momentum: false		// 스크롤을 던져지는 효과 없애기
//		});
//
//	} else {
//		
//		// 일반 조회 에서는 iScroll 사용하지 않음.
//		new iScroll('pageScroll', { hScrollbar: true, vScrollbar: false, vScroll:true, hScroll: true });
//
//		$('#pageScroll').css("overflow-x", "auto" );
//	//	$('#pageScroll').css("overflow-x", "hidden" );
//		$('#pageScroll').css("overflow-y", "hidden" );
//	}
//}

//function ifrm_width() {
//	var ifrm = top.document.getElementById("if_list");
//	var ifrm_width = $(ifrm).css("width") || ""+$(window).width();
//	ifrm_width = ifrm_width.replace(/px/, "");
//	return Number(ifrm_width);
//}

//function ifrm_height() {
//	var ifrm = top.document.getElementById("if_list");
//	var ifrm_height = $(ifrm).css("height") || ""+$(window).height();
//	ifrm_height = ifrm_height.replace(/px/, "");
//	return Number(ifrm_height);
//}

function setCookie (name, value, expires) {
	document.cookie = name + "=" + escape (value) + "; path=/; expires=" + expires.toGMTString();
}

function getCookie(Name) {
	var search = Name + "=";
	if (document.cookie.length > 0) { // 쿠키가 설정되어 있다면
		offset = document.cookie.indexOf(search);
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

function js_message(prop) {
	var msg = "";
	if (prop !== undefined) {
		if (prop.code !== undefined) {
			if (js_messages[prop.code] !== undefined)
				msg = js_messages[prop.code];
		} 
		
		if (prop.text !== undefined && msg == "")
			msg = prop.text;
	}
	return msg;
}


/**
 * 부모를 가진 창이라면 닫고, 
 * 아니라면 `dhtmlwindow`의 내용을 지운다.
 */
function closeWindow() {
	if (window.opener) {
		self.close();
	} else {
		var elem = window.frameElement.parentElement.parentElement;
		var className = elem.getAttribute("class") || elem.className || '';
		if (className.toLowerCase().indexOf("dhtmlwindow") > -1) {
			elem.outerHTML = "";
		}
	}
}

// BlockUI Processing Message
function waitMsg(msg) {
	var message = msg || "Processing ..... Wait";	
	var tag;
	tag = '<div style="font-size:17px;font-weight: bold;background: #fee188;height: 100%;border: 3px solid #337ab7;padding-top: 24px;">';
	tag += '<img src="/common/jquery/css/validate/loading.gif" /> '+message+' </div>';

	$.blockUI({ 
		message: tag, 
		css: {fontFamily: 'calibri', fontSize: '7pt', fontStyle:'italic'}
	});
	setTimeout('',100);
}

// active-x control submit
function controlSubmit(form) {
	var uploader = document.getElementById("Uploader");
	if (uploader){
		//$("#fileupload_image").remove(); // 다음에디터용 이미지업로드를 제거
		if (uploader.Submit(form)) {
			var loc = uploader.Location;
			if (loc == "") {
				//document.write(uploader.Response);
				//새창 열었을때 response 값이 필요없다. 바로 window 닫아준다.
				try{
        	    	parent.opener.location.reload();
					window.close();
        	    }catch(ex){
					try{
        				window.parent.document.if_list.location.reload();
        				window.parent.ModalDialogClose();
            	    }catch(ex){
    					window.close();
            	    }
				}
			} else {
				document.location.href = loc;
			}
		}
	} else {
		form.submit();
	}
}

function checkDigit(event) {
	if( $(this).val() != "" && $(this).val().match(/[^0-9]/g) != null) {
		$(this).val( $(this).val().replace(/[^0-9]/g, ''));
		$(this).focus();
	}
}
function noData( grid ) {
	var ids = grid.jqGrid('getDataIDs');
	var emptyMsgDiv = $("<div style='width:100%;height:100%;position:relative;'><div style='position:absolute;top:50%;margin-top:-5em;width:100%;text-align:center;'>등록된 자료가 없습니다.</div></div>");

    if (ids.length == 0) {
    	grid.hide();
    	emptyMsgDiv.show();
    } else {
    	grid.show();
    	emptyMsgDiv.hide();
    }
}

function editorResize( Editor ) {	//override용
};

 
function ShowUserInfoSet() {
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
   				classes: 'ui-tooltip-bootstrap ui-tooltip-shadow ui-tooltip-rounded maninfow'
//				width:	'350'
   			}
   		});
   	})

   	// Make sure it doesn't follow the link when we click it
	.click(function(event) { event.preventDefault(); });
}

//rel 속성에 read,down,edit 이 설정되어야 함.


function ViewHistorySet() {
    // Make sure to only match links to wikipedia with a rel tag
  	$('.history').each(function()
   {
  		var tmp = $(this).attr('rel').split("^");
  		var act = tmp[0];
  		var id = tmp[1];
  		if ( tmp.length > 2) {
  			var bbsid=tmp[2];
  		}
  		
  		switch(act)
  	    {
  	    	case "read":
  	    		if ( tmp.length > 2 ) {
  	    			surl = "./read_history.htm?bbsId=" + bbsid + "&docId=" + id;
  	    		} else {
  	    			surl = "./read_history.htm?docId=" + id;
  	    		}
  	    		break;
  	    	case "down":
  	    		x = 163;
  	    		if ( tmp.length > 2 ) {
  	    			surl = "./down_history.htm?bbsId=" + bbsid + "&docId=" + id;
  	    		} else {
  	    			surl = "./down_history.htm?docId=" + id;
  	    		}
  	    		break;
  	    	case "edit":
  	    		x = 163;
  	    		if ( tmp.length > 2 ) {
  	    			surl = "./edit_history.htm?bbsId=" + bbsid + "&docId=" + id;
  	    		} else {
  	    			surl = "./edit_history.htm?docId=" + id;
  	    		}
  	    		break;
  	    	default :
  	    		return;
  	    		break;
  	    }
  		console.log("history set");
  		
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
  					url: surl // Use the rel attribute of each element for the url to load
  				},
  				title: {
  					text: 'History - ' + $(this).text(), // Give the tooltip a title using each elements text
  					//text: 'Man Infomation', // Give the tooltip a title using each elements text
  					button: true
  				}
  			},
  			position: {
  				at: 'right center', // Position the tooltip above the link
  				my: 'left center',
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
//  				classes: 'ui-tooltip-bootstrap ui-tooltip-shadow ui-tooltip-rounded historyw'
  				classes: 'qtip-bootstrap qtip-shadow qtip-rounded historyw'
  			}
  		});
  	})

  	// Make sure it doesn't follow the link when we click it
	.click(function(event) { event.preventDefault(); });
}


function closeDhtmlModalWindow() {
	if (window.modalwindow)
		window.modalwindow.hide();
}


var isiPad = function() { return navigator.userAgent.toLowerCase().indexOf("ipad") > -1; };

function consolelog(msg) {
	$(top.document.getElementById("log")).prepend("<span>" + msg + "</span><br>");
}

function iflist_width(isIfList) {
	var width = $(window).width();
	if (isIfList) {
		var iflist = top.document.getElementById("if_list");
		if (iflist != null) width = $(top.window).width() -226;
		if (width < 763) width = 763;
	}
//	consolelog("width:" + width);
	return width;
}

function iflist_height(isIfList) {
	var height = $(window).height();
	if (isIfList) {
		var iflist = top.document.getElementById("if_list");
		var hasXScrollBar = $(top.document).find('body').width() < 970;
		if (iflist != null) height = $(top.window).height() -((isiPad())?127:((hasXScrollBar)?144:127));
	}
//	consolelog(hasXScrollBar + ", height:" + height);
	return height;
}


//각 에디터의 document 를 리턴함 : 에디터 없으면 기본 document 를 리턴.
function getEditorDom() {
	var editorName = getEditorName();
	var d = document;
	
	if ( editorName == "twe" ) {
		d = twe.GetDOM();
	} else if ( editorName == "xfree" ) {
		d = xfe.getDom();
	} else if ( editorName == "daum" ) {
		// 에디터 다중 사용시 정리가 필요함.
		var ifrm = document.getElementById("tx_canvas_wysiwyg0");

		if ( !ifrm ) {
			ifrm = document.getElementById("tx_canvas_wysiwyg1");
		}
		
		var y=(ifrm.contentWindow || ifrm.contentDocument);
		d = y.document;
	} else if ( editorName == "crosseditor" ) {
		d = CrossEditor.GetEditorDocument('doc');
	}

	return d;
}

function getEditorObj() {
	var tagfreeEditor = document.getElementById("twe"); // tagfree
	var daumEditor = document.getElementById("tx_canvas_wysiwyg0"); // daum
	//var daumEditor = document.getElementById("txtContent"); // daum
	var daumEditor1 = document.getElementById("txtContent1"); // daum
	var daumEditor2 = document.getElementById("tx_trex_container1");
	try {
		var xfreeEditor = xfe; // xfree
	} catch(e) {
		var xfreeEditor = null;
	};
	
	if (tagfreeEditor) {
		return tagfreeEditor;
	} else if (daumEditor) {
		return Editor; 
		//return daumEditor;
	} else if (daumEditor1) {
		return daumEditor1;
	} else if (daumEditor2) {
		return daumEditor2;
	} else if (xfreeEditor) {
		return xfreeEditor;
	} else if (CrossEditor) {
		return CrossEditor;
	} else {
		alert( 'getEditorObj() Error - Editor Object Not Found' );
		return "";
	}
}

function getEditorName() {
	var tagfreeEditor = document.getElementById("twe"); // tagfree
	var daumEditor = document.getElementById("tx_canvas_wysiwyg0"); // daum
	//var daumEditor = document.getElementById("txtContent"); // daum
	var daumEditor1 = document.getElementById("txtContent1"); // daum
	var daumEditor2 = document.getElementById("tx_trex_container1");
	
	try {
		var xfreeEditor = xfe; // xfree
	} catch(e) {
		var xfreeEditor = null;
	};
	
	try {
		if (tagfreeEditor) {
			//console.log( "twe");
			return "twe";
		} else if (daumEditor || daumEditor1 || daumEditor2) {
			//console.log( "daum");
			return "daum";
		} else if (xfreeEditor) {
			//console.log( "xfree");
			return "xfree";
		} else if (CrossEditor) {
			return "crosseditor";
		} else {
			//alert( 'getEditorName() Error - Editor Object Not Found' );
			return "";
		}
	} catch(e) {
		return "";
	}
	
}

//Editor 공통함수 : 본문 Html값 가져오는 부분
function geteditordata(i) {
	if ( arguments.length == 0 ) {
		var i = "0";
	}
	
	var editorValue = '';	
	var editorName = getEditorName();
	if ( editorName == "twe" ) {
		var twe = document.getElementById("twe"); // tagfree
		editorValue = twe.MimeValue();
	} else if ( editorName == "xfree" ) {
		editorValue = xfreeEditor.getHtmlValue() || '';
	} else if ( editorName == "daum" ) {
		//alert( 'editorName = ' + editorName + " ==> " + i );
		try { setEditorForm(i); } catch(e) {
			alert( "error !"); 
		}; // daum editor form tag create
		var daumEditor = document.getElementById("txtContent" + i); // txtContent, txtContent1, txtContent2
		editorValue = daumEditor.value || '';
		//alert( "[" + i + "] : " + editorValue );
	} else if ( editorName == "crosseditor" ) {
		/* body style 관련한 이슈로 처리함. 나모 외에도 발생가능성 있음 : 2017.11.24 jkkim */
		//var d = getEditorDom();		
		//$(d).find("body").removeAttr("style");
		
		if ( i == 0 || i == "0" ) {
			editorValue = CrossEditor.GetBodyValue() || '';		//CrossEditor, CrossEditor1, CrossEditor2
			//editorValue = CrossEditor.GetValue() || '';
		} else {
			editorValue = CrossEditor1.GetBodyValue() || '';		//CrossEditor, CrossEditor1, CrossEditor2
			//editorValue = CrossEditor1.GetValue() || '';
		}
	}
	return editorValue;
}

// mail/mail_form.jsp에서만 NAMO_SPLIT 적용합니다.
// ce_split는 나모에서 정의한 규칙으로 해당 아이디값 이후의 데이타에 대해서는 P태그 스타일을 건드리지 않습니다.(원형유지를 위해)
var NAMO_SPLIT = '<p></p><p id="ce_split"></p>';

// Editor 공통함수 : 본문 Html값 에디터에 설정하는 부분 ( 각 폼 페이지에서 필요 시 Override 처리해서 사용할 것. )
// 해당 페이지에 SetEditorData(e) 선언 후, 에디터 본문과 매핑할 값(contents) 설정 후, SetEditorDataLoad(contents) 호출
function SetEditorData(e, contentId) {
	var contents = "";
	if (!contentId) {
		var oUrl = self.location.href.toLowerCase();
		
		if( oUrl.indexOf("approval/formdoc") > -1 ) {			//APPROVAL FORMDOC
			contents = $("#dispbody").val();
		} else if( oUrl.indexOf("club/form") > -1 ) {			//CLUB
			contents = $("#clubMaster.intro").value();
		} else if( oUrl.indexOf("dms/form") > -1 ) {			//DMS
			contents = $("#dms.subContent").value();
		} else if( oUrl.indexOf("mail/config.htm?type=1") > -1 || oUrl.indexOf("/mail/signature_control.htm") > -1) {		//MAIL Config
			contents = $("#dspsignature").html();
		}  else if( oUrl.indexOf("mail/config.htm?type=8") > -1 ) {		//MAIL Config 부재중 자동응답
			contents = $("#msgBody").html();
		} else if( oUrl.indexOf("notification/form") > -1 ) {	//NOTIFICATION
			//contents = $("#notes.body").val();
			contents = document.getElementById("notes.body").value;
		/*
		} else if( oUrl.indexOf("report/form") > -1 ) {			//REPORT
			contents = $("#divContent").html();
		*/
		} else {
			contents = document.getElementById('bbs.content').value;	//bbs default
		}
	} else {
		contents = document.getElementById(contentId).value;
	}
	
	SetEditorDataLoad(e, contents)
}

//에디터에 값을 설정. e는 에디터 개체 넘겨받음.
function SetEditorDataLoad( e, contents, i ) {
	var i = i || "0";
	var oUrl = self.location.href.toLowerCase();
	var editorName = getEditorName();
	
	setTimeout(function(){ 
		if ( e == null ) var e = getEditorObj();
		if ( editorName == "twe" ) {
			//editorObj.HtmlValue = contents;
			e.HtmlValue = contents;
		} else if ( editorName == "xfree" ) {
			//xfe.setHtmlValue(contents);
			e.setHtmlValue(contents);
		} else if ( editorName == "daum" ) {
			e.switchEditor(i);
			e.modify({ content: contents });
		} else if ( editorName == "crosseditor" ) {
			//e.SetBodyValue(contents);		//e : 에디터 개체인데 넘어오지 못하는 상황임.
			CrossEditor.SetBodyValue(contents);
			
			// 결재에서는 에디터 높이를 키움.
			if( oUrl.indexOf("approval/formdoc") > -1 ) {
				CrossEditor.SetUISize("","950");
				//e.SetUISize("","950");
			}
		}
	}, 90);
}

function popupAutoResize2() {	//팝업리사이징 페이지의 크기만큼 창 사이즈르 조절
	var mh = window.outerHeight - window.innerHeight;
	var h = $(document).height();
	window.resizeTo(window.outerWidth, h+mh);
}

function popupAutoResize3() {//팝업리사이징(에디터 있는 페이지 길이를 화면 길이로 설정)
	var left = (screen.width - window.outerWidth -10) / 2;
	window.moveTo(left, 0);
	window.resizeTo(window.outerWidth, screen.availHeight);	//작업표시줄 제외한 모니터 해상도 세로길이만큼
	
	if(document.location.href.indexOf("mail/read.htm") > -1){	//메일 조회 시 본문 min-height 변경 
		$("#mailHtmlBody").css("min-height", screen.availHeight - 285);
	}
}

//팝업창 전체화면(IE only)
function FullScreen(url, title) {
    window.open(url, title, "fullscreen=yes");
}

//작업표시줄 제외한 전체화면
function FullWindows(url, title){
	winleft = (screen.width - WinWidth) / 2;
	wintop = (screen.height - WinHeight) / 2;
	var WinWidth = screen.availWidth;
	var WinHeight = screen.availHeight;
	var win = window.open(url , title , "scrollbars=yes,width="+ WinWidth +", height="+ WinHeight +", top="+ wintop +", left=" + winleft + "fullscreen=yes"  );
	win.focus() ;
	
	return win;
	/**
	크롬과 사파리에서 창조절을 다시해준다.
	if((navigator.userAgent.indexOf("Chrome") > -1 || navigator.userAgent.indexOf("Safari") > -1)) {
		win.resizeTo(screen.availWidth, screen.availHeight);
	}
	 * */
	
}

// ALL:7 > TRACE:6 > DEBUG:5 > INFO:4 > WARN:3 > ERROR:2 > FATAL:1 > OFF:0
var Logger = {
    level: 7,
    setLevel: function(lv) { this.level = lv; },
    getLevel: function() { return this.level; },
    test: function(message) { try {
        console.log(message);
    } catch(e) {} },
    debug: function(message) { try {
        if (this.level >= 5) {
            console.log(message);
        }
    } catch(e) {} },
    error: function(e) { try {
        if (this.level >= 2) {
            console.log(e.stack);
        }
    } catch(e) {} }
}

/**
 * 최상위 Window 반환 (예: index.htm 창)
 * @param w 현원도우객체
 */
function getTopWindow(w) {
	var o = w.opener, p = w.parent;
	return ((o == w || o == null) && p == w)? t = w: ((o == w || o == null) && p != w)? getTopWindow(p): ((o != w && o != null) && p == w)? getTopWindow(o): null;
}

/**
 * 최상위 Frame 반환
 * @param name 프레임이름
 */
function getTopFrameByName(name) {
	var fs = getTopWindow(window).frames, f = null; for(var i = 0; i < fs.length; i++) if (fs[i].name == name) f = fs[i]; return f;
}

/**
 * 숫자만 입력
 * */
function fnOnlyNum(e){
	
	$(e).val($(e).val().replace(/[^(\.,0-9)]/g,""));	//한글방지
	
	switch(e.keyCode) {
		case $.ui.keyCode.BACKSPACE:
		case $.ui.keyCode.DELETE:
		case $.ui.keyCode.TAB:
		case $.ui.keyCode.HOME:
		case $.ui.keyCode.END:
		case $.ui.keyCode.LEFT:
		case $.ui.keyCode.RIGHT:
		case $.ui.keyCode.PERIOD:	//소수점 허용
		case 110:	//소수점 허용
		return true;
	}
	if (e.ctrlKey) {	// Keyboard Ctrl
		switch(e.keyCode) {
			case 65:	// Keyboard A
			case 67:	// Keyboard C
			case 88:	// Keyboard X
			case 90:	// Keyboard Z
			return true;
		} 
	}
	
	// Keyboard Number
	if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
		return true;
	}
	
	return false;
}

//커뮤니티 사용가능 권한 확인
function fnClubUsed(clubId){
	var isPass = Boolean(true);
	//커뮤니티 멤버 확인
	$.ajax({
		url : "/common/getClubUserType.htm",
		type : "post",
		dataType : "json",
		async : false,
		data : {
		  "clubId" : clubId
		},
		success : function(data, status, xhr) {
			if(data.userType == "A" || data.userType == "M"){
				isPass = true;
			}else if(data.userType == "0"){
				isPass = false;
				//alert("가입승인 요청중 입니다.");
				bootbox.alert({
					title : "프로젝트 가입",
					message : "가입 승인 요청중 입니다"
				})

			}else if(data.userType == ""){
				isPass = false;
				bootbox.confirm({
					title : "프로젝트 가입",
					message : "가입되지 않은 프로젝트 입니다.<br/>가입신청 하시겠습니까 ?", 
					
					callback : function(result) {
						if(result) {
							fnClubReqJoin(clubId);
						}
					}
				});

//				if (confirm("가입되지 않은 커뮤니티 입니다.\n가입신청 하시겠습니까?")){
//					fnClubReqJoin(clubId);
//				}
			}
		},
	});
	return isPass;
}

//커뮤니티 가입신청
function fnClubReqJoin(clubId){
	$.ajax({
		url : "/club/request_join.htm",
		type : "post",
		dataType : "json",
		data : {
			"clubId" : clubId
		},
		success : function(data, status, xhr) {
			bootbox.alert({
				title : "가입신청이 완료 되었습니다."
			});
		},
	});
}

function importNodeJs(src, func) {
	$.ajax({
		async:true,
		cache:true,
		type:'GET',
		dataType:'script',
		url:src,
		success: function(){ 
			if (func != null) func(); 
		}
	});
}

function importNodeCss(src) {
	var head = document.getElementsByTagName("head")[0];
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = src;
	head.appendChild(cssNode);
}