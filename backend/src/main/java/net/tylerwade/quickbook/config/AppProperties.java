package net.tylerwade.quickbook.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public record AppProperties(
        String environment,
        int maxApplicationBusinesses,
        int maxUserBusinesses,
        int maxBusinessServices,
        String imageBucketName,
        Long maxUploadSizeMb
){

    public boolean isProduction() {
        return environment.equalsIgnoreCase("PRODUCTION");
    }
}
