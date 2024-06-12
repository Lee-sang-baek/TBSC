package com.tbsc.log;

import com.tbsc.member.Member;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AccessLogController {

    private final AccessLogService accessLogService;

    @PostMapping("/log/add")
    public void logAccess(HttpServletRequest request, @RequestParam("id") String id) {
        System.out.println("너가문제냐 설마");
//        String path = request.getHeader("Referer");
//        if (path.length() > 100) {
//            System.out.println(path);
//            return;
//        }
//        String ipAddress = request.getRemoteAddr();
//        accessLogService.saveAccessLog(id, path, ipAddress);
    }

//    @PostMapping("/log/list")
//    public ResponseEntity<List<AccessLog>> getLogList() {
//        List<AccessLog> logList = accessLogService.getList();
//        return ResponseEntity.ok(logList);
//    }

    @GetMapping("/admin/log/list") // 로그 정보 리스트 조회 (어드민전용)
    public ResponseEntity<Page<AccessLog>> logList(HttpServletRequest request,
                                                   @RequestParam("page") int page,
                                                   @RequestParam("size") int size,
                                                   @RequestParam("searchTerm") String searchTerm,
                                                   @RequestParam("category") String category,
                                                   @RequestParam("menu") String menu,
                                                   @RequestParam("sort") String sortStr,
                                                   @RequestParam(value = "fromDate", required = false) LocalDateTime fromDate,
                                                   @RequestParam(value = "toDate", required = false) LocalDateTime toDate) {

        Sort sort = sortStr.equals("asc") ? Sort.by(Sort.Direction.ASC, "time") : Sort.by(Sort.Direction.DESC, "time");
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<AccessLog> logs = accessLogService.getList(pageable, searchTerm, category, menu, fromDate, toDate);
        return ResponseEntity.ok(logs);
    }
}