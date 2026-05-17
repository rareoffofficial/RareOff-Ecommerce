package com.rareoff.backend.modules.order;

import com.rareoff.backend.common.ApiResponse;
import com.rareoff.backend.common.PageResponse;
import com.rareoff.backend.modules.order.dto.OrderDto;
import com.rareoff.backend.modules.order.dto.UpdateOrderStatusRequest;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/orders")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Admin: Orders")
public class AdminOrderController {

    private final OrderService service;

    @GetMapping
    public ApiResponse<PageResponse<OrderDto>> list(
            @RequestParam(required = false) OrderStatus status, Pageable pageable) {
        return ApiResponse.ok(service.listAll(status, pageable));
    }

    @GetMapping("/{id}")
    public ApiResponse<OrderDto> get(@PathVariable Long id) {
        return ApiResponse.ok(service.getById(id));
    }

    @PatchMapping("/{id}/status")
    public ApiResponse<OrderDto> updateStatus(@PathVariable Long id,
                                              @Valid @RequestBody UpdateOrderStatusRequest req) {
        return ApiResponse.ok(service.updateStatus(id, req.status()));
    }
}
