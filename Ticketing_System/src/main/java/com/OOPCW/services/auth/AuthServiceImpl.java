package com.OOPCW.services.auth;


import com.OOPCW.dto.SignupRequest;
import com.OOPCW.dto.UserDto;
import com.OOPCW.entity.User;
import com.OOPCW.enums.UserRole;
import com.OOPCW.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{


    private final UserRepository userRepository;


    @PostConstruct
    public void createVendorAccount(){
        User vendorAccount = userRepository.findByUserRole(UserRole.VENDOR);
        if (vendorAccount == null){
            User newVendorAccount = new User();
            newVendorAccount.setName("Vendor");
            newVendorAccount.setEmail("Vendor@test.com");
            newVendorAccount.setPassword(new BCryptPasswordEncoder().encode("vendor"));
            newVendorAccount.setUserRole(UserRole.VENDOR);
            userRepository.save(newVendorAccount);
            System.out.println("Vendor Account created successfully");
        }
    }

    @Override
    public UserDto createCustomer(SignupRequest signupRequest) {
        User user = new User();
        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        user.setUserRole(UserRole.CUSTOMER);
        User createdUser =  userRepository.save(user);
        UserDto userDto = new UserDto();
        userDto.setId(createdUser.getId());

        return userDto;
    }

    @Override
    public boolean hasCustomerWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }
}
