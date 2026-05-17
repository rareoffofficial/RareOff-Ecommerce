package com.rareoff.backend.modules.category;

import com.rareoff.backend.common.SlugUtils;
import com.rareoff.backend.exception.ConflictException;
import com.rareoff.backend.exception.ResourceNotFoundException;
import com.rareoff.backend.modules.category.dto.CategoryDto;
import com.rareoff.backend.modules.category.dto.CategoryRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository repo;

    @Transactional(readOnly = true)
    public List<CategoryDto> findAll() {
        return repo.findAll().stream().map(CategoryDto::from).toList();
    }

    @Transactional(readOnly = true)
    public CategoryDto findById(Long id) {
        return CategoryDto.from(repo.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Category", id)));
    }

    @Transactional
    public CategoryDto create(CategoryRequest req) {
        String slug = uniqueSlug(SlugUtils.slugify(req.name()));
        Category parent = req.parentId() == null ? null :
                repo.findById(req.parentId())
                    .orElseThrow(() -> ResourceNotFoundException.of("Category", req.parentId()));

        Category c = repo.save(Category.builder()
                .name(req.name()).slug(slug).imageUrl(req.imageUrl()).parent(parent).build());
        return CategoryDto.from(c);
    }

    @Transactional
    public CategoryDto update(Long id, CategoryRequest req) {
        Category c = repo.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Category", id));
        c.setName(req.name());
        c.setImageUrl(req.imageUrl());
        if (req.parentId() != null) {
            c.setParent(repo.findById(req.parentId())
                    .orElseThrow(() -> ResourceNotFoundException.of("Category", req.parentId())));
        }
        return CategoryDto.from(c);
    }

    @Transactional
    public void delete(Long id) { repo.deleteById(id); }

    private String uniqueSlug(String base) {
        String s = base; int n = 1;
        while (repo.existsBySlug(s)) { s = base + "-" + (++n); if (n > 50) throw new ConflictException("Slug conflict"); }
        return s;
    }
}
