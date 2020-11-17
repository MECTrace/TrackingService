package com.pentasecurity.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConditionSearchDto {
	
	String timeStampStart;
	String timeStampEnd;
	String dataFormat;
	String deviceId;
	String deviceModel;
	String edgeId;
	String eventType;
	
	public ConditionSearchDto() {
		
	}

}
