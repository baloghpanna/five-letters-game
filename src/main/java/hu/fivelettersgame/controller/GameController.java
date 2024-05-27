package hu.fivelettersgame.controller;

import hu.fivelettersgame.domain.dto.outgoing.WordSecret;
import hu.fivelettersgame.service.GameService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/words")
public class GameController {

    private GameService gameService;
    private static final Logger logger = LoggerFactory.getLogger(GameController.class);

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    public ResponseEntity<WordSecret> getSecretWord() {
        logger.info("Get Secret Word");
        WordSecret wordSecret = gameService.getSecretWord();
        return new ResponseEntity<>(wordSecret, HttpStatus.OK);
    }
}
