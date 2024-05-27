package hu.fivelettersgame.service;

import hu.fivelettersgame.domain.Word;
import hu.fivelettersgame.domain.dto.outgoing.WordSecret;
import hu.fivelettersgame.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    private WordSecret mapEntityToDto(Word newWord) {
        WordSecret secretWord = new WordSecret();
        secretWord.setSecretWord(newWord.getWord());
        return secretWord;
    }

}

