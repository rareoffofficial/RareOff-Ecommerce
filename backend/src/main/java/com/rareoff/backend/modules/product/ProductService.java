package com.rareoff.backend.modules.product;

import com.rareoff.backend.common.PageResponse;
import com.rareoff.backend.common.SlugUtils;
import com.rareoff.backend.exception.ConflictException;
import com.rareoff.backend.exception.ResourceNotFoundException;
import com.rareoff.backend.modules.category.Category;
import com.rareoff.backend.modules.category.CategoryRepository;
import com.rareoff.backend.modules.product.dto.ProductDto;
import com.rareoff.backend.modules.product.dto.ProductRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

import static com.rareoff.backend.modules.product.ProductSpecifications.*;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepo;
    private final CategoryRepository categoryRepo;

    // ---------- PUBLIC ----------

    @Transactional(readOnly = true)
    public PageResponse<ProductDto> search(String q, Long categoryId,
                                           BigDecimal minPrice, BigDecimal maxPrice,
                                           Boolean featured, Boolean trending,
                                           Pageable pageable) {
        Specification<Product> spec = Specification
                .where(activeOnly())
                .and(ProductSpecifications.search(q))
                .and(categoryId(categoryId))
                .and(priceBetween(minPrice, maxPrice))
                .and(featured(featured))
                .and(trending(trending));
        Page<ProductDto> page = productRepo.findAll(spec, pageable).map(ProductDto::from);
        return PageResponse.from(page);
    }

    @Transactional(readOnly = true)
    public ProductDto findById(Long id) {
        return ProductDto.from(productRepo.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Product", id)));
    }

    @Transactional(readOnly = true)
    public ProductDto findBySlug(String slug) {
        return ProductDto.from(productRepo.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + slug)));
    }

    // ---------- ADMIN ----------

    @Transactional
    public ProductDto create(ProductRequest r) {
        if (productRepo.existsBySku(r.sku())) throw new ConflictException("SKU already exists");
        String slug = uniqueSlug(SlugUtils.slugify(r.name()));
        Category cat = resolveCategory(r.categoryId());

        Product p = Product.builder()
                .sku(r.sku()).name(r.name()).slug(slug).description(r.description())
                .price(r.price()).compareAtPrice(r.compareAtPrice()).stock(r.stock())
                .category(cat).brand(r.brand()).material(r.material())
                .active(  r.active()   == null || r.active())
                .featured(r.featured() != null && r.featured())
                .trending(r.trending() != null && r.trending())
                .build();

        attachImages(p, r.imageUrls());
        return ProductDto.from(productRepo.save(p));
    }

    @Transactional
    public ProductDto update(Long id, ProductRequest r) {
        Product p = productRepo.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Product", id));
        p.setName(r.name()); p.setDescription(r.description());
        p.setPrice(r.price()); p.setCompareAtPrice(r.compareAtPrice());
        p.setStock(r.stock()); p.setBrand(r.brand()); p.setMaterial(r.material());
        if (r.active()   != null) p.setActive(r.active());
        if (r.featured() != null) p.setFeatured(r.featured());
        if (r.trending() != null) p.setTrending(r.trending());
        p.setCategory(resolveCategory(r.categoryId()));

        if (r.imageUrls() != null) {
            p.getImages().clear();
            attachImages(p, r.imageUrls());
        }
        return ProductDto.from(p);
    }

    @Transactional
    public void delete(Long id) {
        if (!productRepo.existsById(id)) throw ResourceNotFoundException.of("Product", id);
        productRepo.deleteById(id);
    }

    // ---------- helpers ----------

    private Category resolveCategory(Long id) {
        if (id == null) return null;
        return categoryRepo.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Category", id));
    }

    private String uniqueSlug(String base) {
        String s = base; int n = 1;
        while (productRepo.existsBySlug(s)) { s = base + "-" + (++n); if (n > 50) throw new ConflictException("Slug conflict"); }
        return s;
    }

    private void attachImages(Product p, List<String> urls) {
        if (urls == null) return;
        for (int i = 0; i < urls.size(); i++) {
            p.addImage(ProductImage.builder()
                    .url(urls.get(i)).position(i).primary(i == 0).build());
        }
    }
}
