package com.tbsc.management.popup;

import com.tbsc.management.mainImg.MainImage;
import com.tbsc.management.mainImg.MainImageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class PopupController {

    private final PopupService popupService;

    @GetMapping("/admin/popup/list")
    public ResponseEntity<Page<Popup>> getPopupList(@RequestParam("page") int page,
                                                    @RequestParam("size") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Popup> popups = popupService.getList(pageable);
        return ResponseEntity.ok(popups);
    }

    @PostMapping("/admin/popup/add")
    public ResponseEntity<String> addPopup(@RequestBody PopupDto popupDto) {
        popupService.insertPopup(popupDto);
        return ResponseEntity.ok("팝업 추가 완료");
    }
}
