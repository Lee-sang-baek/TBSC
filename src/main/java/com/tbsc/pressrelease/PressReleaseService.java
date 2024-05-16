package com.tbsc.pressrelease;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PressReleaseService {

    @Autowired
    private PressReleaseRepository pressReleaseRepository;

    public List<PressRelease> getAllPressReleases() {
        return pressReleaseRepository.findAll();
    }

    public PressRelease getPressReleaseById(int num) {
        return pressReleaseRepository.findById(num).orElse(null);
    }

    public PressRelease savePressRelease(PressRelease pressRelease) {
        return pressReleaseRepository.save(pressRelease);
    }

    public void deletePressRelease(int num) {
        pressReleaseRepository.deleteById(num);
    }
}
