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

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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
        Optional<Word> newWordOptional = wordRepository.findRandomEntity();
        Word newWord = newWordOptional.orElseThrow(() -> {
            logger.error("No word found in the database.");
            return new RuntimeException("No word found");
        });
        Game newGame = createNewGame(newWord);

        return mapWordEntityToWordSecretDto(newWord, newGame);
    }


    public void saveGuessResult(WordInput wordInput, WordSecret secretWord) {
        if (wordRepository.checkInputWord(wordInput.getWord()) == 1) {
            Result toSave = mapResultEntity(wordInput, secretWord);


        }
        //TODO hibaüzenet küldése, ha adatbázisban nem szereplő szót küld le a felhasználó

    }

    private Result mapResultEntity(WordInput wordInput, WordSecret secretWord) {
        Result result = new Result();

        result.setGuessWord(wordInput.getWord());
        result.setGame(findByGameId(secretWord.getGameId()));
        result.setResult(countGuessResult(wordInput.getWord(), secretWord.getWordId()));

        resultRepository.save(result);
        logger.info("mapResultEntity: " + result.getGuessWord() + "eredmény: "+ result.getResult() + "játék száma: "+ result.getGame().getGameId());

        return result;
    }

    private Game findByGameId(Long gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new EntityNotFoundException("Game not found with id: " + gameId));
        logger.info("findByGameId" + game.getGameId());
        return game;
    }


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

    private WordSecret mapWordEntityToWordSecretDto(Word newWord, Game game) {
        WordSecret secretWord = new WordSecret();
        secretWord.setSecretWord(newWord.getWord());
        secretWord.setWordId(newWord.getId());
        secretWord.setGameId(game.getGameId());
        return secretWord;
    }

    private Game createNewGame(Word newWord) {
        Game newGame = new Game();
        newGame.setWord(newWord);
        newGame.setCreatedAt((LocalDateTime.now()));
        gameRepository.save(newGame);
        return newGame;
    }


//    public List<GuessResult> getGuessList(Long gameId) {
//
//
//        return null;
//    }


}

