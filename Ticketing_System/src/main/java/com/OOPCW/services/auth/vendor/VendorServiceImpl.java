package com.OOPCW.services.auth.vendor;


import com.OOPCW.dto.TicketDto;
import com.OOPCW.entity.Ticket;
import com.OOPCW.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

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
            ticket.setImage(ticketDto.getImage().getBytes());
            ticketRepository.save(ticket);
            return true;
        }catch (Exception e){
            return false;
        }


    }
}
