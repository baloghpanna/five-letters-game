package hu.fivelettersgame.service;

import hu.fivelettersgame.domain.Result;
import hu.fivelettersgame.domain.Word;
import hu.fivelettersgame.domain.dto.incoming.WordInput;
import hu.fivelettersgame.domain.dto.outgoing.GuessResult;
import hu.fivelettersgame.domain.dto.outgoing.WordSecret;
import hu.fivelettersgame.repository.GameRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@Transactional
public class GameService {

    private GameRepository gameRepository;
    private Random random = new Random();
    List<GuessResult> guessResultList = new ArrayList<>();


    @Autowired
    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public WordSecret getSecretWord() {
        Word newWord = gameRepository.findRandomEntity();
        return mapEntityToDto(newWord);

    }

    public void saveGuessResult(WordInput wordInput, Long secretWordId) {
        if (gameRepository.checkInputWord(wordInput.getWord()) == 1) {
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
        String secretWord = gameRepository.findById(secretWordId).orElseThrow(EntityNotFoundException::new).getWord();
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


    public List<GuessResult> getGuessList(Long gameId) {


        return null;
    }
}

