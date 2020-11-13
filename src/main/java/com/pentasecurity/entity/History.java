package com.pentasecurity.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;

@Entity
@Getter
public class History {
	
	@Id
	private Integer historyId;
	
	private String dataId;
	private String fromType;
	private String fromId;
	private String toType;
	private String toId;
	private String trace;
	private String receivedTime;
	
	
	public History() {
		
	}
	public History(Integer historyId, String dataId, String fromType, String fromId, String toType, String toId, String trace, String receivedTime) {
		this.historyId = historyId;
		this.dataId = dataId;
		this.fromType = fromType;
		this.fromId = fromId;
		this.toType = toType;
		this.toId = toId;
		this.trace = trace;
		this.receivedTime = receivedTime;
		
	}

}
