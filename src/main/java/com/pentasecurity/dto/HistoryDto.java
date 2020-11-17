package com.pentasecurity.dto;

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
	
	
	public HistoryDto() {
		
	}
	public HistoryDto(String dataId, String fromType, String fromId, String toType, String toId, String trace, String receivedTime) {
		this.dataId = dataId;
		this.fromType = fromType;
		this.fromId = fromId;
		this.toType = toType;
		this.toId = toId;
		this.trace = trace;
		this.receivedTime = receivedTime;
		
	}
}
