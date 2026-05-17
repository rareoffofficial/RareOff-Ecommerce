package com.rareoff.backend.modules.upload;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    /** Returns a public URL (e.g. http://host/uploads/products/uuid.jpg). */
    String store(MultipartFile file, String subfolder);

    void delete(String publicUrl);
}
