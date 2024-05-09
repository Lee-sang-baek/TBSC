package com.tbsc.controller;

import com.tbsc.log.AccessLog;
import com.tbsc.log.AccessLogRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest
public class AccessLogControllerTest {

    @Autowired
    AccessLogRepository ar;

    @Test
    void addLog() {
        AccessLog log = new AccessLog();
        log.setPath("home");
        log.setIpAddress("192.168.2.1");
        log.setMember(null);
        log.setTime(LocalDateTime.now());
        ar.save(log);
    }
}
