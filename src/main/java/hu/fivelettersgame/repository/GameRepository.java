package hu.fivelettersgame.repository;

import hu.fivelettersgame.domain.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
}
