
/**
 * 현재창의 종류를 문자열로 반환
 * @returns windowType 종류 (Popup:팝업창, Home:모듈홈, iFrame:아이프레임창, MainPage:메인창)
 */
function getWindowType() {
	var windowType = "";
	if (window.opener != null) {
		windowType = "Popup";
	} else if (window.frameElement != null && window.frameElement.src.indexOf("/home.") > -1) {
		windowType = "Home";
	} else if (window.frameElement != null) {
		windowType = "iFrame";
	} else if (window.location.href.indexOf("index.htm") > -1) {
		windowType = "MainPage";
	}
	return windowType;
}

/**
 * 부모창을 반환
 * @returns window
 */
function getParentWindow() {
	var windowType = getWindowType();
	var parent = null;
	if (windowType == "Popup") {
		parent = window.opener;
	} else if (windowType == "iFrame") {
		parent = window.parent;
	} else {
		parent = window.parent;
	}
	return parent;
}

/**
 * 모듈의 종류를 반환
 * @returns {String}
 */
function getModuleType() {
	var moduleType = "";
	var referer = getReferer();
	var refererUrlParams = getStrUrlParam(referer);
	var workType = getStrUrlParam(referer)["WORKTYPE"];

	if (referer.indexOf("/MAIL/") > -1) {
		moduleType = "MAIL";
	} else if (referer.indexOf("/APPROVAL/") > -1) {
		moduleType = "APPR";
	} else if (referer.indexOf("/SCHEDULE/") > -1) {
		moduleType = "SCHE";
	} else if (referer.indexOf("/DMS/") > -1) {
		moduleType = "DMS";
	} else if (referer.indexOf("/TODO/") > -1) {
		moduleType = "TODO";
	} else if (referer.indexOf("/PROPOSAL/") > -1) {
		moduleType = "PROP";
	} else if (referer.indexOf("/POLL/") > -1) {
		moduleType = "POLL";
	} else if (referer.indexOf("/PROJECT/") > -1 || (referer.indexOf("/BBS/") > -1 && workType == "2")) {
		moduleType = "PROJ";
	} else if (referer.indexOf("/CLUB/") > -1 || (referer.indexOf("/BBS/") > -1 && workType == "3")) {
		moduleType = "CLUB";
	} else if (referer.indexOf("/BBS/") > -1) {
		moduleType = "BBS";
	}
	
	return moduleType;
}

/**
 * 이전 페이지의 주소를 반환
 * @returns
 */
function getReferer() {
	var referer = document.referrer;
	if (referer.indexOf("index.htm") > -1) {
		referer = document.location.href;
	}
	return referer.toUpperCase();
}

/**
 * 모듈의 위젯아이디를 반환
 * @param modulesWidgetJson 위젯데이터
 * @returns {String}
 */
function getModuleWidgetId(modulesWidgetJson) {
	var moduleWidgetId = "";
	
	var moduleType = getModuleType();
	var referer = getReferer();
	var refererUrlParams = getStrUrlParam(referer);
	var bbsId = refererUrlParams["BBSID"];
	
	if (modulesWidgetJson != undefined) {
		for(var i = 0; i < modulesWidgetJson.length; i++) {
			var mw = modulesWidgetJson[i];
			
			if (moduleType == "MAIL") {
				if (mw.url.indexOf("/MAIL/WIDGET.HTM") > -1) {
					moduleWidgetId = mw.id;
					moduleWidgetTitle = mw.title;
				}
			} else if (moduleType == "APPR") {
				if (mw.url.indexOf("/APPROVAL/WIDGET.HTM") > -1) {
					moduleWidgetId = mw.id;
					moduleWidgetTitle = mw.title;
				}
			} else if (moduleType == "DMS") {
				if (mw.url.indexOf("/DMS/WIDGET.HTM") > -1) {
					moduleWidgetId = mw.id;
					moduleWidgetTitle = mw.title;
				}
			} else if (moduleType == "BBS") {
				if (mw.url.indexOf("BBSID="+bbsId) > -1) {
					moduleWidgetId = mw.id;
					moduleWidgetTitle = mw.title;
				}
			} else if (moduleType == "TODO") {
				if (mw.url.indexOf("/TODO/WIDGET.HTM") > -1) {
					moduleWidgetId = mw.id;
					moduleWidgetTitle = mw.title;
				}
			} else if (moduleType == "POLL") {
				if (mw.url.indexOf("/POLL/WIDGET.HTM") > -1) {
					moduleWidgetId = mw.id;
					moduleWidgetTitle = mw.title;
				}
			} else if (moduleType == "SCHE") {
				if (mw.url.indexOf("/SCHEDULE/WIDGET.HTM") > -1) {
					moduleWidgetId = mw.id;
					moduleWidgetTitle = mw.title;
				}
			}
		}
		
		//메인화면 widget 예외처리
		if (moduleWidgetId == "" && moduleType == "BBS") {
			for(var i = 0; i < modulesWidgetJson.length; i++) {
				var mw = modulesWidgetJson[i];
				if (mw.title.indexOf("최근게시글") > -1) {
					moduleWidgetId = mw.id;
					moduleWidgetTitle = mw.title;
					break;
				}
			}
		}
	}

	return moduleWidgetId;
}

/**
 * URL 문자열에서 파라미터 정보 반환
 */
function getStrUrlParam(url) {
	var params = {};
	if (url.indexOf("?") > -1) {
		params["URI"] = url.split("?")[0];
		var a = url.split("?")[1];
		var b = a.split("&");
		for (var i = 0; i < b.length; i++) {
			var c = b[i].split('=');
	        params[c[0]] = c[1];
		}
	} else {
		params["URI"] = url;
	}
	return params;
}

/**
 * 메인창에 해당 메뉴로 이동하거나 새로고침
 * @param menuType 메뉴타입(TOP: 탑메뉴, SUB: 사이드메뉴)
 * @param menuCode 메뉴코드
 */
function winParentMenu(menuType, menuCode) {
	var parent = getParentWindow();
	var parentType = parent.getWindowType();
	
	if (menuCode != undefined && menuCode != "") {
		if (parentType == "MainPage") {
			if (parent.location.href.indexOf(menuCode) > -1) {
				var if_list = parent.$("#if_list")[0];
				if (if_list != undefined) {
					selfReload(if_list.contentWindow);
				}
			} else {
				if (menuType == "TOP") {
					parent.onTopMenu(menuCode);
				} else if (menuType == "SUB") {
					parent.onSubMenu(menuCode);
				}
			}
		} else {
			parent = parent.getParentWindow();
			parentType = parent.getWindowType();
			if (parentType == "MainPage") {
				if (parent.location.href.indexOf(menuCode) > -1) {
					var if_list = parent.$("#if_list")[0];
					if (if_list != undefined) {
						selfReload(if_list.contentWindow);
					}
				} else {
					if (menuType == "TOP") {
						parent.onTopMenu(menuCode);
					} else if (menuType == "SUB") {
						parent.onSubMenu(menuCode);
					}
				}
			}
		}
	}
}

/**
 * 부모창 새로고침
 */
function winParentReload(parentURL) {
	var parent = getParentWindow();
	if (parentURL != undefined && parentURL != "") {
		winParentLog("winParentReload parent.location.href = "+parentURL);
		parent.location.href = parentURL;
	} else {
		selfReload(parent);
	}
}

/**
 * 지정창의 종류에 따라 새로고침
 * @param self 지정창
 */
function selfReload(self) {
	var selfType = self.getWindowType();
	if (selfType == "MainPage") {
		var moduleWidgetId = getModuleWidgetId(self.modulesWidgetJson);
		winLog(self, "winParentReload["+selfType+"] moduleWidgetId:"+moduleWidgetId);
		if (moduleWidgetId != "") self.$("#"+moduleWidgetId).find(".actionRefresh").click();
	} else if (selfType == "Home") {
		winLog(self, "winParentReload["+selfType+"] location.reload()");
		self.location.reload(); //페이지 새로고침
	} else if (selfType == "iFrame") {
		var dataGrid_old = self.$("#dataGrid");
		var dataGrid = self.$("#grid-table");
		var dataCalendar = self.$("#calendar");
		if (dataGrid_old != null && dataGrid_old.length > 0) {
			winLog(self, "winParentReload["+selfType+"] reloadGrid");
			self.$("#dataGrid").trigger("reloadGrid"); //그리드 새로고침
		} else if (dataGrid != null && dataGrid.length > 0) {
			winLog(self, "winParentReload["+selfType+"] reloadGrid");
			self.$("#grid-table").trigger("reloadGrid"); //그리드 새로고침
		} else if (dataCalendar != null && dataCalendar.length > 0) {
			winLog(self, "winParentReload["+selfType+"] reloadCal");
			self.reloadCal(); //캘린더 새로고침
		} else {
			winLog(self, "winParentReload["+selfType+"] location.reload()");
			self.location.reload(); //페이지 새로고침
		}
	}
}

/**
 * 해당창의 종류에 따라 창닫기
 */
function winClose() {
	var windowType = getWindowType();
	if (windowType == "Popup") {
		winParentLog("winClose["+windowType+"] self.close()"); //log
		self.close();
	} else if (windowType == "iFrame") {
		var elem = window.frameElement.parentElement.parentElement;
		if (elem.className.indexOf("modal-content") > -1) {
			winParentLog("winClose["+windowType+"] elem.outerHTML = '';"); //log
			elem.outerHTML = "";
		}
	} else if (windowType == "MainPage") {
		
	} else {
		winParentLog("winClose["+windowType+"] open.close()"); //log
		window.open('about:blank','_top').close();
	}
}

/**
 * 부모창에 로그출력
 * @param msg 메시지
 */
function winParentLog(msg) {
	try {
		var parent = getParentWindow();
		parent.console.log(msg);
	} catch(e) {}
}

/**
 * 지정창에 로그출력
 * @param win 지정창
 * @param msg 메시지
 */
function winLog(win, msg) {
	try {
		win.console.log(msg);
	} catch(e) {}
}

