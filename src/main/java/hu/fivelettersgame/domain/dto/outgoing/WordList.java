package hu.fivelettersgame.domain.dto.outgoing;

import hu.fivelettersgame.domain.dto.incoming.WordInput;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class WordList {
    private List<WordInput> usedWord;
}
