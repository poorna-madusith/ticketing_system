package com.OOPCW.controller;

import com.OOPCW.dto.TicketDto;
import com.OOPCW.entity.Ticket;
import com.OOPCW.services.auth.vendor.VendorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/vendor")
@RequiredArgsConstructor
public class VendorController {

    private final VendorService vendorService;


    @PostMapping("/ticket")
    public ResponseEntity<?> postTicket(@ModelAttribute TicketDto ticketDto) throws IOException {
        boolean succesess = vendorService.postTicket(ticketDto);
        if(succesess){
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }


    @GetMapping("/tickets")
    public ResponseEntity<?> getAllTickets(){
        return ResponseEntity.ok(vendorService.getAllTickets());
    }

    @DeleteMapping("/ticket/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable Long id) {
        vendorService.deleteTicket(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/ticket/{id}")
    public ResponseEntity<TicketDto> getTicketById(@PathVariable Long id) {
        TicketDto ticketDto = vendorService.getTicketById(id);
        return ResponseEntity.ok(ticketDto);
    }
}
