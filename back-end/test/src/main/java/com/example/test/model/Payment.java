package com.example.test.model;

public class Payment {
    private String name;
    private String cardNumber;
    private String date;
    private String cvv;

    public Payment(String name, String cardNumber, String date, String cvv) {
        this.name = name;
        this.cardNumber = cardNumber;
        this.date = date;
        this.cvv = cvv;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
