package com.tbsc.sms;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class SMSService {

    @Value("${twilio.account.sid}")
    private String ACCOUNT_SID;

    @Value("${twilio.auth.token}")
    private String AUTH_TOKEN;

    @Value("${twilio.phone.number}")
    private String FROM_NUMBER;

    @PostConstruct
    public void init() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    public String sendSMS(String phoneNumber, String body) {
        String internationalNumber = convertToE164Format(phoneNumber);
        Message message = Message.creator(
                new PhoneNumber(internationalNumber),  // To number
                new PhoneNumber(FROM_NUMBER),  // From number
                body  // SMS body
        ).create();

        return message.getSid();  // Returns the Twilio SMS ID
    }

    private String convertToE164Format(String phoneNumber) {
        if (!phoneNumber.startsWith("+")) {
            phoneNumber = phoneNumber.replaceFirst("^0", "+82");
        }
        return phoneNumber;
    }
}
