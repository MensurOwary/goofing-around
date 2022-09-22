package io.owary.backend;

import io.owary.backend.auth.User;
import io.owary.backend.auth.UserRepository;
import io.owary.backend.model.Post;
import io.owary.backend.repository.PostRepository;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.ResourceUtils;

import java.io.FileNotFoundException;
import java.nio.file.Files;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootApplication
@EnableScheduling
@Slf4j
public class BackendApplication implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final PasswordEncoder encoder;

    private List<String> randomTextSource;

    private ThreadLocal<SecureRandom> random = ThreadLocal.withInitial(SecureRandom::new);

    @SneakyThrows
    public BackendApplication(UserRepository userRepository, PostRepository postRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.encoder = encoder;

        this.randomTextSource = Files.lines(
                ResourceUtils.getFile("classpath:text-source.txt").toPath()
        ).toList();
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) {
        userRepository.saveAll(
                List.of(
                        new User(UUID.randomUUID().toString(), "jane", "jane@doe.com", encoder.encode("hello"), false, Collections.emptyList()),
                        new User(UUID.randomUUID().toString(), "john", "john@doe.com", encoder.encode("hazza"), false, Collections.emptyList())
                )
        );
    }

    @Scheduled(initialDelay = 5, fixedRate = 10, timeUnit = TimeUnit.SECONDS)
    public void produceFakePosts() {
        try {
            final var users = userRepository.findAll();
            Collections.shuffle(users);
            final var randomUser = users.get(0);

            var size = randomTextSource.size();
            var i1 = random.get().nextInt(size);
            var i2 = random.get().nextInt(size);
            var limit = Math.max(random.get().nextInt(15), 5);

            final var strings = Stream.of(randomTextSource.get(i1), randomTextSource.get(i2))
                    .flatMap(e -> List.of(e.replaceAll("[^A-Za-z0-9-']", " ").split(" ")).stream())
                    .map(String::toLowerCase)
                    .limit(limit)
                    .collect(Collectors.toList());

            Collections.shuffle(strings);

            final var content = String.join(" ", strings);

            final var post = new Post(
                    content, LocalDateTime.now(), randomUser
            );

            postRepository.save(post);
            log.info("Created a random post");
        } catch (Exception exception) {
            log.error("Exception occurred", exception);
        }
    }
}
