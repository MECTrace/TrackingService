package com.pentasecurity.dto;

import com.pentasecurity.entity.Master;

import lombok.Data;

@Data
public class MasterDto {
	
	
	private String dataId;
	
	private String sourceId;
	private String createTime;
	private String dataFormat;
	
	
	public MasterDto() {
		
	}
	
	public MasterDto(String dataId, String sourceId, String createTime, String dataFormat) {
		this.dataId = dataId;
		this.sourceId = sourceId;
		this.createTime = createTime;
		this.dataFormat = dataFormat;
	}

	public MasterDto(Master master) {
		
		this.dataId = master.getDataId();
		this.createTime = master.getCreateTime();
		this.dataFormat = master.getDataFormat();
		this.sourceId = master.getSourceId();
		
	}

}
