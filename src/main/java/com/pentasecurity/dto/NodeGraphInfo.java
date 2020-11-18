package com.pentasecurity.dto;

import org.json.simple.JSONObject;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NodeGraphInfo {
	
	private int index;
	private JSONObject nodeInfo;
	
	
	public NodeGraphInfo() {
		
	}
	
	public NodeGraphInfo(int index, JSONObject nodeInfo) {
		this.index = index;
		this.nodeInfo = nodeInfo;
	}

}
