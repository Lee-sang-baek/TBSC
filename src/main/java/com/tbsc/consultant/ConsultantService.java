package com.tbsc.consultant;// File: ConsultantService.java

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tbsc.consultant.Consultant;
import com.tbsc.consultant.ConsultantRepository;

@Service
public class ConsultantService {

    @Autowired
    private ConsultantRepository consultantRepository;

    public Consultant saveConsultant(Consultant consultant) {
        return consultantRepository.save(consultant);
    }
}
