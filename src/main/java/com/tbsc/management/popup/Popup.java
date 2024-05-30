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

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private String title;

    public Popup bind(PopupDto dto) {
        if (dto.getImage() != null) {
            setImage(dto.getImage());
        }
        setStartDate(LocalDateTime.of(dto.getStartDate(), dto.getStartTime()));
        setEndDate(LocalDateTime.of(dto.getEndDate(), dto.getEndTime()));
        setTitle(dto.getTitle());
        return this;
    }
}
