package com.OOPCW.dto;

import lombok.Data;

import java.util.Date;

@Data
public class TicketDto {
    private Long id;
    private String name;
    private Date date;
    private Long price;
    private Long totaltickets;
    private String description;
}
