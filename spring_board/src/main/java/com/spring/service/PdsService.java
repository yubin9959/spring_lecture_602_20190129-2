package com.spring.service;

import java.sql.SQLException;
import java.util.Map;

import com.spring.dto.PdsVO;
import com.spring.request.Criteria;

public interface PdsService {
		// 리스트조회
		Map<String, Object> getList(Criteria cri) throws SQLException;

		// 글조회
		PdsVO getPds(int pno) throws SQLException;

		// 글작성
		void regist(PdsVO pds) throws SQLException;

		// 글수정
		void modify(PdsVO pds) throws SQLException;

		// 글삭제
		void remove(int pno) throws SQLException;

		// 글읽기(조회수증가)
		PdsVO read(int pno) throws SQLException;
}
