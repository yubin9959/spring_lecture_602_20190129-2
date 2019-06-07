<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<button type="button" onclick="send_jsonData_go();" >json Data </button>
	
	<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
	<script>
		var json={
			firstName : "kim",
			lastName : "mama"
		};
		
		function send_jsonData_go(){
			$.ajax({   // $(input[name="id"]) 
				url:"<%=request.getContextPath()%>/rs/receiveJson",
				type: "get",
				data: json, //Json
				success: function(data){
					if(data=="Success"){
						alert("전송을 완료했습니다.");
					}else{
						alert("전송을 실패했습니다.");
					}					
				},
				error: function(error){
					alert("서버오류로 인해 전송이 불가합니다.");
				}			
			});
		}
	</script>
</body>
</html>