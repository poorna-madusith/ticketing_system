package com.OOPCW.services.auth.customer;


import com.OOPCW.dto.TicketDto;
import com.OOPCW.entity.Ticket;
import com.OOPCW.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService{

    private final TicketRepository ticketRepository;

    @Override
    public List<TicketDto> getAllTickets() {
        return ticketRepository.findAll().stream().map(Ticket::getTicketDto).collect(Collectors.toList());
    }
}
