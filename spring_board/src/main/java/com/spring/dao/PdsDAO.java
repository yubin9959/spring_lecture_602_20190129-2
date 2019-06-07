package com.spring.dao;

import java.sql.SQLException;
import java.util.List;

import com.spring.dto.PdsVO;
import com.spring.request.Criteria;

public interface PdsDAO {
	
	List<PdsVO> selectPdsCriteria(Criteria cri)	throws SQLException;
	int selectPdsCriteriaTotalCount(Criteria cri) throws SQLException;
	
	PdsVO selectPdsByPno(int pno)throws SQLException;
	
	void insertPds(PdsVO pds)throws SQLException;
	void updatePds(PdsVO pds)throws SQLException;
	void deletePds(int pno)throws SQLException;
	
	//viewcnt  증가
	void increaseViewCnt(int pno)throws SQLException;
	
	//pds_seq.nextval 가져오기
	int getSeqNextValue() throws SQLException;
}
