package com.userbankdetails.EliteBank_UserBankMicroservice.Statement.DTO.Request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetParticularStatementRequest {
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate start;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate end;
}
