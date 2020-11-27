package com.pentasecurity.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMethod;

import com.google.common.base.Predicates;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.ResponseMessage;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
	
	
	private String version;
	private String title;
	
	@Bean
	public Docket api() {
		version ="V1";
		title = "Tracking Service Api " + version;
		
		List<ResponseMessage> responseMessages = new ArrayList<>();
		
		responseMessages.add(new ResponseMessageBuilder()
				.code(200)
				.message("ok")
				.build());
		
		responseMessages.add(new ResponseMessageBuilder()
				.code(404)
				.message("page not found")
				.build());
		
		responseMessages.add(new ResponseMessageBuilder()
				.code(500)
				.message("internal server error")
				.build());
		
		return new Docket(DocumentationType.SWAGGER_2)
				.useDefaultResponseMessages(false)
				.groupName(version)
				.select()
				.apis(RequestHandlerSelectors.any()) 
				.paths(Predicates.not(PathSelectors.regex("/error.*")))
				.build()
				.apiInfo(apiInfo(title,version))
				.globalResponseMessage(RequestMethod.GET, responseMessages)
				.globalResponseMessage(RequestMethod.POST, responseMessages)
				.globalResponseMessage(RequestMethod.DELETE, responseMessages);
			
	}
	private ApiInfo apiInfo(String title, String version) {
		return new ApiInfo(
				title,
				"Swagger API Docs",
				version,
				"www.pentasecurity.com",
				new Contact("Contact Me", "www.pentasecurity.com", "jwmoon@pentasecurity.com"),
				"Licences",
				"www.pentasecurity.com",
				new ArrayList<>());
	}

}
