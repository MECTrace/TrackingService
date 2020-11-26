package com.pentasecurity.dto;

import com.pentasecurity.entity.History;

import lombok.Data;

@Data
public class HistoryDto {

	private String dataId;
	private String fromType;
	private String fromId;
	private String toType;
	private String toId;
	private String trace;
	private String receivedTime;
	
	private String dataFormat;
	
	public HistoryDto() {
		this.dataId = "";
		this.fromType = "";
		this.fromId = "";
		this.toType = "";
		this.toId = "";
		this.trace = "";
		this.receivedTime = "";
		this.dataFormat = "";
		
	}
	public HistoryDto(String dataId, String fromType, String fromId, String toType, String toId, String trace, String receivedTime, String dataFormat) {
		this.dataId = dataId;
		this.fromType = fromType;
		this.fromId = fromId;
		this.toType = toType;
		this.toId = toId;
		this.trace = trace;
		this.receivedTime = receivedTime;
		this.dataFormat = dataFormat;
		
	}
	
	public HistoryDto(History h, String format) {
		
		this.dataId = h.getDataId();
		this.fromId = h.getFromId();
		this.fromType = h.getFromType();
		this.toType = h.getToType();
		this.toId = h.getToId();
		this.trace = h.getTrace();
		this.receivedTime = h.getReceivedTime();
		
		
		this.dataFormat = format;
		
	}
	
	public void setAll(History h, String format) {
		
		this.dataId = h.getDataId();
		this.fromId = h.getFromId();
		this.fromType = h.getFromType();
		this.toType = h.getToType();
		this.toId = h.getToId();
		this.trace = h.getTrace();
		this.receivedTime = h.getReceivedTime();
		
		this.dataFormat = format;
		
	}
}
