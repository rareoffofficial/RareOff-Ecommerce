package com.rareoff.backend.modules.product;

import com.rareoff.backend.common.ApiResponse;
import com.rareoff.backend.modules.product.dto.ProductDto;
import com.rareoff.backend.modules.product.dto.ProductRequest;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/products")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Admin: Products")
public class AdminProductController {

    private final ProductService service;

    @PostMapping
    public ResponseEntity<ApiResponse<ProductDto>> create(@Valid @RequestBody ProductRequest r) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(service.create(r)));
    }

    @PutMapping("/{id}")
    public ApiResponse<ProductDto> update(@PathVariable Long id, @Valid @RequestBody ProductRequest r) {
        return ApiResponse.ok(service.update(id, r));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ApiResponse.ok("Deleted", null);
    }
}
