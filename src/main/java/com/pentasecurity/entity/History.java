package com.pentasecurity.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.Getter;

@Entity
@Getter
public class History {
	
	@Id
	private Integer historyId;
	
	@Column(name="data_id")
	private String dataId;
	private String fromType;
	private String fromId;
	private String toType;
	private String toId;
	private String trace;
	private String receivedTime;
	
	@OneToOne(cascade=(CascadeType.ALL))
	@JoinColumn(name="data_id", insertable=false, updatable=false)
	private Master master;
	
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
	@Override
	public String toString() {
		return "History [historyId=" + historyId + ", dataId=" + dataId + ", fromType=" + fromType + ", fromId="
				+ fromId + ", toType=" + toType + ", toId=" + toId + ", trace=" + trace + ", receivedTime="
				+ receivedTime + "]";
	}

}
