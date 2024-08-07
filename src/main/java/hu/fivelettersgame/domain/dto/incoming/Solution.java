package hu.fivelettersgame.domain.dto.incoming;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Solution {
    private String solutionWord;
    private Boolean isCorrect;
}
