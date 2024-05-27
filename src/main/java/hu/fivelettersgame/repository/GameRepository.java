package hu.fivelettersgame.repository;

import hu.fivelettersgame.domain.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Word, Long> {
}
