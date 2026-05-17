package com.rareoff.backend.modules.order.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ShippingAddressDto(
        @NotBlank @Size(max = 150) String fullName,
        @NotBlank @Size(max = 30)  String phone,
        @NotBlank @Size(max = 255) String line1,
        @Size(max = 255) String line2,
        @NotBlank @Size(max = 120) String city,
        @NotBlank @Size(max = 120) String state,
        @NotBlank @Size(max = 20)  String pincode,
        @Size(max = 80) String country
) {}
