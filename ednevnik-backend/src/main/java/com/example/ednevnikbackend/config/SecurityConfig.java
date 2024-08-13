package com.example.ednevnikbackend.config;


import com.example.ednevnikbackend.models.Role;
import com.example.ednevnikbackend.services.JWTUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Autowired
    private JWTAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private JWTUserDetailsService jwtUserDetailsService;


    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(jwtUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests((authorize) -> authorize
                                .requestMatchers(HttpMethod.POST, "/api/authentication/login").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/authentication/register").hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.POST, "/api/authentication/change-password").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/authentication/reset-password-request/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "api/users/showAll").hasAuthority("ADMIN").
                                requestMatchers(HttpMethod.GET, "api/users/getUserByUsername/**").hasAuthority("ADMIN").
                                requestMatchers(HttpMethod.PUT, "api/users/editUserById/**").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/school-classes/**").hasAnyAuthority(Role.ADMIN.toString(),Role.PARENT.toString(),Role.PROFESSOR.toString(),Role.STAFF.toString())

                        )
                .sessionManagement(manager -> manager.sessionCreationPolicy(STATELESS))
                .authenticationProvider(daoAuthenticationProvider())
                .addFilterBefore(
                        jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
