package com.pentasecurity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pentasecurity.entity.Master;

public interface MasterRepository extends JpaRepository<Master, String> {

}
