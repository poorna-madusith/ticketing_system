package com.OOPCW.services.auth.vendor;

import com.OOPCW.dto.TicketDto;

import java.io.IOException;
import java.util.List;

public interface VendorService {

    boolean postTicket(TicketDto ticketDto) throws IOException;

    List<TicketDto> getAllTickets();

    void deleteTicket(Long id);

    TicketDto getTicketById(Long id);

    boolean updateTicket(Long ticketId, TicketDto ticketDto);
}
