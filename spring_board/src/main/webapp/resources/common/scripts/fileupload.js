
var suffix = 0;
function fileDownloadAll(selectedList) {
	var oChk = selectedList[suffix++];
	if (oChk) {
		location.href = oChk;
		setTimeout(function() { fileDownloadAll(selectedList); }, 1000);
	} else suffix = 0;
}