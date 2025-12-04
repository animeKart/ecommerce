package com.ecommerce.controller;

import com.ecommerce.dto.AddToCartRequest;
import com.ecommerce.dto.ApiResponse;
import com.ecommerce.dto.UpdateCartItemRequest;
import com.ecommerce.model.Cart;
import com.ecommerce.model.User;
import com.ecommerce.service.CartService;
import com.ecommerce.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@Tag(name = "Cart", description = "Shopping cart management endpoints")
@SecurityRequirement(name = "bearerAuth")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @GetMapping
    @Operation(summary = "Get cart", description = "Retrieve the authenticated user's shopping cart")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Cart retrieved successfully", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<ApiResponse<Cart>> getCart(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        Cart cart = cartService.getCart(user.getId());
        return ResponseEntity.ok(ApiResponse.success(cart));
    }

    @PostMapping("/items")
    @Operation(summary = "Add item to cart", description = "Add a product to the shopping cart or update quantity if already exists")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Item added to cart successfully", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Product not found", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<ApiResponse<Cart>> addItemToCart(
            Authentication authentication,
            @Valid @RequestBody AddToCartRequest request) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        Cart cart = cartService.addItemToCart(user.getId(), request.getProductId(), request.getQuantity());
        return ResponseEntity.ok(ApiResponse.success("Item added to cart", cart));
    }

    @PutMapping("/items/{productId}")
    @Operation(summary = "Update cart item quantity", description = "Update the quantity of a specific product in the cart")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Cart item updated successfully", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Product not found in cart", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<ApiResponse<Cart>> updateCartItem(
            Authentication authentication,
            @Parameter(description = "Product ID") @PathVariable String productId,
            @Valid @RequestBody UpdateCartItemRequest request) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        Cart cart = cartService.updateCartItemQuantity(user.getId(), productId, request.getQuantity());
        return ResponseEntity.ok(ApiResponse.success("Cart item updated", cart));
    }

    @DeleteMapping("/items/{productId}")
    @Operation(summary = "Remove item from cart", description = "Remove a specific product from the shopping cart")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Item removed from cart successfully", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<ApiResponse<Cart>> removeItemFromCart(
            Authentication authentication,
            @Parameter(description = "Product ID") @PathVariable String productId) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        Cart cart = cartService.removeItemFromCart(user.getId(), productId);
        return ResponseEntity.ok(ApiResponse.success("Item removed from cart", cart));
    }

    @DeleteMapping
    @Operation(summary = "Clear cart", description = "Remove all items from the shopping cart")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Cart cleared successfully", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<ApiResponse<Void>> clearCart(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        cartService.clearCart(user.getId());
        return ResponseEntity.ok(ApiResponse.success("Cart cleared", null));
    }
}
