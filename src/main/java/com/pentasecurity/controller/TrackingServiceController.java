package com.pentasecurity.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pentasecurity.dto.ConditionSearchDto;
import com.pentasecurity.dto.HistoryDto;
import com.pentasecurity.dto.MasterDto;
import com.pentasecurity.entity.History;
import com.pentasecurity.service.TrackingServiceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TrackingServiceController {
	
	
	private final TrackingServiceService trackingServiceService; 

	@GetMapping
	private Map<String, Object> index() {

		Map<String, Object> ret = new HashMap<>();
		return ret;
	}
	
	@GetMapping("/download")
	private Map<String, Object> download() {
		Map<String, Object> ret = new HashMap<>();
		
		int count = 0;
		List<String> list = trackingServiceService.downloadDataId();
		
		count = list.size();
		ret.put("count", count);
		ret.put("list", list);
		
		
		return ret;
	}

	@GetMapping("/search/{dataId}")
	private Map<String, Object> searchForDataId(@PathVariable String dataId) {
		Map<String, Object> ret = new HashMap<>();
		
		//List<History> temp = trackingServiceService.searchForDataid(dataId);
		//List<History> temp = trackingServiceService.searchAll();
		ret = getDataIdInfo(dataId);
		//ret.put("result", temp);

		return ret;

	}
	
	@PostMapping("/condition/search")
	//private Map<String, Object> conditionalSearch(@ModelAttribute ConditionSearchDto condition){
	private Map<String, Object> conditionalSearch(@RequestBody ConditionSearchDto condition){
		Map<String, Object> ret = new HashMap<>();
		
		
		List<History> data = trackingServiceService.conditionalSearch(condition);
		List<HistoryDto> list = trackingServiceService.wrappingDto(data);
		ret.put("total", list.size());
		ret.put("result",list);
		ret.put("tree", trackingServiceService.makeTreeForce(data, condition.getDeviceId(), condition.getEdgeId()));
		
		return ret;
	} 
	
	@PostMapping("/upload")
	private Map<String, Object> uploadFile(@RequestParam("file") MultipartFile multipartFile) {
		Map<String, Object> ret = new HashMap<>();
		
		try {
			byte[] bytes = multipartFile.getBytes();
			
			String contents = new String(bytes);
			//System.out.println(contents);
			
			String dataId = trackingServiceService.encryption(contents);
			
			MasterDto masterDto = trackingServiceService.getMasterTable(dataId);
			ret.put("dataId", dataId);
			ret.put("metaData", contents);
			
			
			
			if(masterDto != null) {
				
				ret.put("timestamp", masterDto.getCreateTime());
				ret.put("dataFormat", masterDto.getDataFormat());
				ret.put("deviceId", masterDto.getSourceId());
				ret.put("tree", trackingServiceService.getTree(dataId));
				ret.put("treeForce", trackingServiceService.getTreeForce(dataId));
				
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return ret;
	}
	
	@GetMapping("/nodetrace")
	private Map<String, Object> getNodeTrace(
			@RequestParam(name="nodeName", defaultValue="device-2") String nodeName,
			@RequestParam(name="dataId", defaultValue="1ccd607a3d8ba9fe30bedffbd7df294e40599abaee707440dcd3e0f3845f05b3") String dataId) {
		Map<String, Object> ret = new HashMap<>();
		List<HistoryDto> historyDto = trackingServiceService.getNodeTrace(nodeName, dataId);
		Map<String, Object> tmp = new HashMap<>();
		
		tmp.put("total", historyDto.size());
		tmp.put("detail", historyDto);
		
		
		ret.put("result", tmp);
		
		MasterDto masterDto = trackingServiceService.getMasterTable(dataId);
		ret.put("dataId", dataId);
		
		if(masterDto != null) {
			
			ret.put("timestamp", masterDto.getCreateTime());
			ret.put("dataFormat", masterDto.getDataFormat());
			ret.put("deviceId", masterDto.getSourceId());
			ret.put("tree", trackingServiceService.getTree(dataId));
			ret.put("treeForce", trackingServiceService.getTreeForce(dataId));
			
		}
		
		
		return ret;
	}
	
	
	@GetMapping("/dataformat") 
	private Map<String, Object> getDataFormatList() {
		Map<String, Object> ret = new HashMap<>();
		
		ret.put("result", trackingServiceService.getDataFormatList());
		
		return ret;
	}
	
	private Map<String, Object> getDataIdInfo(String dataId) {
		Map<String, Object> ret = new HashMap<>();
		
		MasterDto masterDto = trackingServiceService.getMasterTable(dataId);
		ret.put("dataId", dataId);
		String contents = trackingServiceService.getData(dataId);
		ret.put("metaData", contents);

		if(masterDto != null) {
			
			ret.put("timestamp", masterDto.getCreateTime());
			ret.put("dataFormat", masterDto.getDataFormat());
			ret.put("deviceId", masterDto.getSourceId());
			ret.put("tree", trackingServiceService.getTree(dataId));
			ret.put("treeForce", trackingServiceService.getTreeForce(dataId));
			
		}
		return ret;
	}

}
