package com.ecommerce.controller;

import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.ForgotPasswordRequest;
import com.ecommerce.dto.LoginRequest;
import com.ecommerce.dto.LoginResponse;
import com.ecommerce.dto.RegisterRequest;
import com.ecommerce.dto.ResetPasswordRequest;
import com.ecommerce.model.User;
import com.ecommerce.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@Tag(name = "Authentication", description = "Authentication and user profile management endpoints")
public class AuthController {

        @Autowired
        private UserService userService;

        @PostMapping("/auth/register")
        @Operation(summary = "Register a new user", description = "Create a new user account with email and password")
        @ApiResponses(value = {
                        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "User registered successfully", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
                        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid input or email already exists", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
        })
        public ResponseEntity<ApiResponse<User>> register(@Valid @RequestBody RegisterRequest request) {
                User user = userService.registerUser(request);
                return ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(ApiResponse.success("User registered successfully", user));
        }

        @PostMapping("/auth/login")
        @Operation(summary = "User login", description = "Authenticate user and receive JWT token")
        @ApiResponses(value = {
                        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Login successful", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
                        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Invalid credentials", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
        })
        public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
                LoginResponse response = userService.loginUser(request);
                return ResponseEntity.ok(ApiResponse.success("Login successful", response));
        }

        @PostMapping("/auth/forgot-password")
        @Operation(summary = "Request password reset", description = "Send a password reset link to the user's email")
        @ApiResponses(value = {
                        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Password reset email sent (if email exists)", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
        })
        public ResponseEntity<ApiResponse<Void>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
                userService.createPasswordResetToken(request.getEmail());
                return ResponseEntity.ok(ApiResponse.success(
                                "If an account exists with this email, a password reset link has been sent.", null));
        }

        @PostMapping("/auth/reset-password")
        @Operation(summary = "Reset password", description = "Reset password using the token from the email")
        @ApiResponses(value = {
                        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Password reset successful", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
                        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid or expired token", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
        })
        public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
                userService.resetPassword(request.getToken(), request.getNewPassword());
                return ResponseEntity.ok(ApiResponse.success("Password has been reset successfully.", null));
        }

        @GetMapping("/users/profile")
        @Operation(summary = "Get user profile", description = "Retrieve the authenticated user's profile information")
        @SecurityRequirement(name = "bearerAuth")
        @ApiResponses(value = {
                        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Profile retrieved successfully", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
                        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
        })
        public ResponseEntity<ApiResponse<User>> getProfile(Authentication authentication) {
                String email = authentication.getName();
                User user = userService.getUserByEmail(email);
                return ResponseEntity.ok(ApiResponse.success(user));
        }

        @PutMapping("/users/profile")
        @Operation(summary = "Update user profile", description = "Update the authenticated user's profile information")
        @SecurityRequirement(name = "bearerAuth")
        @ApiResponses(value = {
                        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Profile updated successfully", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
                        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
        })
        public ResponseEntity<ApiResponse<User>> updateProfile(
                        Authentication authentication,
                        @RequestBody User userDetails) {
                String email = authentication.getName();
                User updatedUser = userService.updateUser(email, userDetails);
                return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", updatedUser));
        }
}
