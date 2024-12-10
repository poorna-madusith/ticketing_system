package com.OOPCW.entity;

import com.OOPCW.dto.TicketDto;
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
    private Long price;
    private Long totaltickets;
    private String description;

    public TicketDto getTicketDto() {
        TicketDto ticketDto = new TicketDto();
        ticketDto.setId(id);
        ticketDto.setName(name);
        ticketDto.setDate(date);
        ticketDto.setPrice(price);
        ticketDto.setTotaltickets(totaltickets);
        ticketDto.setDescription(description);
        return ticketDto;
    }
}
