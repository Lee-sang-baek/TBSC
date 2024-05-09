package com.tbsc.management.popup;

import jakarta.persistence.Entity;
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
    private long num;

    private String image;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private String title;
}
