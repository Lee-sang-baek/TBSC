package com.tbsc.management.popup;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PopupService {

    private final PopupRepository popupRepository;

    public Page<Popup> getList(Pageable pageable) {
        return popupRepository.findAll(pageable);
    }
}
