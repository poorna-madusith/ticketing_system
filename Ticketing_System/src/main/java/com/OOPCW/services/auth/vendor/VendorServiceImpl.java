package com.OOPCW.services.auth.vendor;


import com.OOPCW.dto.TicketDto;
import com.OOPCW.entity.Ticket;
import com.OOPCW.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VendorServiceImpl implements VendorService{

    private final TicketRepository ticketRepository;

    @Override
    public boolean postTicket(TicketDto ticketDto) throws IOException {

        try{
            Ticket ticket = new Ticket();
            ticket.setName(ticketDto.getName());
            ticket.setDate(ticketDto.getDate());
            ticket.setPrice(ticketDto.getPrice());
            ticket.setTotaltickets(ticketDto.getTotaltickets());
            ticket.setDescription(ticketDto.getDescription());
            ticketRepository.save(ticket);
            return true;
        }catch (Exception e){
            return false;
        }


    }

    @Override
    public List<TicketDto> getAllTickets() {
        return ticketRepository.findAll().stream().map(Ticket::getTicketDto).collect(Collectors.toList());
    }

    @Override
    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
    }

    @Override
    public TicketDto getTicketById(Long id) {
        Optional<Ticket> optionalticket = ticketRepository.findById(id);
        return optionalticket.map(Ticket::getTicketDto).orElse(null);
    }
}
