package com.tbsc.centerNews;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CenterNewsRepository extends JpaRepository<CenterNews, Integer> {
    List<CenterNews> findByTitleContaining(String title);
}
