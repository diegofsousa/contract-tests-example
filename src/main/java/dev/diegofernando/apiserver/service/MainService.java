package dev.diegofernando.apiserver.service;

import dev.diegofernando.apiserver.response.CardDTO;
import dev.diegofernando.apiserver.response.ContentDTO;
import org.springframework.stereotype.Service;

@Service
public class MainService {

    public CardDTO getCard(){
        CardDTO cardDTO = new CardDTO();
        ContentDTO contentDTO = new ContentDTO();
        contentDTO.setActive(true);
        contentDTO.setDays(5);
        contentDTO.setType("FIRST CARD");
        cardDTO.setId(1);
        cardDTO.setFee("5.7");
        cardDTO.setName("CARD ONE");
        cardDTO.setContent(contentDTO);
        return cardDTO;
    }

}
