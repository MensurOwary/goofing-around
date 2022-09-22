package io.owary.backend.model;

import io.owary.backend.auth.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "posts")
@Data
@Accessors(fluent = true)
@AllArgsConstructor
@NoArgsConstructor
public class Post {

    @Id
    private String id;
    private String content;
    private LocalDateTime timestamp;

    @OneToMany(mappedBy = "post", cascade = {CascadeType.ALL})
    private List<UserInteraction> interactions;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Post(String content, LocalDateTime timestamp, User user) {
        this.id = UUID.randomUUID().toString();
        this.content = content;
        this.timestamp = timestamp;
        this.user = user;
        this.interactions = new ArrayList<>();
    }
}
