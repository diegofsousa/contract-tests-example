package dev.diegofernando.apiserver.utils;

public class Iteration {
    private String key;
    private Object object;

    public Iteration(String key, Object object) {
        this.key = key;
        this.object = object;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }

    @Override
    public String toString() {
        return "Iteraction{" +
                "key='" + key + '\'' +
                ", object=" + object +
                '}';
    }
}
