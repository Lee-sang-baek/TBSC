package com.tbsc.management.popup;

import com.tbsc.management.mainImg.MainImage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PopupController {

    private final PopupService popupService;

    @GetMapping("/popup/list")
    public ResponseEntity<Page<Popup>> getPopupList(@RequestParam("page") int page,
                                                    @RequestParam("size") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Popup> popups = popupService.getList(pageable);
        return ResponseEntity.ok(popups);
    }
}
