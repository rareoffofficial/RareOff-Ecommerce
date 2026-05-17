package com.rareoff.backend.config;

import com.rareoff.backend.common.SlugUtils;
import com.rareoff.backend.modules.category.Category;
import com.rareoff.backend.modules.category.CategoryRepository;
import com.rareoff.backend.modules.product.Product;
import com.rareoff.backend.modules.product.ProductImage;
import com.rareoff.backend.modules.product.ProductRepository;
import com.rareoff.backend.modules.user.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * One-time bootstrap: ensures both roles exist and a default admin user is present
 * so you can log into the admin panel on a fresh database.
 *
 * Active only in `dev` — in `prod` you create the first admin manually via a secured
 * script or a one-off CLI command (never auto-seed prod with hardcoded passwords).
 */
@Slf4j
@Component
@Profile("dev")
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepo;
    private final UserRepository userRepo;
    private final CategoryRepository categoryRepo;
    private final ProductRepository productRepo;
    private final PasswordEncoder passwordEncoder;

    @Value("${rareoff.bootstrap.admin-email:admin@rareoff.local}")
    private String adminEmail;

    @Value("${rareoff.bootstrap.admin-password:Admin@12345}")
    private String adminPassword;

    @Override
    @Transactional
    public void run(String... args) {
        seedRoles();
        seedAdmin();
        seedCatalog();
    }

    private void seedRoles() {
        for (RoleName rn : RoleName.values()) {
            roleRepo.findByName(rn).orElseGet(() ->
                    roleRepo.save(Role.builder().name(rn).build()));
        }
    }

    private void seedAdmin() {
        if (userRepo.existsByEmailIgnoreCase(adminEmail)) return;

        Role adminRole = roleRepo.findByName(RoleName.ROLE_ADMIN).orElseThrow();
        Role userRole  = roleRepo.findByName(RoleName.ROLE_USER).orElseThrow();
        Set<Role> roles = new HashSet<>();
        roles.add(adminRole); roles.add(userRole);

        User admin = User.builder()
                .fullName("RAREOFF Admin")
                .email(adminEmail.toLowerCase())
                .passwordHash(passwordEncoder.encode(adminPassword))
                .enabled(true).emailVerified(true)
                .roles(roles).build();

        userRepo.save(admin);
        log.warn("Seeded bootstrap admin: {} (CHANGE THIS PASSWORD IN PROD)", adminEmail);
    }

    private void seedCatalog() {
        if (categoryRepo.count() > 0) return;

        Category hoodies = categoryRepo.save(Category.builder().name("Hoodies").slug("hoodies").build());
        Category tees    = categoryRepo.save(Category.builder().name("T-Shirts").slug("t-shirts").build());
        Category jackets = categoryRepo.save(Category.builder().name("Jackets").slug("jackets").build());

        seedProduct("RAREOFF Hoodie",       "RO-HD-001", new BigDecimal("2999"), 25, hoodies, true,  false);
        seedProduct("Oversized Street Tee", "RO-TS-001", new BigDecimal("1499"), 50, tees,    false, true);
        seedProduct("RAREOFF Jacket",       "RO-JK-001", new BigDecimal("4999"), 12, jackets, true,  true);

        log.info("Seeded sample catalog: 3 categories, 3 products");
    }

    private void seedProduct(String name, String sku, BigDecimal price, int stock,
                             Category cat, boolean featured, boolean trending) {
        Product p = Product.builder()
                .sku(sku).name(name).slug(SlugUtils.slugify(name)).description("Premium RAREOFF piece.")
                .price(price).stock(stock).category(cat).brand("RAREOFF")
                .active(true).featured(featured).trending(trending)
                .build();
        p.addImage(ProductImage.builder()
                .url("https://placehold.co/600x800/000/fff?text=" + name.replace(" ","+"))
                .position(0).primary(true).build());
        productRepo.save(p);
    }
}
