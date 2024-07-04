package hu.fivelettersgame.service;

import hu.fivelettersgame.controller.GameController;
import hu.fivelettersgame.domain.Game;
import hu.fivelettersgame.domain.Result;
import hu.fivelettersgame.domain.Word;
import hu.fivelettersgame.domain.dto.incoming.WordInput;
import hu.fivelettersgame.domain.dto.outgoing.GuessResult;
import hu.fivelettersgame.domain.dto.outgoing.WordSecret;
import hu.fivelettersgame.repository.GameRepository;
import hu.fivelettersgame.repository.ResultRepository;
import hu.fivelettersgame.repository.WordRepository;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@Transactional
public class GameService {

    private WordRepository wordRepository;
    private ResultRepository resultRepository;
    private GameRepository gameRepository;
    private static final Logger logger = LoggerFactory.getLogger(GameController.class);


    @Autowired
    public GameService(WordRepository wordRepository, ResultRepository resultRepository, GameRepository gameRepository) {
        this.wordRepository = wordRepository;
        this.resultRepository = resultRepository;
        this.gameRepository = gameRepository;
    }

    public WordSecret getSecretWord() {
        Word newWord = wordRepository.findRandomEntity();
        if (newWord == null) {
            logger.error("No word found in the database.");
            throw new RuntimeException("No word found");
        }
        createNewGame(newWord);
        return mapEntityToDto(newWord);
    }


    public void saveGuessResult(WordInput wordInput, Long secretWordId) {
        if (wordRepository.checkInputWord(wordInput.getWord()) == 1) {
            Result toSave = new Result();
            toSave.setGuessWord(wordInput.getWord());
            toSave.setResult(countGuessResult(wordInput.getWord(), secretWordId));
        }
        //TODO hibaüzenet küldése, ha adatbázisban nem szereplő szót küld le a felhasználó

    }

//    public List<GuessResult> guessResult(WordInput wordInput, Long secretWordId) {
//        String guessWord = wordInput.getWord();
//        GuessResult guess = new GuessResult();
//
//        if (gameRepository.checkInputWord(guessWord) == 1) {
//            guess.setUsedWord(guessWord);
//            guess.setResult(countGuessResult(guessWord, secretWordId));
//        }
//        //TODO hibaüzenet küldése, ha adatbázisban nem szereplő szót küld le a felhasználó
//
//        guessResultList.add(guess);
//        return guessResultList;
//    }

    private Long countGuessResult(String guessWord, Long secretWordId) {
        Long result = 0L;
        String secretWord = wordRepository.findById(secretWordId).orElseThrow(EntityNotFoundException::new).getWord();
        for (int i = 0; i < secretWord.length(); i++) {
            for (int j = 0; j < secretWord.length(); j++) {
                if (secretWord.charAt(i) == guessWord.charAt(j)) {
                    result++;
                }
            }
        }
        System.out.println("Találatok száma: " + result);

        return result;
    }

    private WordSecret mapEntityToDto(Word newWord) {
        WordSecret secretWord = new WordSecret();
        secretWord.setSecretWord(newWord.getWord());
        secretWord.setId(newWord.getId());
        return secretWord;
    }

    private Game createNewGame(Word newWord) {
        Game newGame = new Game();
        newGame.setWord(newWord);
        gameRepository.save(newGame);
        return newGame;
    }


    public List<GuessResult> getGuessList(Long gameId) {


        return null;
    }
}

