package dev.diegofernando.apiserver.response;

import dev.diegofernando.apiserver.annotations.SchemaTestsScan;

@SchemaTestsScan(key = "cardV2")
public class CardV2DTO {
    private String name;
    private String type;
    private int order;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }
}
