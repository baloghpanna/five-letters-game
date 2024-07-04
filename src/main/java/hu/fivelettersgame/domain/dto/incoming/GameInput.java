package hu.fivelettersgame.domain.dto.incoming;

import hu.fivelettersgame.domain.dto.outgoing.WordSecret;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GameInput {
    private WordInput wordInput;
    private WordSecret wordSecret;
}
