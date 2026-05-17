package com.rareoff.backend.modules.order;

import com.rareoff.backend.common.ApiResponse;
import com.rareoff.backend.common.PageResponse;
import com.rareoff.backend.modules.order.dto.CheckoutRequest;
import com.rareoff.backend.modules.order.dto.OrderDto;
import com.rareoff.backend.security.SecurityUtils;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Orders")
public class OrderController {

    private final OrderService service;

    @PostMapping
    public ResponseEntity<ApiResponse<OrderDto>> checkout(@Valid @RequestBody CheckoutRequest req) {
        OrderDto dto = service.checkout(SecurityUtils.currentUserId(), req);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Order placed", dto));
    }

    @GetMapping
    public ApiResponse<PageResponse<OrderDto>> mine(Pageable pageable) {
        return ApiResponse.ok(service.listMine(SecurityUtils.currentUserId(), pageable));
    }

    @GetMapping("/{id}")
    public ApiResponse<OrderDto> getOne(@PathVariable Long id) {
        return ApiResponse.ok(service.getMine(SecurityUtils.currentUserId(), id));
    }
}
