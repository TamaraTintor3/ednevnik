package com.example.ednevnikbackend.config;

import com.example.ednevnikbackend.models.Role;
import com.example.ednevnikbackend.services.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    @Value("${authorization.token.secret}")
    private String secretKey;

    @Autowired
    private JWTService jwtService;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        if (StringUtils.isEmpty(authHeader) || !StringUtils.startsWith(authHeader, "Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.replace("Bearer", "");
        token = token.replace(" ", "");
        String user = jwtService.extractClaim(token, Claims::getSubject);
        if (user != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            try {
                Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token)
                        .getBody();
                JWTUserDetails jwtUser = new JWTUserDetails();
                jwtUser.setUsername(claims.getSubject());
                jwtUser.setId(Integer.valueOf(claims.getId()));
                jwtUser.setRole(Role.valueOf(claims.get("role", String.class)));
                if (jwtService.isTokenValid(token, jwtUser)) {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(jwtUser, null, jwtUser.getAuthorities());
                    authentication.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }


            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

        }
        filterChain.doFilter(request, response);

    }
}
