package io.owary.httpcommunicationexamples;

import io.netty.util.concurrent.CompleteFuture;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

import javax.servlet.http.HttpServletResponse;
import java.security.SecureRandom;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping(path = "/long-polling")
public class LongPollingController {

    private static String ALPHABET = "abcdefghik";
    private final SecureRandom random = new SecureRandom();

    private static final Logger log = LoggerFactory.getLogger(LongPollingController.class);

    @GetMapping
    public DeferredResult<String> createAPassword(HttpServletResponse response) {
        log.info("Received the response");
        final var result = new DeferredResult<String>(5000L);
        result.onTimeout(() -> result.setResult("Timeout!"));

        CompletableFuture.runAsync(() -> {
            try {
                log.info("Processing...");
                result.setResult(generateRandomString());
            } catch (Exception ex) {
                log.error("Error occurred: {}", ex.getMessage());
                response.setStatus(HttpStatus.UNPROCESSABLE_ENTITY.value());
                result.setErrorResult("Error occurred!");
            }
        });

        return result;
    }

    private String generateRandomString() throws InterruptedException {
        final var targetLength = random.nextInt(10);

        char[] arr = new char[targetLength];

        for (int i = 0; i < targetLength; i++) {
            int index = random.nextInt(ALPHABET.length());
            arr[i] = ALPHABET.charAt(index);
            Thread.sleep(1000);

            if (random.nextInt(1000000) % 12 == 0) {
                throw new RuntimeException("A random act of God!");
            }
        }

        return String.valueOf(arr);
    }

}
