package io.owary.backend.controller;

import io.owary.backend.auth.User;
import io.owary.backend.model.Post;
import io.owary.backend.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.UUID;

@RestController
@RequestMapping(path = "/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostRepository postRepository;

    @PostMapping
    public ResponseEntity<DefaultResponse> create(@RequestBody PostCreationDto dto, Principal principal) {
        final var user = ((User) ((UsernamePasswordAuthenticationToken) principal).getPrincipal());
        postRepository.save(dto.toPost(user));
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new DefaultResponse(
                        HttpStatus.CREATED.value(),
                        "Successfully created the post",
                        null
                ));
    }

    @GetMapping
    public Collection<PostDto> fetchAll() {
        return postRepository.findAll()
                .stream()
                .sorted((p1, p2) -> p2.timestamp().compareTo(p1.timestamp()))
                .map(PostDto::from)
                .toList();
    }

}

record PostDto(
        String id,
        String content,
        String date
) {

    static PostDto from(Post post) {
        return new PostDto(
                post.id(),
                post.content(),
                post.timestamp().toString()
        );
    }

}

record PostCreationDto(String content) {

    public Post toPost(User user) {
        return new Post(
                UUID.randomUUID().toString(),
                content,
                LocalDateTime.now(),
                Collections.emptyList(),
                user
        );
    }

}
