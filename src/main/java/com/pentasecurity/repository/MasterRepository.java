package com.pentasecurity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pentasecurity.entity.Master;

public interface MasterRepository extends JpaRepository<Master, String> {
	List<Master> findAllByDataIdIn(List<String> dataId);
}
