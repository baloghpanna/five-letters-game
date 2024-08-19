package hu.fivelettersgame;

import com.fasterxml.jackson.databind.ObjectMapper;
import hu.fivelettersgame.controller.GameController;
import hu.fivelettersgame.exception.GlobalExceptionHandler;
import hu.fivelettersgame.service.GameService;
import hu.fivelettersgame.validator.WordInputValidator;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.MessageSource;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.validateMockitoUsage;

@ExtendWith(MockitoExtension.class)
public class ControllerTest {

    private MockMvc mockMvc;

    @Mock
    private GameService gameService;

    @BeforeEach
    public void setUp() {
        WordInputValidator wordInputValidator = new WordInputValidator();

        GameController gameController = new GameController(gameService, wordInputValidator);

        mockMvc = MockMvcBuilders.standaloneSetup(gameController)
                .setControllerAdvice(new GlobalExceptionHandler(messageSource()))
                .build();
    }

    //Minden teszt eset után ellenőrzi, hogy a mock objektumok helyesen használódtak-e
    @AfterEach
    void validate() { validateMockitoUsage();}

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
