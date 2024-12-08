package com.OOPCW.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "tickets")
public class Ticket {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Date date;
    private String price;
    private int totaltickets;
    private String description;

    @Column(columnDefinition = "longblob")
    private byte[] image;

}
