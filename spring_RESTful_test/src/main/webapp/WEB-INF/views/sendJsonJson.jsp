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
	<button type="button" onclick="send_map_go()" >send Map</button>
	
	<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
	
	<script>
	var jsonMap={
			  "sampleList": [
				    {
				      "firstName": "kim0",
				      "lastName": "mimi0"
				    },
				    {
				      "firstName": "kim1",
				      "lastName": "mimi1"
				    },
				    {
				      "firstName": "kim2",
				      "lastName": "mimi2"
				    },
				    {
				      "firstName": "kim3",
				      "lastName": "mimi3"
				    },
				    {
				      "firstName": "kim4",
				      "lastName": "mimi4"
				    }
				  ]
				};

	function send_map_go(){
		$.ajax({
			url:"<%=request.getContextPath()%>/rs/receiveJsonMap",
			type:"post",
			data:JSON.stringify(jsonMap),
			contentType:'application/json',
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






