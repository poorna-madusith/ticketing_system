package com.OOPCW.services.auth;

import com.OOPCW.dto.SignupRequest;
import com.OOPCW.dto.UserDto;

public interface AuthService {
    UserDto createCustomer(SignupRequest signupRequest);

    boolean  hasCustomerWithEmail(String email);
}
