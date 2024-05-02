package com.tbsc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication // (exclude = SecurityAutoConfiguration.class)
public class TbscApplication {

	public static void main(String[] args) {
		SpringApplication.run(TbscApplication.class, args);
	}

}
