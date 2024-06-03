package hu.fivelettersgame.validator;

import hu.fivelettersgame.domain.dto.incoming.WordInput;
import hu.fivelettersgame.repository.GameRepository;
import hu.fivelettersgame.service.GameService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
@NoArgsConstructor
public class WordInputValidator implements Validator {

    private GameRepository gameRepository;

    @Autowired
    public WordInputValidator(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return WordInput.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        WordInput wordInput = (WordInput) o;

        if (wordInput.getWord() == null || wordInput.getWord().isEmpty() || wordInput.getWord().isBlank()) {
            errors.rejectValue("word", "wordInput.getWord.empty");
        }
        if ((gameRepository.checkInputWord(wordInput.getWord()) == 0)) {
            errors.rejectValue("word", "wordInput.getWord.dontFind");
        }
    }
}

