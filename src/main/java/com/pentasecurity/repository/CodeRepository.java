package com.pentasecurity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pentasecurity.entity.Code;

public interface CodeRepository extends JpaRepository<Code, String> {

}
