package com.tbsc;

import com.tbsc.entity.Member;
import com.tbsc.enums.MemberType;
import com.tbsc.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

import java.time.LocalDate;
import java.util.Date;

@SpringBootApplication // (exclude = SecurityAutoConfiguration.class)
public class TbscApplication {

	public static void main(String[] args) {
		SpringApplication.run(TbscApplication.class, args);
	}

}
