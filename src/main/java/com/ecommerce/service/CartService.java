package com.ecommerce.service;

import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.model.Cart;
import com.ecommerce.model.CartItem;
import com.ecommerce.model.Product;
import com.ecommerce.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductService productService;

    public Cart getOrCreateCart(String userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUserId(userId);
                    newCart.setItems(new ArrayList<>());
                    newCart.setTotalAmount(0.0);
                    return cartRepository.save(newCart);
                });
    }

    public Cart addItemToCart(String userId, String productId, Integer quantity) {
        Cart cart = getOrCreateCart(userId);
        Product product = productService.getProductById(productId);

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            item.setSubtotal(item.getQuantity() * item.getPrice());
        } else {
            CartItem newItem = new CartItem();
            newItem.setProductId(productId);
            newItem.setProductName(product.getName());
            newItem.setQuantity(quantity);
            newItem.setPrice(product.getPrice());
            newItem.setSubtotal(quantity * product.getPrice());
            cart.getItems().add(newItem);
        }

        updateCartTotal(cart);
        return cartRepository.save(cart);
    }

    public Cart updateCartItemQuantity(String userId, String productId, Integer quantity) {
        Cart cart = getOrCreateCart(userId);

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProductId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Item not found in cart"));

        item.setQuantity(quantity);
        item.setSubtotal(quantity * item.getPrice());

        updateCartTotal(cart);
        return cartRepository.save(cart);
    }

    public Cart removeItemFromCart(String userId, String productId) {
        Cart cart = getOrCreateCart(userId);

        cart.getItems().removeIf(item -> item.getProductId().equals(productId));

        updateCartTotal(cart);
        return cartRepository.save(cart);
    }

    public void clearCart(String userId) {
        Cart cart = getOrCreateCart(userId);
        cart.getItems().clear();
        cart.setTotalAmount(0.0);
        cartRepository.save(cart);
    }

    public Cart getCart(String userId) {
        return getOrCreateCart(userId);
    }

    private void updateCartTotal(Cart cart) {
        double total = cart.getItems().stream()
                .mapToDouble(CartItem::getSubtotal)
                .sum();
        cart.setTotalAmount(total);
    }
}
