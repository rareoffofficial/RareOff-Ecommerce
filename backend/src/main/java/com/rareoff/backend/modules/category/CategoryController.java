package com.rareoff.backend.modules.category;

import com.rareoff.backend.common.ApiResponse;
import com.rareoff.backend.modules.category.dto.CategoryDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
@Tag(name = "Categories (public)")
public class CategoryController {

    private final CategoryService service;

    @GetMapping
    public ApiResponse<List<CategoryDto>> list() { return ApiResponse.ok(service.findAll()); }

    @GetMapping("/{id}")
    public ApiResponse<CategoryDto> get(@PathVariable Long id) { return ApiResponse.ok(service.findById(id)); }
}
