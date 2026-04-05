package com.mutualfund.platform.controller;

import com.mutualfund.platform.dto.*;
import com.mutualfund.platform.model.User;
import com.mutualfund.platform.security.JwtTokenProvider;
import com.mutualfund.platform.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            String token = tokenProvider.generateToken(authentication);
            User user = userService.getUserByUsername(request.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            LoginResponse response = new LoginResponse(
                    token,
                    user.getUsername(),
                    user.getFullName(),
                    user.getRole().name(),
                    user.getId()
            );

            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(false, "Invalid username or password"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            User user = userService.registerUser(request);
            String token = tokenProvider.generateTokenFromUsername(user.getUsername());

            LoginResponse response = new LoginResponse(
                    token,
                    user.getUsername(),
                    user.getFullName(),
                    user.getRole().name(),
                    user.getId()
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
}
