package com.rareoff.backend.modules.upload;

import com.rareoff.backend.exception.BadRequestException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class LocalFileStorageService implements FileStorageService {

    private static final Set<String> ALLOWED = Set.of("jpg","jpeg","png","webp","gif","avif");
    private static final long MAX_BYTES = 10L * 1024 * 1024;

    private final FileStorageProperties props;

    @PostConstruct
    void init() throws IOException {
        Files.createDirectories(Paths.get(props.uploadDir()));
    }

    @Override
    public String store(MultipartFile file, String subfolder) {
        if (file == null || file.isEmpty()) throw new BadRequestException("Empty file");
        if (file.getSize() > MAX_BYTES)     throw new BadRequestException("File too large (max 10MB)");

        String ext = ext(file.getOriginalFilename());
        if (!ALLOWED.contains(ext))         throw new BadRequestException("Unsupported file type: " + ext);

        String safeSub = subfolder == null ? "" : subfolder.replaceAll("[^a-zA-Z0-9/_-]", "");
        String filename = UUID.randomUUID() + "." + ext;
        Path dir = Paths.get(props.uploadDir(), safeSub);
        try {
            Files.createDirectories(dir);
            Path target = dir.resolve(filename);
            file.transferTo(target.toAbsolutePath());
            return props.publicBaseUrl() + "/uploads/" + (safeSub.isBlank() ? "" : safeSub + "/") + filename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }

    @Override
    public void delete(String publicUrl) {
        if (publicUrl == null || !publicUrl.contains("/uploads/")) return;
        String relative = publicUrl.substring(publicUrl.indexOf("/uploads/") + "/uploads/".length());
        try { Files.deleteIfExists(Paths.get(props.uploadDir(), relative)); }
        catch (IOException e) { log.warn("Failed to delete {}", publicUrl, e); }
    }

    private static String ext(String name) {
        if (name == null) return "";
        int i = name.lastIndexOf('.');
        return i < 0 ? "" : name.substring(i + 1).toLowerCase();
    }
}
