package com.wheretostudy.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("WHERE TO STUDY API")
                        .version("1.0.0")
                        .description("REST API for finding suitable study cafes with specific amenities")
                        .contact(new Contact()
                                .name("WHERE TO STUDY Team")));
    }
}
