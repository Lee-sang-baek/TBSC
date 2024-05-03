package com.tbsc.log;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AccessLogController {

    @Autowired
    private AccessLogService accessLogService;

    @PostMapping("/log/add")
    public void logAccess(HttpServletRequest request) {
        String id = (String) request.getSession().getAttribute("id");
        String path = request.getHeader("Referer");
        String ipAddress = request.getRemoteAddr();
        accessLogService.saveAccessLog(id, path, ipAddress);
    }

    @PostMapping("/log/list")
    public ResponseEntity<List<AccessLog>> getLogList() {
        List<AccessLog> logList = accessLogService.getList();
        return ResponseEntity.ok(logList);
    }
}