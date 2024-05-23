package com.tbsc.registComp;

import com.tbsc.registcomp.RegistComp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegistCompService {

    @Autowired
    private RegistCompRepository registCompRepository;

    public RegistComp saveRegistComp(RegistComp registComp) {
        return registCompRepository.save(registComp);
    }

    public Optional<RegistComp> getRegistCompById(int id) {
        return registCompRepository.findById(id);
    }

    public List<RegistComp> getAllRegistComps() {
        return registCompRepository.findAll();
    }

    public Optional<RegistComp> updateRegistComp(int id, RegistComp registComp) {
        return registCompRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(registComp.getTitle());
                    existing.setCompImage(registComp.getCompImage());
                    existing.setView(registComp.getView());
                    existing.setDate(registComp.getDate());
                    existing.setContent(registComp.getContent());
                    existing.setMember(registComp.getMember());
                    return registCompRepository.save(existing);
                });
    }

    public boolean deleteRegistComp(int id) {
        return registCompRepository.findById(id)
                .map(registComp -> {
                    registCompRepository.delete(registComp);
                    return true;
                }).orElse(false);
    }
}