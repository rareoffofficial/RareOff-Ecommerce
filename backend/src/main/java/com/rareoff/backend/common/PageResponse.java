package com.rareoff.backend.common;

import org.springframework.data.domain.Page;

import java.util.List;

/**
 * Lightweight pagination wrapper.
 * We do NOT return raw Spring `Page` to clients — its JSON shape is unstable across versions.
 */
public record PageResponse<T>(
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages,
        boolean last
) {
    public static <T> PageResponse<T> from(Page<T> p) {
        return new PageResponse<>(
                p.getContent(),
                p.getNumber(),
                p.getSize(),
                p.getTotalElements(),
                p.getTotalPages(),
                p.isLast()
        );
    }
}
