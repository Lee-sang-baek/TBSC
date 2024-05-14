package com.tbsc.management.popup;

import com.tbsc.management.mainImg.MainImage;
import com.tbsc.management.mainImg.MainImageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PopupService {

    private final PopupRepository popupRepository;

    public Page<Popup> getList(Pageable pageable) {
        return popupRepository.findAll(pageable);
    }

    public void insertPopup(PopupDto popupDto) {
        Popup popup = new Popup();
        popup.bind(popupDto);
        popupRepository.save(popup);
    }

    public void deletePopup(long num) {
        popupRepository.deleteById(num);
    }

    public void updatePopup(PopupDto popupDto) {
        Optional<Popup> opPopup = popupRepository.findById(popupDto.getNum());
        if (opPopup.isPresent()) {
            Popup popup = opPopup.get();
            popup.bind(popupDto);
            popupRepository.save(popup);
        }
    }
}
