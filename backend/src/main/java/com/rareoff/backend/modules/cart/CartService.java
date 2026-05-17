package com.rareoff.backend.modules.cart;

import com.rareoff.backend.exception.BadRequestException;
import com.rareoff.backend.exception.ResourceNotFoundException;
import com.rareoff.backend.modules.cart.dto.AddCartItemRequest;
import com.rareoff.backend.modules.cart.dto.CartDto;
import com.rareoff.backend.modules.cart.dto.UpdateCartItemRequest;
import com.rareoff.backend.modules.product.Product;
import com.rareoff.backend.modules.product.ProductRepository;
import com.rareoff.backend.modules.user.User;
import com.rareoff.backend.modules.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepo;
    private final CartItemRepository itemRepo;
    private final ProductRepository productRepo;
    private final UserRepository userRepo;

    @Transactional
    public CartDto getOrCreate(Long userId) {
        return CartDto.from(loadOrCreate(userId));
    }

    @Transactional
    public CartDto addItem(Long userId, AddCartItemRequest req) {
        Cart cart = loadOrCreate(userId);
        Product product = productRepo.findById(req.productId())
                .orElseThrow(() -> ResourceNotFoundException.of("Product", req.productId()));
        if (!product.isActive()) throw new BadRequestException("Product unavailable");
        if (product.getStock() < req.quantity()) throw new BadRequestException("Insufficient stock");

        CartItem item = itemRepo.findByCartIdAndProductId(cart.getId(), product.getId())
                .orElseGet(() -> CartItem.builder()
                        .cart(cart).product(product).quantity(0)
                        .priceSnapshot(product.getPrice()).build());

        int newQty = item.getQuantity() + req.quantity();
        if (product.getStock() < newQty) throw new BadRequestException("Insufficient stock");
        item.setQuantity(newQty);
        item.setPriceSnapshot(product.getPrice());
        if (item.getId() == null) cart.getItems().add(item);
        itemRepo.save(item);

        return CartDto.from(cart);
    }

    @Transactional
    public CartDto updateItem(Long userId, Long itemId, UpdateCartItemRequest req) {
        Cart cart = loadOrCreate(userId);
        CartItem item = findItem(cart, itemId);
        if (item.getProduct().getStock() < req.quantity())
            throw new BadRequestException("Insufficient stock");
        item.setQuantity(req.quantity());
        return CartDto.from(cart);
    }

    @Transactional
    public CartDto removeItem(Long userId, Long itemId) {
        Cart cart = loadOrCreate(userId);
        CartItem item = findItem(cart, itemId);
        cart.getItems().remove(item);
        itemRepo.delete(item);
        return CartDto.from(cart);
    }

    @Transactional
    public void clear(Long userId) {
        cartRepo.findByUserId(userId).ifPresent(c -> c.getItems().clear());
    }

    // ---- helpers ----

    private Cart loadOrCreate(Long userId) {
        return cartRepo.findByUserId(userId).orElseGet(() -> {
            User u = userRepo.findById(userId)
                    .orElseThrow(() -> ResourceNotFoundException.of("User", userId));
            return cartRepo.save(Cart.builder().user(u).build());
        });
    }

    private CartItem findItem(Cart cart, Long itemId) {
        return cart.getItems().stream()
                .filter(i -> i.getId().equals(itemId)).findFirst()
                .orElseThrow(() -> ResourceNotFoundException.of("CartItem", itemId));
    }
}
