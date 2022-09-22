package io.owary.backend.auth;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {

    private final JwtTokenHandler jwt;
    private final UserDetailsManager userDetailsManager;

    @Override
    @SneakyThrows
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) {
        if (doesNotHaveAuthorizationHeader(req)) {
            chain.doFilter(req, res);
            return;
        }

        final var token = req.getHeader("Authorization").replace("Bearer ", "");

        if (!jwt.isTokenValid(token)) {
            chain.doFilter(req, res);
            return;
        }

        final var email = jwt.getEmail(token);

        final var userDetails = userDetailsManager.loadUserByUsername(email);

        final var auth = new UsernamePasswordAuthenticationToken(userDetails, null);

        auth.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(req)
        );

        SecurityContextHolder.getContext().setAuthentication(auth);

        chain.doFilter(req, res);
    }

    private boolean doesNotHaveAuthorizationHeader(HttpServletRequest req) {
        final var authorization = req.getHeader("Authorization");
        return ObjectUtils.isEmpty(authorization) || !authorization.startsWith("Bearer");
    }

    private final static Logger log = LoggerFactory.getLogger(JwtTokenFilter.class);
}
