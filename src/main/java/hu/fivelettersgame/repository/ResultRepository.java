package hu.fivelettersgame.repository;

import hu.fivelettersgame.domain.Result;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<Result, Long> {
}
