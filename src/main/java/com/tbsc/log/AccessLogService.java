package com.tbsc.log;

import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccessLogService {

    private final AccessLogRepository accessLogRepository;

    public void saveAccessLog(String id, String path, String ipAddress) {
        AccessLog accessLog = new AccessLog();
        if (id != null) {
            Member member = new Member();
            member.setId(id);
            accessLog.setMember(member);
        }
        accessLog.setPath(path);
        accessLog.setTime(LocalDateTime.now());
        accessLog.setIpAddress(ipAddress);

        accessLogRepository.save(accessLog);
    }

    public List<AccessLog> getList() {
        return accessLogRepository.findAll();
    }
}