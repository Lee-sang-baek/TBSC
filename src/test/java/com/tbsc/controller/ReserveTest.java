package com.tbsc.controller;

import com.tbsc.consultant.Consultant;
import com.tbsc.consultant.ConsultantRepository;
import com.tbsc.jobConsult.JobConsult;
import com.tbsc.jobConsult.JobConsultRepository;
import com.tbsc.jobConsult.certifications.Certifications;
import com.tbsc.jobConsult.certifications.CertificationsRepository;
import com.tbsc.jobConsult.education.Education;
import com.tbsc.jobConsult.education.EducationRepository;
import com.tbsc.jobConsult.experiences.Experiences;
import com.tbsc.jobConsult.experiences.ExperiencesRepository;
import com.tbsc.jobConsult.languages.Languages;
import com.tbsc.jobConsult.languages.LanguagesRepository;
import com.tbsc.member.Member;
import com.tbsc.member.MemberRepository;
import com.tbsc.rental.Rental;
import com.tbsc.rental.RentalRepository;
import com.tbsc.util.ReserveType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.parameters.P;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@SpringBootTest
public class ReserveTest {

    @Autowired
    private ConsultantRepository cr;
    @Autowired
    private JobConsultRepository jr;
    @Autowired
    private RentalRepository rr;
    @Autowired
    private MemberRepository mr;
    @Autowired
    private LanguagesRepository lrr;
    @Autowired
    private ExperiencesRepository err;
    @Autowired
    private CertificationsRepository crr;
    @Autowired
    private EducationRepository er;


    @Test
    void reserve() {
        Optional<Member> op = mr.findById("admin");
        Member member = op.orElse(mr.findAll().get(0));
        for (int i = 1; i <= 10; i++) {
//            List<Member> list = mr.findAll();
//            Collections.shuffle(list);
//            Member member = list.get(0);

            ReserveType rt;
            double r = Math.random();
            if (r < 0.25) {
                rt = ReserveType.APPROVE;
            } else if (r < 0.5) {
                rt = ReserveType.RESERVE;
            } else if (r < 0.75) {
                rt = ReserveType.CHECK;
            } else {
                rt = ReserveType.DENY;
            }
            Consultant consultant = new Consultant();
            consultant.setFile("file" + i);
            consultant.setDifficulties("difficulties" + i);
            consultant.setSupport("support" + i);
            consultant.setSales(i);
            consultant.setType("type" + i);
            consultant.setManagement("management" + i);
            consultant.setCategory("category" + i);
            consultant.setAppDate(LocalDateTime.now());
            consultant.setGender(i % 2 == 0 ? "Male" : "Female");
            consultant.setEmployees(i * 10);
            consultant.setMember(member);
            consultant.setOwnerShip("ownership" + i);
            consultant.setCompName("comp" + i);
            consultant.setStartDate(LocalDate.now());
            consultant.setState(rt);
            cr.save(consultant);
        }

        for (int i = 1; i <= 20; i++) {
//            List<Member> list = mr.findAll();
//            Collections.shuffle(list);
//            Member member = list.get(0);
            ReserveType rt;
            double r = Math.random();
            if (r < 0.25) {
                rt = ReserveType.APPROVE;
            } else if (r < 0.5) {
                rt = ReserveType.RESERVE;
            } else if (r < 0.75) {
                rt = ReserveType.CHECK;
            } else {
                rt = ReserveType.DENY;
            }

            List<Certifications> cl = new ArrayList<>();
            List<Experiences> el = new ArrayList<>();
            List<Languages> ll = new ArrayList<>();
            for (int j = 1; j <= (int) (r * 10); j++) {
                Certifications certifications = new Certifications();
                certifications.setCertificateNumber("certificate" + j);
                certifications.setName("name" + j);
                certifications.setAcquisitionDate(LocalDate.now());
                cl.add(certifications);

                Experiences experiences = new Experiences();
                experiences.setType("type" + j);
                experiences.setStartDate(LocalDate.now());
                experiences.setDuties("duties" + j);
                experiences.setEndDate(LocalDate.now());
                experiences.setOrganization("organization" + j);
                el.add(experiences);

                Languages languages = new Languages();
                languages.setLanguage("language" + j);
                languages.setWriting("level" + j);
                languages.setConversation("level" + j);
                languages.setCertifiedExam("exam" + j);
                ll.add(languages);
            }

            Education education = new Education();
            JobConsult jobConsult = new JobConsult();

            education.setAcademicStatus("status" + i);
            education.setMajor("major" + i);
            education.setAdmissionDate(LocalDate.now());
            education.setGraduationDate(LocalDate.now());
            education.setSchoolName("school" + i);

            er.save(education);

            jobConsult.setMember(member);
            jobConsult.setSelfIntroduction("self" + i);
            jobConsult.setOther("other" + i);
            jobConsult.setIndustry("industry" + i);
            jobConsult.setCategory("category" + i);
            jobConsult.setState(rt);
            jobConsult.setDate(LocalDateTime.now());
            jobConsult.setLanguages(ll);
            jobConsult.setCertifications(cl);
            jobConsult.setExperiences(el);

            jobConsult.setEducation(education);
            jr.save(jobConsult);

            JobConsult sj = jr.findAll().get(i - 1);
            Education se = er.findAll().get(i - 1);
            se.setJobConsult(sj);
            er.save(se);

            ll.forEach(e -> {
                e.setJobConsult(sj);
                lrr.save(e);
            });
            cl.forEach(e -> {
                e.setJobConsult(sj);
                crr.save(e);
            });
            el.forEach(e -> {
                e.setJobConsult(sj);
                err.save(e);
            });
        }

        for (int i = 1; i <= 30; i++) {
//            List<Member> list = mr.findAll();
//            Collections.shuffle(list);
//            Member member = list.get(0);
            ReserveType rt;
            double r = Math.random();
            if (r < 0.25) {
                rt = ReserveType.APPROVE;
            } else if (r < 0.5) {
                rt = ReserveType.RESERVE;
            } else if (r < 0.75) {
                rt = ReserveType.CHECK;
            } else {
                rt = ReserveType.DENY;
            }

            Rental rental = new Rental();
            rental.setMember(member);
            rental.setStartDate(LocalDateTime.now());
            rental.setGender(i % 2 == 0 ? "Male" : "Female");
            rental.setState(rt);
            rental.setEndDate(LocalDateTime.now());
            rental.setCompName("comp" + i);
            rental.setPerson(i * 2);
            rental.setPlace("place" + i);
            rental.setPrepare("prepare" + i);
            rental.setPurpose("purpose" + i);
            rr.save(rental);
        }
    }

    @Test
    void drop() {
        cr.deleteAll();
        jr.deleteAll();
        rr.deleteAll();
        er.deleteAll();
        err.deleteAll();
        lrr.deleteAll();
        crr.deleteAll();
    }
}
