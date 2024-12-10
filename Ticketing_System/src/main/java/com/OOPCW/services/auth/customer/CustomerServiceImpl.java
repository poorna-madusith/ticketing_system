package com.OOPCW.services.auth.customer;

import com.OOPCW.dto.TicketDto;
import com.OOPCW.entity.Ticket;
import com.OOPCW.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final TicketRepository ticketRepository;

    @Override
    public List<TicketDto> getAllTickets() {
        return ticketRepository.findAll().stream().map(Ticket::getTicketDto).collect(Collectors.toList());
    }

    @Override
    public boolean buyTickets(Long ticketId, int quantity) {
        Optional<Ticket> optionalTicket = ticketRepository.findById(ticketId);
        if (optionalTicket.isPresent()) {
            Ticket ticket = optionalTicket.get();
            if (ticket.getTotaltickets() >= quantity) {
                ticket.setTotaltickets(ticket.getTotaltickets() - quantity);
                ticketRepository.save(ticket);
                return true;
            }
        }
        return false; // Not enough tickets or ticket not found
    }
}
