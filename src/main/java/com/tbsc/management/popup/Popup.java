package com.tbsc.management.popup;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Popup {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long num;

    private String image;

    private String content;

    private LocalDateTime start;

    private LocalDateTime end;

    private String title;

    public Popup bind(PopupDto dto) {
        if (dto.getImage() != null) {
            setImage(dto.getImage());
        }
        setTitle(dto.getTitle());
        setContent(dto.getContent());
        setStart(dto.getStart());
        setEnd(dto.getEnd());
        return this;
    }
}
