package hu.fivelettersgame.controller;

import hu.fivelettersgame.domain.dto.incoming.GameInput;
import hu.fivelettersgame.domain.dto.incoming.Solution;
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


    @PostMapping("{id}/guess")
    public ResponseEntity<Boolean> guessResult(@PathVariable("id") Long gameId, @RequestBody WordInput wordInput) {
        logger.info("--------------guessResult" + wordInput.getWord());

       Boolean isFindWord = gameService.saveGuessResult(wordInput, gameId);
        logger.info("saveGuessResult");
        return new ResponseEntity<>(isFindWord, HttpStatus.CREATED);
    }
    @GetMapping("{id}")
    public ResponseEntity<List<GuessResult>> getGuessWordsList(@PathVariable("id") Long gameId) {
        logger.info("Get Guess Result List");
        List<GuessResult> guessResults = gameService.getGuessWordsList(gameId);
        return new ResponseEntity<>(guessResults, HttpStatus.OK);
    }

    @GetMapping("{id}/solution")
    public ResponseEntity<Boolean> solution(@PathVariable("id") Long gameId, @RequestParam("solutionWord") String solutionWord) {
        logger.info("--------------solution" + solutionWord);
        boolean isCorrect = gameService.checkSolution(solutionWord, gameId);
        logger.info("checkSolution");
        return new ResponseEntity<>(isCorrect, HttpStatus.OK);
    }

}
