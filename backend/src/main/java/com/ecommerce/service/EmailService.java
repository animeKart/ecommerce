package com.ecommerce.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:noreply@ecommerce.com}")
    private String fromEmail;

    @Value("${app.frontend-url:http://localhost:4200}")
    private String frontendUrl;

    public void sendPasswordResetEmail(String toEmail, String token) {
        String resetLink = frontendUrl + "/reset-password?token=" + token;

        if (mailSender != null) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom(fromEmail);
                message.setTo(toEmail);
                message.setSubject("Password Reset Request");
                message.setText(
                        "Hello,\n\n" +
                                "You have requested to reset your password. Click the link below to reset it:\n\n" +
                                resetLink + "\n\n" +
                                "This link will expire in 1 hour.\n\n" +
                                "If you did not request a password reset, please ignore this email.\n\n" +
                                "Best regards,\n" +
                                "The E-Commerce Team");

                mailSender.send(message);
                logger.info("Password reset email sent to: {}", toEmail);
            } catch (Exception e) {
                logger.error("Failed to send password reset email to: {}. Error: {}", toEmail, e.getMessage());
                // Log the reset link for development/testing purposes
                logger.info("Password reset link (for testing): {}", resetLink);
            }
        } else {
            // Mail sender not configured - log the reset link for development/testing
            logger.warn("JavaMailSender not configured. Password reset link for {}: {}", toEmail, resetLink);
        }
    }
}
