package com.pentasecurity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pentasecurity.entity.History;

public interface HistoryRepository extends JpaRepository<History, Integer>, HistoryRepositoryCustom{
	
	List<History> findByDataId(String dataId);
	List<History> findByFromIdAndDataId(String fromId, String dataId);
	List<History> findByToIdAndDataId(String fromId, String dataId);
	
	List<History> findAllByDataIdIn(List<String> dataId);
	List<History> findAllByDataIdInAndTrace(List<String> dataId, String trace);

	List<History> findByTrace(String trace);
}
