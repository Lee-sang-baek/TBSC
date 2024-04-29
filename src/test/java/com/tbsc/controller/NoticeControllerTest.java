package com.tbsc.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tbsc.repository.NoticeRepository;
import com.tbsc.entity.Notice;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Date;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(NoticeController.class)
public class NoticeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private NoticeRepository noticeRepository;

    @Test
    public void testCreateNotice() throws Exception {
        // Given
        Notice testNotice = new Notice("Test Title", "Active", 0, "test_image.jpg", new Date(), "test_user");
        when(noticeRepository.save(ArgumentMatchers.any(Notice.class))).thenReturn(testNotice);

        // When
        mockMvc.perform(MockMvcRequestBuilders.post("/notices")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testNotice)))
                // Then
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value(testNotice.getTitle()))
                .andExpect(jsonPath("$.state").value(testNotice.getState()))
                .andExpect(jsonPath("$.view").value(testNotice.getView()))
                .andExpect(jsonPath("$.image").value(testNotice.getImage()))
                .andExpect(jsonPath("$.date").value(testNotice.getDate().toString()))
                .andExpect(jsonPath("$.id").value(testNotice.getId()));

        // Verify that save method of noticeRepository is called once with any Notice object
        verify(noticeRepository, times(1)).save(ArgumentMatchers.any(Notice.class));
    }
}
