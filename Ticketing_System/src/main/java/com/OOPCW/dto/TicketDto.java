package com.OOPCW.dto;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class TicketDto {

    private Long id;
    private String name;
    private Date date;
    private Long price;
    private String totaltickets;
    private String description;
}
