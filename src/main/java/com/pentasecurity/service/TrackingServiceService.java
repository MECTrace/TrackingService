package com.pentasecurity.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import com.pentasecurity.entity.History;
import com.pentasecurity.repository.HistoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TrackingServiceService {
	
	private final HistoryRepository historyRepository;
	
	
	public List<History> searchForDataid(String dataId) {
		//List<String> ret = new ArrayList<>();
		List<History> ret = historyRepository.findByDataId(dataId);
		tree(ret);
		
		return ret;
	}
	
	public List<History> searchAll() {
		//List<String> ret = new ArrayList<>();
		List<History> ret = historyRepository.findAll();
		
		return ret;
	}
	private String tree(List<History> history) {
		String ret ="";
		
		History start;
		Queue<History> queue = new LinkedList<>();
		
		Map<String, JSONObject> treeNode = new HashMap<>();
		Map<String, JSONArray> treeArray = new HashMap<>();
		
		Set<String> nodeName = new HashSet<>();
		History firstNode = null;
		
		for(History member : history) {
			if(member.getTrace().equals("new")){
				queue.add(member);
				firstNode = member;
				//break;
			}
			nodeName.add(member.getFromId());
			nodeName.add(member.getToId());
		}
		
		List<String> memberList = new ArrayList<>(nodeName);
		
		Set<String> visited = new HashSet<>();
		
		
		
		for(String member: memberList) {
			JSONObject node = new JSONObject();
			JSONArray child = new JSONArray();
			
			node.put("name", member);
			
			treeNode.put(member, node);
			treeArray.put(member, child);
			
		}
		
		
		for(History path: history) {
			String startName = path.getFromId();
			String endName = path.getToId();
			JSONObject nodeObejct = treeNode.get(startName);
			JSONObject edgeObject = treeNode.get(endName);
			JSONArray nodeArray = treeArray.get(startName);
			
			nodeArray.add(edgeObject);
			nodeObejct.put("children", nodeArray);
		}
		
		
		
		/*
		for(History startMember: history) {
			
			
			String startName = startMember.getFromId();
			JSONObject nodeObejct = treeNode.get(startName);
			JSONArray nodeArray = treeArray.get(startName);
			
			//visited.add(startName);
			
			for(History member: history) {
				if(member.getFromId().equals(startName) && !visited.contains(member.getToId())) {
					String edgeName = member.getToId();
					nodeArray.add(treeNode.get(edgeName));
			
				}
			}
			if(!nodeArray.isEmpty()) {
				nodeObejct.put("children", nodeArray);
			}	
		}
		*/
		System.out.println(treeNode.get(firstNode.getFromId()));
		
		return ret;
	}

}
