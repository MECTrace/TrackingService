package com.pentasecurity.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;

@Entity
@Getter
public class Master {
	
	@Id
	@Column(name="data_id")
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

	@Override
	public String toString() {
		return "Master [dataId=" + dataId + ", sourceId=" + sourceId + ", createTime=" + createTime + ", dataFormat="
				+ dataFormat + ", data=" + data + "]";
	}

}
