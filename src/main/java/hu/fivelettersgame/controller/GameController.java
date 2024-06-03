package hu.fivelettersgame.controller;

import hu.fivelettersgame.domain.dto.incoming.WordInput;
import hu.fivelettersgame.domain.dto.outgoing.GuessResult;
import hu.fivelettersgame.domain.dto.outgoing.WordSecret;
import hu.fivelettersgame.service.GameService;
import hu.fivelettersgame.validator.WordInputValidator;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/words")
public class GameController {

    private GameService gameService;
    private static final Logger logger = LoggerFactory.getLogger(GameController.class);

    private final WordInputValidator wordInputValidator;

    public GameController(GameService gameService, WordInputValidator wordInputValidator) {
        this.gameService = gameService;
        this.wordInputValidator = wordInputValidator;
    }

    @InitBinder
    public void initFormBinder(WebDataBinder binder) {
        binder.addValidators(wordInputValidator);
    }

    @GetMapping
    public ResponseEntity<WordSecret> getSecretWord() {
        logger.info("Get Secret Word");
        WordSecret wordSecret = gameService.getSecretWord();
        return new ResponseEntity<>(wordSecret, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<List<GuessResult>> guessResult(WordInput wordInput) {
        List guessResult = gameService.guessResult(wordInput);
        return new ResponseEntity<>(guessResult, HttpStatus.OK);

    }


}
