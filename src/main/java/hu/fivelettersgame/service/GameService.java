package hu.fivelettersgame.service;

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

    @Autowired
    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public WordSecret getSecretWord() {
        Word newWord = gameRepository.findRandomEntity();
        return mapEntityToDto(newWord);

    }

    public List<GuessResult> guessResult(WordInput wordInput) {
        String guessWord = wordInput.getWord();
        GuessResult guess = new GuessResult();

        if (gameRepository.checkInputWord(guessWord) == 1) {
            guess.setUsedWord(wordInput);
            guess.setResult(countGuessResult(guessWord));
        }

        List<GuessResult> guessResultList = new ArrayList<>();
        guessResultList.add(guess);
        return guessResultList;
    }

    private Long countGuessResult(String guessWord) {
        Long result = 3L;

        return result;
    }

    private WordSecret mapEntityToDto(Word newWord) {
        WordSecret secretWord = new WordSecret();
        secretWord.setSecretWord(newWord.getWord());
        return secretWord;
    }


}

