package com.tbsc.registComp;

import com.tbsc.rental.Rental;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/registcomp")
public class RegistCompController {

    @Autowired
    private RegistCompService registCompService;

    @PostMapping("/create")
    public ResponseEntity<RegistComp> createRegistComp(@RequestBody RegistCompDto registCompDto) {
        RegistComp savedRegistComp = registCompService.saveRegistComp(registCompDto);
        return new ResponseEntity<>(savedRegistComp, HttpStatus.CREATED);
    }

    @GetMapping("/getComp")
    public ResponseEntity<RegistComp> getRegistCompById(@RequestParam("memberId") String memberId) {
        Optional<RegistComp> registComp = registCompService.getRegistCompById(memberId);
        return registComp.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/allRegistComp")
    public ResponseEntity<List<RegistComp>> getAllRegistComps() {
        List<RegistComp> registComps = registCompService.getAllRegistComps();
        return new ResponseEntity<>(registComps, HttpStatus.OK);
    }

    @GetMapping("/pageable")
    public ResponseEntity<Page<RegistComp>> getRegistComps(@RequestParam("page") Integer page) {
        Pageable pageable = PageRequest.of(page, 5);

        Page<RegistComp> registComps = registCompService.getRegistCompList(pageable);

        if (registComps.getTotalElements() > 0) {
            return ResponseEntity.ok().body(registComps);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<RegistComp> updateRegistComp(@PathVariable int id, @RequestBody RegistComp registComp) {
        Optional<RegistComp> updated = registCompService.updateRegistComp(id, registComp);
        return updated.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRegistComp(@PathVariable int id) {
        boolean deleted = registCompService.deleteRegistComp(id);
        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
