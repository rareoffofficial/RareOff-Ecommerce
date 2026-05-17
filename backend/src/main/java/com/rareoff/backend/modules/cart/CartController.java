package com.rareoff.backend.modules.cart;

import com.rareoff.backend.common.ApiResponse;
import com.rareoff.backend.modules.cart.dto.AddCartItemRequest;
import com.rareoff.backend.modules.cart.dto.CartDto;
import com.rareoff.backend.modules.cart.dto.UpdateCartItemRequest;
import com.rareoff.backend.security.SecurityUtils;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Cart")
public class CartController {

    private final CartService service;

    @GetMapping
    public ApiResponse<CartDto> get() {
        return ApiResponse.ok(service.getOrCreate(SecurityUtils.currentUserId()));
    }

    @PostMapping("/items")
    public ApiResponse<CartDto> add(@Valid @RequestBody AddCartItemRequest req) {
        return ApiResponse.ok(service.addItem(SecurityUtils.currentUserId(), req));
    }

    @PatchMapping("/items/{itemId}")
    public ApiResponse<CartDto> update(@PathVariable Long itemId, @Valid @RequestBody UpdateCartItemRequest req) {
        return ApiResponse.ok(service.updateItem(SecurityUtils.currentUserId(), itemId, req));
    }

    @DeleteMapping("/items/{itemId}")
    public ApiResponse<CartDto> remove(@PathVariable Long itemId) {
        return ApiResponse.ok(service.removeItem(SecurityUtils.currentUserId(), itemId));
    }

    @DeleteMapping
    public ApiResponse<Void> clear() {
        service.clear(SecurityUtils.currentUserId());
        return ApiResponse.ok("Cart cleared", null);
    }
}
