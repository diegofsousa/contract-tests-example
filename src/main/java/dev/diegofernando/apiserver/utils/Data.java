package dev.diegofernando.apiserver.utils;

import java.util.List;

public class Data {

    private List<Iteration> data;

    public Data(List<Iteration> data) {
        this.data = data;
    }

    public List<Iteration> getData() {
        return data;
    }

    public void setData(List<Iteration> data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Data{" +
                "data=" + data +
                '}';
    }
}
