package com.ecommerce.dto;

import com.ecommerce.model.Address;
import com.ecommerce.model.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {

    @NotEmpty(message = "Order must contain at least one item")
    private List<OrderItem> items;

    @NotNull(message = "Shipping address is required")
    private Address shippingAddress;
}
