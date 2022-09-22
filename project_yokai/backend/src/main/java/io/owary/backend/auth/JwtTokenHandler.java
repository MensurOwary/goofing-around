package io.owary.backend.auth;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenHandler {

    private static final long EXPIRES = 1000 * 60 * 60 * 24 * 2;
    private final String jwtSecret;

    JwtTokenHandler(
            @Value("app.jwt.secret") String jwtSecret
    ) {
        this.jwtSecret = jwtSecret;
    }

    public String generateJwtToken(User user) {
        return Jwts.builder()
                .setSubject(user.name())
                .claim("id", user.id())
                .claim("email", user.email())
                .claim("verified", user.isVerified())
                .setExpiration(new Date(EXPIRES + System.currentTimeMillis()))
                .setIssuer("koneko")
                .setIssuedAt(new Date()) // now
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public boolean isTokenValid(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.warn("JWT token has expired");
        } catch (UnsupportedJwtException e) {
            log.warn("JWT token is unsupported");
        } catch (MalformedJwtException e) {
            log.warn("JWT token is malformed");
        } catch (SignatureException e) {
            log.warn("Incorrect JWT signature");
        } catch (IllegalArgumentException e) {
            log.error("Illegal argument", e);
        }
        return false;
    }

    public String getEmail(String token) {
        final var body = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        return body.get("email", String.class);
    }

    private static final Logger log = LoggerFactory.getLogger(JwtTokenHandler.class);
}
