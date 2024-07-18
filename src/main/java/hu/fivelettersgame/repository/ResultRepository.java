package hu.fivelettersgame.repository;

import hu.fivelettersgame.domain.Game;
import hu.fivelettersgame.domain.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {
    @Query("SELECT r FROM Result r WHERE r.game = :game")
    List<Result> findByGame(@Param("game") Game game);
}
