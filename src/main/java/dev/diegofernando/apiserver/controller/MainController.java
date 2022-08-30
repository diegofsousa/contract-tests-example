package dev.diegofernando.apiserver.controller;

import dev.diegofernando.apiserver.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class MainController {

    @Autowired
    private MainService service;

    @GetMapping("/card")
    public ResponseEntity<?> getNormalRequests() {
        return ResponseEntity.status(HttpStatus.OK).body(service.getCard());
    }

}
