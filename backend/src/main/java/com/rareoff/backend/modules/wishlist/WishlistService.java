package com.rareoff.backend.modules.wishlist;

import com.rareoff.backend.exception.ConflictException;
import com.rareoff.backend.exception.ResourceNotFoundException;
import com.rareoff.backend.modules.product.Product;
import com.rareoff.backend.modules.product.ProductRepository;
import com.rareoff.backend.modules.user.User;
import com.rareoff.backend.modules.user.UserRepository;
import com.rareoff.backend.modules.wishlist.dto.WishlistItemDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishRepo;
    private final ProductRepository productRepo;
    private final UserRepository userRepo;

    @Transactional(readOnly = true)
    public List<WishlistItemDto> list(Long userId) {
        return wishRepo.findByUserId(userId).stream().map(WishlistItemDto::from).toList();
    }

    @Transactional
    public WishlistItemDto add(Long userId, Long productId) {
        if (wishRepo.existsByUserIdAndProductId(userId, productId))
            throw new ConflictException("Already in wishlist");
        User u = userRepo.findById(userId)
                .orElseThrow(() -> ResourceNotFoundException.of("User", userId));
        Product p = productRepo.findById(productId)
                .orElseThrow(() -> ResourceNotFoundException.of("Product", productId));
        return WishlistItemDto.from(wishRepo.save(
                WishlistItem.builder().user(u).product(p).build()));
    }

    @Transactional
    public void remove(Long userId, Long productId) {
        wishRepo.deleteByUserIdAndProductId(userId, productId);
    }
}
