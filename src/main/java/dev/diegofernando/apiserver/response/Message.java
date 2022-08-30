package dev.diegofernando.apiserver.response;

import dev.diegofernando.apiserver.annotations.SchemaTestsScan;

@SchemaTestsScan(key = "messageV1")
public class Message {
    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
