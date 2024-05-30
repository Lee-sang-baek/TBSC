package com.tbsc.management.popup;

import com.tbsc.management.mainImg.MainImage;
import com.tbsc.management.mainImg.MainImageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PopupController {

    private final PopupService popupService;

    @GetMapping("/popup")
    public ResponseEntity<List<Popup>> getListForBanner() {
        return ResponseEntity.ok(popupService.getList());
    }

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

    @GetMapping("/admin/popup/remove")
    public ResponseEntity<String> removePopup(@RequestParam("num") long num) {
        popupService.deletePopup(num);
        return ResponseEntity.ok("팝업 제거 완료");
    }

    @PostMapping("/admin/popup/update")
    public ResponseEntity<String> updatePopup(@RequestBody PopupDto popupDto) {
        popupService.updatePopup(popupDto);
        return ResponseEntity.ok("팝업 수정 완료");
    }
}
