package com.tbsc.sms;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SMSController {

    @Autowired
    private SMSService smsService;

    @PostMapping("/send-sms")
    public ResponseEntity<String> sendSMS(@RequestBody SmsRequest smsRequest) {
        try {
            String sid = smsService.sendSMS(smsRequest.getTo(), smsRequest.getBody());
            return ResponseEntity.ok("SMS sent successfully with SID: " + sid);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to send SMS: " + e.getMessage());
        }
    }

    static class SmsRequest {
        private String to;
        private String body;

        public String getTo() {
            return to;
        }

        public void setTo(String to) {
            this.to = to;
        }

        public String getBody() {
            return body;
        }

        public void setBody(String body) {
            this.body = body;
        }
    }
}
