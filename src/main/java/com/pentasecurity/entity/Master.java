package com.pentasecurity.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Master {
	
	@Id
	private String dataId;
	
	private String sourceId;
	private String createTime;
	private String dataFormat;
	private String data;
	
	public Master() {
		
	}
	
	public Master(String dataId, String sourceId, String createTime, String dataFormat, String data) {
		this.dataId = dataId;
		this.sourceId = sourceId;
		this.createTime = createTime;
		this.dataFormat = dataFormat;
		this.data = data;
	}

}
