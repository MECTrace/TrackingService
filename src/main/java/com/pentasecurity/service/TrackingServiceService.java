package com.pentasecurity.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

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
		
		return ret;
	}
	
	public List<History> searchAll() {
		//List<String> ret = new ArrayList<>();
		List<History> ret = historyRepository.findAll();
		tree(ret);
		return ret;
	}
	private String tree(List<History> history) {
		String ret ="";
		
		History start;
		Queue<History> queue = new LinkedList<>();
		
		for(History member : history) {
			if(member.getTrace().equals("new")){
				queue.add(member);
				break;
			}
		}
		
		JSONObject jsonval = new JSONObject();
		
		
		
		while(!queue.isEmpty()) {
			start = queue.poll();
			String startName = start.getFromId();
			jsonval.put("name", startName);
			//for
			
		}
		
		return ret;
	}

}
