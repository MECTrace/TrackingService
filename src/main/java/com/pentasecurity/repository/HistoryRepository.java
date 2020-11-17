package com.pentasecurity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pentasecurity.dto.ConditionSearchDto;
import com.pentasecurity.entity.History;

public interface HistoryRepository extends JpaRepository<History, Integer>, HistoryRepositoryCustom{
	
	List<History> findByDataId(String dataId);
	

}
