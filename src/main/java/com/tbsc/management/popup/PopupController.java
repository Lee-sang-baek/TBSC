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
@RequestMapping("/admin/popup")
public class PopupController {

    private final PopupService popupService;

    @GetMapping("/list")
    public ResponseEntity<Page<Popup>> getPopupList(@RequestParam("page") int page,
                                                    @RequestParam("size") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Popup> popups = popupService.getList(pageable);
        return ResponseEntity.ok(popups);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addPopup(@RequestBody PopupDto popupDto) {
        popupService.insertPopup(popupDto);
        return ResponseEntity.ok("팝업 추가 완료");
    }

    @GetMapping("/remove")
    public ResponseEntity<String> removePopup(@RequestParam("num") long num) {
        popupService.deletePopup(num);
        return ResponseEntity.ok("팝업 제거 완료");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updatePopup(@RequestBody PopupDto popupDto) {
        popupService.updatePopup(popupDto);
        return ResponseEntity.ok("팝업 수정 완료");
    }
}
