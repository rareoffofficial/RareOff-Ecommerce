package com.rareoff.backend.modules.upload;

import com.rareoff.backend.common.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/uploads")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin: Uploads")
public class UploadController {

    private final FileStorageService storage;

    @PostMapping(consumes = "multipart/form-data")
    public ApiResponse<Map<String, String>> upload(
            @RequestPart("file") MultipartFile file,
            @RequestParam(defaultValue = "products") String folder) {

        String url = storage.store(file, folder);
        return ApiResponse.ok(Map.of("url", url));
    }
}
