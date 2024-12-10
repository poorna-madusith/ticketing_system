package com.OOPCW.controller;

import com.OOPCW.dto.TicketDto;
import com.OOPCW.services.auth.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @PutMapping("/buy-ticket/{ticketId}")
    public ResponseEntity<?> buyTickets(@PathVariable Long ticketId, @RequestParam int quantity) {
        try {
            boolean success = customerService.buyTickets(ticketId, quantity);
            if (success) {
                // Returning a JSON response with success message
                return ResponseEntity.ok(Map.of(
                        "message", "Tickets purchased successfully!",
                        "success", true
                ));
            } else {
                // Returning a JSON response with error message
                return ResponseEntity.badRequest().body(Map.of(
                        "error", "Not enough tickets available.",
                        "success", false
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "error", "An unexpected error occurred.",
                    "success", false
            ));
        }
    }





}
