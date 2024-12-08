package com.OOPCW.services.auth.vendor;

import com.OOPCW.dto.TicketDto;

import java.io.IOException;

public interface VendorService {

    boolean postTicket(TicketDto ticketDto) throws IOException;
}
