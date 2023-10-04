package com.example.test.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.test.model.Payment;
import com.example.test.service.CreditCardService;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:5173")
public class CreditCardController {

    private CreditCardService service;

    public CreditCardController(CreditCardService creditCardService) {
        this.service = creditCardService;
    }

    @GetMapping("/hola")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hola!");
    }

    @PostMapping("/validateCard")
    public ResponseEntity<Boolean> validateCard(@RequestBody String cardNumber) {
        if (cardNumber.length() >= 16 && cardNumber.length() <= 19)
            return ResponseEntity.ok(this.service.validateCardNumber(cardNumber));
        else
            return ResponseEntity.ok(false);
    }

    @PostMapping("/validateExpirationDate")
    public ResponseEntity<Boolean> validateExpirationDate(@RequestBody String expirationDate) {
        return ResponseEntity.ok(this.service.validateExpirationDate(expirationDate));
    }

    @PostMapping("/payment")
    public ResponseEntity<Object> validatePayment(@RequestBody Payment payment) {
        Map<String, Object> map = new HashMap<String, Object>();
        String message = "";
        HttpStatus status;
        if (this.service.validatePayment(payment)) {
            message = "Payment received!";
            status = HttpStatus.ACCEPTED;

        } else {
            message = "Names length is not enought";
            status = HttpStatus.NOT_ACCEPTABLE;
        }
        map.put("message", message);
        map.put("status", status);

        return new ResponseEntity<Object>(map, status);
    }
}
