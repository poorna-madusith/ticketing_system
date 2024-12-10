package com.OOPCW.controller;

import com.OOPCW.dto.TicketDto;
import com.OOPCW.services.auth.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;


    @GetMapping("/tickets")
    public ResponseEntity<List<TicketDto>> getAllTickets() {
        List<TicketDto> ticketDtoList = customerService.getAllTickets();
        return ResponseEntity.ok(ticketDtoList);
    }
}
