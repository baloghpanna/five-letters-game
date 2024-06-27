package hu.fivelettersgame.repository;

import hu.fivelettersgame.domain.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {

    @Query("SELECT COUNT(e) FROM Word e")
    long countEntities();

    @Query(value = "SELECT * FROM words ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Word findRandomEntity();

    @Query("SELECT COUNT(w) FROM Word w WHERE w.word = :word")
    long checkInputWord(@Param("word") String word);
}
