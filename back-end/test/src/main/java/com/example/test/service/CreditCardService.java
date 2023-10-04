package com.example.test.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.springframework.stereotype.Service;

import com.example.test.model.Payment;

@Service
public class CreditCardService {

    public Boolean validateCardNumber(String cardNumber) {
        int cardDigitsAmount = cardNumber.length();

        int digitsSum = 0;
        boolean isSecond = false;
        for (int i = cardDigitsAmount - 1; i >= 0; i--) {
            int d = cardNumber.charAt(i) - '0';
            if (isSecond == true)
                d = d * 2;
            digitsSum += d / 10;
            digitsSum += d % 10;

            isSecond = !isSecond;
        }
        return (digitsSum % 10 == 0);
    }

    public Boolean validateExpirationDate(String expirationDate) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd:HH", Locale.ENGLISH);
        Date date;
        Boolean result = false;
        try {
            date = formatter.parse(expirationDate);
            if (date.compareTo(new Date()) >= 0)
                result = true;
        } catch (ParseException e) {
            System.out.println("Invalid expiration date");
        }
        return result;
    }

    public Boolean validatePayment(Payment payment) {
        System.out.println("Name: " + payment.getName());
        if (payment.getName().length() <= 10)
            return false;
        else
            return true;
    }
}
