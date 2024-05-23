package com.tbsc.registComp;

import com.tbsc.registcomp.RegistComp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/registcomp")
public class RegistCompController {

    @Autowired
    private RegistCompService registCompService;

    @Value("${file.upload-dir}\\compinfo")
    private String uploadDir;

    @PostMapping("/create")
    public ResponseEntity<RegistComp> createRegistComp(@RequestBody RegistComp registComp, @RequestPart("file") MultipartFile file) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.write(filePath, file.getBytes());
        registComp.setCompImage(fileName);
        RegistComp savedRegistComp = registCompService.saveRegistComp(registComp);
        return new ResponseEntity<>(savedRegistComp, HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<RegistComp> getRegistCompById(@PathVariable int id) {
        Optional<RegistComp> registComp = registCompService.getRegistCompById(id);
        return registComp.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/allRegistComp")
    public ResponseEntity<List<RegistComp>> getAllRegistComps() {
        List<RegistComp> registComps = registCompService.getAllRegistComps();
        return new ResponseEntity<>(registComps, HttpStatus.OK);
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
