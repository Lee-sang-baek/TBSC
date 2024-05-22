package com.tbsc.pressrelease;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PressReleaseRepository extends JpaRepository<PressRelease, Integer> {
    List<PressRelease> findByTitleContaining(String title);
}
