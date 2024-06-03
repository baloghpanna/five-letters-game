package hu.fivelettersgame.domain.dto.outgoing;

import hu.fivelettersgame.domain.dto.incoming.WordInput;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GuessResult {
    private WordInput usedWord;
    private Long result;

}
