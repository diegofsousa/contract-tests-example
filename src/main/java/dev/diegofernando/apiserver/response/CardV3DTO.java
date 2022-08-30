package dev.diegofernando.apiserver.response;

import dev.diegofernando.apiserver.annotations.SchemaTestsScan;

@SchemaTestsScan(key = "cardV3")
public class CardV3DTO {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
