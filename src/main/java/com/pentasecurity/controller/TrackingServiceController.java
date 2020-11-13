package com.pentasecurity.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

	@GetMapping("/search/{dataId}")
	private Map<String, Object> searchForDataId(@PathVariable String dataId) {
		Map<String, Object> ret = new HashMap<>();
		
		List<History> temp = trackingServiceService.searchForDataid(dataId);
		//List<History> temp = trackingServiceService.searchAll();
		ret.put("result", temp);

		return ret;

	}

}
