/**
 * Name : Organizations
 * description : 조직 선택 모듈
 * -------------------Change History---------------------
 * Modification Log : 
 * Date          Programmer  Description
 * 2013. 3. 18.  LSH         CREATE
 * ------------------------------------------------------
 */
var Organizations = {
		ORGUNIT_TYPE_USER: 'P',			//사용자
		ORGUNIT_TYPE_DEPARTMENT: 'D',	//부서
		Data: [],
		Item: [							//데이터형식
				"type",
				"userid",
				"username",
				"dpid",
				"dpname",
				"includeSub",
				"upname",
				"sabun",
				"loginid",
				"emailid",
				"tel",
				"cellTel",
				"dporder",
				"topdpname",
				"uporder"
		],
		onlyuser: 0,	//사용자만 선택할지 여부
		onlydept: 0,	//부서만 선택할지 여부
		multiple: 0,	//다중선택 여부
		setItem: function(item) { this.Item = item; },
		setOnlyuser: function(onlyuser) { this.onlyuser = onlyuser; },
		setOnlydept: function(onlydept) { this.onlydept = onlydept; },
		setMultiple: function(multiple) { this.multiple = multiple; },
		//@param arr : 조직 선택기를 사용할 요소(SELECT TAG)의 ID배열, ex: ["person","dept"]
		formatAddressList: function(arr) {
			for(var i = 0; i < arr.length; i++) {
				this.formatAddress(arr[i]);
			}
		},
		//@param arr : 조직 선택기를 사용할 요소(SELECT TAG)의 ID
		formatAddress: function(str) {
			var elem = document.getElementById(str);
			this.multiple = ($(elem).attr("multiple"))?1:0; 
			this.Data[str] = new Array();
			for(var i = 0; i < elem.length; i++) {
				elem[i].selected = true;
				var objData = this.parse(elem[i].value);
				if (objData != null) {
					this.Data[str].push(objData);
				}
			}
			this.setViewDiv(elem, this.Data[str]);
		},
		setUserFunc: function(func) { this.userFunc = func; },
		userFunc: function(str, data) {},
		setOpenFunc: function(func) { this.open = func; },
		open: function(str, titleStr, captionStr, onlyuserNum, onlydeptNum, multipleNum) {
			var that = this;
			var elem = document.getElementById(str);
			var title = titleStr || "NEK주소록";
			var caption = captionStr || "공유자를 선택하세요";
			this.onlyuser = onlyuserNum || 0;
			this.onlydept = onlydeptNum || 0;
			this.multiple = multipleNum || 0;

			var url = "/common/organization_selector.htm?";
			var par = new Array();
				par.push("title=" + encodeURI(title));
				par.push("caption=" + encodeURI(caption));
				par.push("onlyuser=" + this.onlyuser);
				par.push("onlydept=" + this.onlydept);
				par.push("multiple=" + this.multiple);

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
				showIframeModal(url+par.join("&"), '주소록', '490', '410');
			} catch (e) {
				if_main.modalwindow = if_main.dhtmlmodal.open(
						url, "iframe", url+par.join("&"), title,
						"width="+winWidth+",height=410px,center=1,resize=1,scrolling=0", "recal"
				);
			}
		},
		refreshSelect: function(elem, datas) {
			var select = elem;
			if (select != null) {
				while(select.options.length > 0) {
					select.options.remove(0);
				}
				for(var i = 0; i < datas.length; i++) {
					var data = datas[i];
					var option = document.createElement("OPTION");
					option.text = data.text;
					option.value = data.value;
					if (this.isViewDiv(elem)) option.selected = true;
					select.options.add(option);
				}
				if (this.isViewDiv(elem)) this.setViewDiv(elem, datas);
	
				var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");
				if (isiPad > -1 ) {
					try { ipadSelectSync(); } catch(e) {}
				}
			}
		},
		isViewDiv: function(elem) {
			var is = false;
			var select = $(elem);
			var id = select.attr("id") + "_view";
			if (select.next().attr("id") == id) {
				return true;
			}
			return is;
		},
		setViewDiv: function(elem, datas) {
			var viewDiv = this.getViewDiv(elem);
			var users = [];
			for (var i = 0; i < datas.length; i++) {
				var data = datas[i];
				users.push("<span style='white-space:nowrap;display:inline-block;'>"+data.text+"</span>");
			}
			if (users.length == 0) users.push("&nbsp;");
			viewDiv.html(users.join("，"));
		},
		setViewDivStyle: function(func) { this.getViewDivStyle = func; },
		getViewDivStyle: function(div) {},
		getViewDiv: function(elem) {
			var select = $(elem);
			var id = select.attr("id") + "_view";
			if (select.next().attr("id") != id) {
				var div = $("<div>&nbsp;</div>");
				div.attr("id", id);
				div.css({
					"color": "#000",
					"font-size": "inherit",
					"font-family": "inherit",
//					"font-size": "12px",
//					"font-family": "\"Helvetica Neue\",Arial,Helvetica,sans-serif",
					"display": "inline-block",
//					"line-height": "160%",
					"border": "1px solid #d5d5d5",
//					"border": "1px solid #c8c8c8",
					"padding": "4px 0px 4px 4px",
//					"padding": "1px 0px 0px 6px",
					"cursor": "pointer",
					"word-break": "break-all",
					"word-wrap": "break-word"
				});
				div.addClass("ui-corner-all w100p");
				div.click(function() { select.dblclick(); });
				div.hover(function() { $(this).css("borderColor","#729dd7"); },
						  function() { $(this).css("borderColor","#c8c8c8"); });
				this.getViewDivStyle(div);
				select.after(div);
			}
			return select.next();
		},
		add: function(str, data, isRefresh, subtopdpid) {
			var elem = document.getElementById(str);
			
			if (this.Data[str] == null) this.Data[str] = [];
			if (!this.multiple) this.removeAll(str);
			
			if (data == null) data = $("#treeCtnr").dynatree("getActiveNode").data.address;
			if (data == null) { alert("추가할 대상을 선택하세요!"); return; }
			if (this.get(str, data) != null) { alert("이미 선택되었습니다."); return; }
			if (this.onlyuser == 1 && data.type == this.ORGUNIT_TYPE_DEPARTMENT) return;
			if (this.onlydept == 1 && data.type == this.ORGUNIT_TYPE_USER) return;
			 
			this.Data[str].push(this.convert(data));
			this.Data[str][0].subtopdpid = subtopdpid;
			if (isRefresh) this.refreshSelect(elem, this.Data[str]);
		},		
		remove: function(str) {
			var elem = document.getElementById(str);
			var isRefresh = false;
			for(var i = elem.options.length - 1; i >= 0; i--) {
				if (elem.options[i].selected) {
					this.recast(str, elem.options[i].value);
					isRefresh = true;
				}
			}
			if (isRefresh) this.refreshSelect(elem, this.Data[str]);
		},
		removeAll: function(str) {
			this.Data[str] = [];
		},
		recast: function(str, value) {
			var array = [];
			var datas = this.Data[str];
			for(var i = 0; i < datas.length; i++) {
				var data = datas[i];
				if (data.value != value) array.push(data);
			}
			this.Data[str] = array;
		},
		get: function(str, data) {
			var ret = null;
			var datas = this.Data[str];
			for(var i = 0; i < datas.length; i++) {
				if (this.id(data) == datas[i].id) { 
					ret = data; break;
				}
			}
			return ret;
		},
		convert: function(data) {
			var objData = new Object();
			for(var i = 0; i < this.Item.length; i++) {
				objData[this.Item[i]] = data[this.Item[i]];
			}
			if (objData.includeSub == null && objData.type == this.ORGUNIT_TYPE_DEPARTMENT && this.multiple) {
				if (confirm(objData.dpname + " 의 예하부서를 포함하시겠습니까?")) {
					objData.includeSub = true;
				} else objData.includeSub = false;
			}
			objData.id = this.id(objData);
			objData.text = this.text(objData);
			objData.value = this.value(objData);
		
			return objData;
		},
		parse: function(strData) {
			if (strData == null) return null;
			var objData = new Object();
			var arrData = strData.split(':');
			for(var i = 0; i < this.Item.length; i++) {
				objData[this.Item[i]] = arrData[i];
			}
			objData.id = this.id(objData);
			objData.text = this.text(objData);
			objData.value = this.value(objData);
			return objData;
		},
		id: function(data) {
			var optId = "";
			switch(data.type) {
				case this.ORGUNIT_TYPE_USER: 
					optId = data.type + ":"  +data.userid; break;
				case this.ORGUNIT_TYPE_DEPARTMENT:
					optId = data.type + ":" + data.dpid; break;
			}
			return optId;
		},
		setText: function(fun) { this.text = fun; },
		text: function(data) {
			var optText = "";
			switch(data.type) {
				case this.ORGUNIT_TYPE_USER: 
					optText = data.username + "/" + data.upname + "/" + data.dpname; break;
				case this.ORGUNIT_TYPE_DEPARTMENT:
					optText = data.dpname;
					if (this.multiple) optText += ((data.includeSub + "" == "true")? "[+]": "[-]"); 
					break;
			}
			return optText;
		},
		value: function(data) {
			var optValue = "";
			for(var i = 0; i < this.Item.length; i++) {
				optValue += ((i)?":":"") + data[this.Item[i]];
			}
			return optValue;
		},
		isWindow: (top == window),
		isFrame: (window.frameElement != null),
		isOpener: (window.opener != null),
		isParent: (window.parent != null),
		getFrameByName: function(name) {
			var f_window = null;
			var f_windows = [];
			if (this.isOpener && this.isWindow) {
				f_windows = window.opener.frames;
			} else if (this.isParent && this.isFrame) {
				f_windows = window.top.frames;
			}
			for(var i = 0; i < f_windows.length; i++) {
				try {
					if (f_windows[i].name == name) f_window = f_windows[i];
				} catch (e) {}
			}
			return f_window;
		}
};

function desc(tmpA, tmpB) {		//직급순서 정렬
	var intA = parseInt(tmpA.uporder);
	var intB = parseInt(tmpB.uporder);
	return (intA > intB)? 1: (intA < intB)? -1: 0;
}
