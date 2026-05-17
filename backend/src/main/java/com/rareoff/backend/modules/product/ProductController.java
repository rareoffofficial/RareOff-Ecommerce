package com.rareoff.backend.modules.product;

import com.rareoff.backend.common.ApiResponse;
import com.rareoff.backend.common.PageResponse;
import com.rareoff.backend.modules.product.dto.ProductDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@Tag(name = "Products (public)")
public class ProductController {

    private final ProductService service;

    @GetMapping
    public ApiResponse<PageResponse<ProductDto>> list(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Boolean featured,
            @RequestParam(required = false) Boolean trending,
            Pageable pageable) {
        return ApiResponse.ok(service.search(q, categoryId, minPrice, maxPrice, featured, trending, pageable));
    }

    @GetMapping("/{id:\\d+}")
    public ApiResponse<ProductDto> getById(@PathVariable Long id) {
        return ApiResponse.ok(service.findById(id));
    }

    @GetMapping("/slug/{slug}")
    public ApiResponse<ProductDto> getBySlug(@PathVariable String slug) {
        return ApiResponse.ok(service.findBySlug(slug));
    }
}
