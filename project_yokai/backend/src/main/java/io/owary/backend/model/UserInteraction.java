package io.owary.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserInteraction {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Integer id;
    private String type;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    public static final String LIKE = "LIKE";
    public static final String SHARE = "SHARE";
}
