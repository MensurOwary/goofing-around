package io.owary.backend.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.UUID;

@RestController
@RequestMapping(path = "/auth")
@RequiredArgsConstructor
//@CrossOrigin(origins = "*", allowedHeaders = "*")
class AuthenticationController {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtTokenHandler tokenHandler;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@RequestBody AuthRequest req, HttpServletResponse resp) {
        var user = new User(
                UUID.randomUUID().toString(),
                req.name(),
                req.email(),
                encoder.encode(req.password()),
                false,
                Collections.emptyList()
        );
        final var savedUser = userRepository.save(user);

        var token = tokenHandler.generateJwtToken(savedUser);
        return new AuthResponse(token);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public AuthResponse login(@RequestBody AuthRequest req) {
        final var maybeUser = userRepository.findByEmail(req.email());
        if (maybeUser.isEmpty()) {
            throw new BadCredentialsException("User not found");
        }

        final var principal = maybeUser.get();

        if (!encoder.matches(req.password(), principal.password())) {
            throw new BadCredentialsException("User not found");
        }

        final var token = tokenHandler.generateJwtToken(principal);

        return new AuthResponse(token);
    }

}

record AuthResponse(String token) { }
record AuthRequest(String name, String email, String password) { }
