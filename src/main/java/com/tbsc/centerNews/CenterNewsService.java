package com.tbsc.centerNews;

import com.tbsc.centerNews.CenterNews;
import com.tbsc.centerNews.CenterNewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CenterNewsService {

    @Autowired
    private CenterNewsRepository centerNewsRepository;

    public List<CenterNews> getAllCenterNews() {
        return centerNewsRepository.findAll();
    }

    public CenterNews getCenterNewsById(int num) {
        return centerNewsRepository.findById(num).orElse(null);
    }

    public CenterNews saveCenterNews(CenterNews centerNews) {
        return centerNewsRepository.save(centerNews);
    }

    public void deleteCenterNews(int num) {
        centerNewsRepository.deleteById(num);
    }
}
