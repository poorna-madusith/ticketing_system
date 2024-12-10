package com.OOPCW.services.auth.customer;

import com.OOPCW.dto.TicketDto;

import java.util.List;

public interface CustomerService {

    List<TicketDto> getAllTickets();

    boolean buyTickets(Long ticketId, int quantity); // New method
}
