package com.rareoff.backend.modules.wishlist;

import com.rareoff.backend.common.ApiResponse;
import com.rareoff.backend.modules.wishlist.dto.WishlistItemDto;
import com.rareoff.backend.security.SecurityUtils;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/wishlist")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Wishlist")
public class WishlistController {

    private final WishlistService service;

    @GetMapping
    public ApiResponse<List<WishlistItemDto>> list() {
        return ApiResponse.ok(service.list(SecurityUtils.currentUserId()));
    }

    @PostMapping("/{productId}")
    public ResponseEntity<ApiResponse<WishlistItemDto>> add(@PathVariable Long productId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok(service.add(SecurityUtils.currentUserId(), productId)));
    }

    @DeleteMapping("/{productId}")
    public ApiResponse<Void> remove(@PathVariable Long productId) {
        service.remove(SecurityUtils.currentUserId(), productId);
        return ApiResponse.ok("Removed", null);
    }
}
