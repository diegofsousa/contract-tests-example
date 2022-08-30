package dev.diegofernando.apiserver.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.diegofernando.apiserver.annotations.SchemaTestsScan;
import org.reflections.Reflections;
import org.reflections.scanners.Scanners;
import uk.co.jemos.podam.api.PodamFactory;
import uk.co.jemos.podam.api.PodamFactoryImpl;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import static org.reflections.scanners.Scanners.SubTypes;

public class GenerateFakeObjects {
    public static void main(String[] args) throws IOException {

        Reflections reflections = new Reflections("dev.diegofernando.apiserver");

        Set<Class<?>> annotated =
                reflections.get(SubTypes.of(Scanners.TypesAnnotated.with(SchemaTestsScan.class)).asClass());

        List<Iteration> iterations = new ArrayList<>();

        for (Class<?> clazz: annotated) {
            SchemaTestsScan schemaTestsScan = clazz.getAnnotation(SchemaTestsScan.class);
            String key = schemaTestsScan.key();

            if (!Objects.equals(key, "")){
                PodamFactory factory = new PodamFactoryImpl();
                var pojo =  factory.manufacturePojo(clazz);

                iterations.add(new Iteration(key, pojo));
            }
        }

        Data data = new Data(iterations);

        ObjectMapper mapper = new ObjectMapper();
        try {
            String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(data);

            Path path = Paths.get("schema_tests");
            Files.createDirectories(path);
            BufferedWriter writer = new BufferedWriter(new FileWriter("schema_tests/schemas.json"));
            writer.write(json);

            writer.close();
            System.out.println(json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }


    }
}
