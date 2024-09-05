package hu.fivelettersgame;

import com.fasterxml.jackson.databind.ObjectMapper;
import hu.fivelettersgame.controller.GameController;
import hu.fivelettersgame.domain.dto.incoming.WordInput;
import hu.fivelettersgame.domain.dto.outgoing.WordSecret;
import hu.fivelettersgame.exception.GlobalExceptionHandler;
import hu.fivelettersgame.service.GameService;
import hu.fivelettersgame.validator.WordInputValidator;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.MessageSource;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class ControllerTest {

    private MockMvc mockMvc;

    @Mock
    private GameService gameServiceMock;

    @BeforeEach
    public void setUp() {
        WordInputValidator wordInputValidator = new WordInputValidator();

        GameController gameController = new GameController(gameServiceMock, wordInputValidator);

        mockMvc = MockMvcBuilders.standaloneSetup(gameController)
                .setControllerAdvice(new GlobalExceptionHandler(messageSource()))
                .build();
    }

    //Minden teszt eset után ellenőrzi, hogy a mock objektumok helyesen használódtak-e
    @AfterEach
    void validate() { validateMockitoUsage();}

    
    @Test
    void testGetSecretWord() throws Exception {
        WordSecret wordSecret = new WordSecret();
        wordSecret.setSecretWord("halom");
        wordSecret.setWordId(1L);
        wordSecret.setGameId(1L);

        when(gameServiceMock.getSecretWord()).thenReturn(wordSecret);

        this.mockMvc.perform(get("/api/words"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.secretWord").value("halom"))
                .andExpect(jsonPath("$.wordId").value(1))
                .andExpect(jsonPath("$.gameId").value(1));

        verify(gameServiceMock, times(1)).getSecretWord();

        verifyNoMoreInteractions(gameServiceMock);
    }
//    @Test
//    void testGuessResult() throws Exception {
//        when(gameServiceMock.saveGuessResult(any(), anyLong())).thenReturn(true);
//
//        this.mockMvc.perform(post("/api/words/1/guess")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(asJsonString("halom")))
//                .andExpect(status().isCreated())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andExpect(jsonPath("$").value(true));
//
//        verify(gameServiceMock, times(1)).saveGuessResult(any(), anyLong());
//
//        verifyNoMoreInteractions(gameServiceMock);
//
//    }


    private MessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();

        messageSource.setBasename("messages");
        messageSource.setUseCodeAsDefaultMessage(true);

        return messageSource;
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
