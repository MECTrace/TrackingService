package com.pentasecurity.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;

@Entity
@Getter
public class Code {
	
	@Id
	private String code;
	private String codeType;
	private String codeName;
	
	public Code() {
		
	}
	public Code(String code, String codeType, String codeName) {
		this.code = code;
		this.codeType = codeType;
		this.codeName = codeName;
	}
	

}
