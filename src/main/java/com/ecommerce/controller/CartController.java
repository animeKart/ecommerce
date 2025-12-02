package com.ecommerce.controller;

import com.ecommerce.dto.AddToCartRequest;
import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.UpdateCartItemRequest;
import com.ecommerce.model.Cart;
import com.ecommerce.model.User;
import com.ecommerce.service.CartService;
import com.ecommerce.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse<Cart>> getCart(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        Cart cart = cartService.getCart(user.getId());
        return ResponseEntity.ok(ApiResponse.success(cart));
    }

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<Cart>> addItemToCart(
            Authentication authentication,
            @Valid @RequestBody AddToCartRequest request) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        Cart cart = cartService.addItemToCart(user.getId(), request.getProductId(), request.getQuantity());
        return ResponseEntity.ok(ApiResponse.success("Item added to cart", cart));
    }

    @PutMapping("/items/{productId}")
    public ResponseEntity<ApiResponse<Cart>> updateCartItem(
            Authentication authentication,
            @PathVariable String productId,
            @Valid @RequestBody UpdateCartItemRequest request) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        Cart cart = cartService.updateCartItemQuantity(user.getId(), productId, request.getQuantity());
        return ResponseEntity.ok(ApiResponse.success("Cart item updated", cart));
    }

    @DeleteMapping("/items/{productId}")
    public ResponseEntity<ApiResponse<Cart>> removeItemFromCart(
            Authentication authentication,
            @PathVariable String productId) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        Cart cart = cartService.removeItemFromCart(user.getId(), productId);
        return ResponseEntity.ok(ApiResponse.success("Item removed from cart", cart));
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> clearCart(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        cartService.clearCart(user.getId());
        return ResponseEntity.ok(ApiResponse.success("Cart cleared", null));
    }
}
