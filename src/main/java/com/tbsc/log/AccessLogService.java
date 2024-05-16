package com.tbsc.log;

import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccessLogService {

    private final AccessLogRepository accessLogRepository;
    private final MemberRepository memberRepository;

    public void saveAccessLog(String id, String path, String ipAddress) {
        AccessLog accessLog = new AccessLog();
        if (id != null) {
//            Member member = new Member();
//            member.setId(id);
//            accessLog.setMember(member);
            Optional<Member> optionalMember = memberRepository.findById(id);
            optionalMember.ifPresent(accessLog::setMember);
        }
        accessLog.setPath(path);
        accessLog.setTime(LocalDateTime.now());
        accessLog.setIpAddress(ipAddress);

        accessLogRepository.save(accessLog);
    }

    public List<AccessLog> getList() {
        return accessLogRepository.findAll();
    }

    public Page<AccessLog> getList(Pageable pageable, String searchTerm, String category, String menu, LocalDateTime fromDate, LocalDateTime toDate) {
        boolean timeCheck = fromDate != null && toDate != null;
        boolean menuCheck = !menu.equals("all");


        switch (category) {
            case "id":
                if ("비회원".contains(searchTerm) || searchTerm.isEmpty()) {
                    return timeCheck
                            ? (menuCheck
                            ? accessLogRepository.findByTimeBetweenAndMemberIdContainingAndPathContainingOrMemberIdIsNullAndPathContaining(fromDate, toDate, searchTerm, menu, menu, pageable)
                            : accessLogRepository.findByTimeBetweenAndMemberIdContainingOrMemberIdIsNull(fromDate, toDate, searchTerm, pageable))
                            : (menuCheck
                            ? accessLogRepository.findByMemberIdContainingAndPathContainingOrMemberIdIsNullAndPathContaining(searchTerm, menu, menu, pageable)
                            : accessLogRepository.findByMemberIdContainingOrMemberIdIsNull(searchTerm, pageable));
                } else {
                    return timeCheck
                            ? (menuCheck
                            ? accessLogRepository.findByTimeBetweenAndMemberIdContainingAndPathContaining(fromDate, toDate, searchTerm, menu, pageable)
                            : accessLogRepository.findByTimeBetweenAndMemberIdContaining(fromDate, toDate, searchTerm, pageable))
                            : (menuCheck
                            ? accessLogRepository.findByMemberIdContainingAndPathContaining(searchTerm, menu, pageable)
                            : accessLogRepository.findByMemberIdContaining(searchTerm, pageable));
                }

            case "path":
                return timeCheck
                        ? (menuCheck
                        ? accessLogRepository.findByTimeBetweenAndPathContainingAndPathContaining(fromDate, toDate, searchTerm, menu, pageable)
                        : accessLogRepository.findByTimeBetweenAndPathContaining(fromDate, toDate, searchTerm, pageable))
                        : (menuCheck
                        ? accessLogRepository.findByPathContainingAndPathContaining(searchTerm, menu, pageable)
                        : accessLogRepository.findByPathContaining(searchTerm, pageable));

            case "ipAddress":
                return timeCheck
                        ? (menuCheck
                        ? accessLogRepository.findByTimeBetweenAndIpAddressContainingAndPathContaining(fromDate, toDate, searchTerm, menu, pageable)
                        : accessLogRepository.findByTimeBetweenAndIpAddressContaining(fromDate, toDate, searchTerm, pageable))
                        : (menuCheck
                        ? accessLogRepository.findByIpAddressContainingAndPathContaining(searchTerm, menu, pageable)
                        : accessLogRepository.findByIpAddressContaining(searchTerm, pageable));

            case "all":
                Specification<AccessLog> spec = (root, query, cb) -> {
                    Predicate memberIdIsNull = cb.isNull(root.get("member"));
                    Predicate stringFieldSearch = cb.or(
                            root.getModel().getDeclaredSingularAttributes().stream()
                                    .filter(attribute -> attribute.getJavaType().equals(String.class))
                                    .map(attribute -> cb.like(cb.lower(root.get(attribute.getName())), "%" + searchTerm.toLowerCase() + "%"))
                                    .toArray(Predicate[]::new)
                    );

                    if ("비회원".contains(searchTerm)) {
                        return cb.or(memberIdIsNull, stringFieldSearch);
                    } else {
                        return cb.or(stringFieldSearch);
                    }
                };
                return timeCheck
                        ? (menuCheck
                        ? accessLogRepository.findByTimeBetweenAndPathContaining(fromDate, toDate, menu, pageable)
                        : accessLogRepository.findByTimeBetween(fromDate, toDate, pageable))
                        : (menuCheck
                        ? accessLogRepository.findByPathContaining(menu, pageable)
                        : accessLogRepository.findAll(spec, pageable));

            default:
                return accessLogRepository.findAll(pageable);
        }
    }

}