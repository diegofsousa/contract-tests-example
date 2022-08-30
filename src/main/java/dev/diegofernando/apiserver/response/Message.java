package dev.diegofernando.apiserver.response;

import dev.diegofernando.apiserver.annotations.SchemaTestsScan;

@SchemaTestsScan(key = "messageV1")
public class Message {
    private double fee;

    public double getFee() {
        return fee;
    }

    public void setFee(double fee) {
        this.fee = fee;
    }
}
