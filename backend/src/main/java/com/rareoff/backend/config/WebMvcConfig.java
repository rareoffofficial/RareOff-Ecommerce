package com.rareoff.backend.config;

import com.rareoff.backend.modules.order.PricingProperties;
import com.rareoff.backend.modules.payment.RazorpayProperties;
import com.rareoff.backend.modules.upload.FileStorageProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
@RequiredArgsConstructor
@EnableConfigurationProperties({FileStorageProperties.class, PricingProperties.class, RazorpayProperties.class})
public class WebMvcConfig implements WebMvcConfigurer {

    private final FileStorageProperties props;

    /** Expose /uploads/** as static files served from the configured local dir. */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String location = "file:" + Paths.get(props.uploadDir()).toAbsolutePath() + "/";
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(location)
                .setCachePeriod(3600);
    }
}
