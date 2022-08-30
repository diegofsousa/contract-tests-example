package dev.diegofernando.apiserver.response;

import dev.diegofernando.apiserver.annotations.SchemaTestsScan;

@SchemaTestsScan(key = "new")
public class New {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "New{" +
                "name='" + name + '\'' +
                '}';
    }
}
