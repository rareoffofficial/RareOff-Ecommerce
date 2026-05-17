package com.rareoff.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * RAREOFF backend entrypoint.
 *
 * @SpringBootApplication enables:
 *  - component scanning under com.rareoff.backend
 *  - auto-configuration
 *  - @Configuration
 *
 * @EnableJpaAuditing powers @CreatedDate / @LastModifiedDate on BaseEntity.
 */
@SpringBootApplication
@EnableJpaAuditing
public class RareoffApplication {

    public static void main(String[] args) {
        SpringApplication.run(RareoffApplication.class, args);
    }
}
