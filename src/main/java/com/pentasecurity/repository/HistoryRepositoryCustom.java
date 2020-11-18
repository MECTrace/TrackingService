package com.pentasecurity.repository;

import java.util.List;

import com.pentasecurity.dto.ConditionSearchDto;
import com.pentasecurity.entity.History;

public interface HistoryRepositoryCustom {
	//public List<Tuple> findByConditional(ConditionSearchDto dto);
	public List<History> findByConditional(ConditionSearchDto dto);

}
