package io.owary.httpcommunicationexamples;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.security.SecureRandom;
import java.time.Duration;

@RestController
@RequestMapping(path = "/sse")
public class ServerSentEventController {

    private final SecureRandom random = new SecureRandom();

    @GetMapping(path = "/flux", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> getShakespeare() {
        return Flux.interval(Duration.ofSeconds(1))
                .map(e -> random.nextInt(15000))
                .map(Object::toString);
    }

}
