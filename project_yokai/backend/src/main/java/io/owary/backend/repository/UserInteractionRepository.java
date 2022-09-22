package io.owary.backend.repository;

import io.owary.backend.model.UserInteraction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInteractionRepository extends JpaRepository<UserInteraction, Integer> {
}
