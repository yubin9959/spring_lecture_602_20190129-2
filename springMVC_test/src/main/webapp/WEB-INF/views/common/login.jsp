<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>로그인페이지</title>
</head>
<body>
	<form action="login" method="post">
		아이디 : <input type="text" name="id" /><br/>
		패스워드 : <input type="password" name="pwd" /><br/>
		<input type="submit" value="로그인" />
	</form>
</body>
</html>