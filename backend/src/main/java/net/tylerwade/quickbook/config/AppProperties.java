package net.tylerwade.quickbook.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public record AppProperties(String environment, int maxUserBusinesses){

    public boolean isProduction() {
        return environment.equalsIgnoreCase("PRODUCTION");
    }
}
