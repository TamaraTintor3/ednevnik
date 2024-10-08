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
                        .requestMatchers(HttpMethod.GET, "/api/school-classes/**").hasAnyAuthority(Role.ADMIN.toString(), Role.PARENT.toString(), Role.PROFESSOR.toString(), Role.STAFF.toString())
                        .requestMatchers(HttpMethod.POST, "api/school-classes/addClass").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "api/school-classes/byUserId/**").hasAnyAuthority(Role.ADMIN.toString(), Role.PROFESSOR.toString())
                        .requestMatchers(HttpMethod.POST, "api/school-classes/{classId}/students/add").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "api/parents/**").hasAnyAuthority("ADMIN", Role.PARENT.toString(),Role.PROFESSOR.toString())


                        .requestMatchers(HttpMethod.GET, "api/grades/bySchoolClassIdAndProfessorId/**").hasAnyAuthority(Role.ADMIN.toString(), Role.PROFESSOR.toString())
                        .requestMatchers(HttpMethod.GET, "api/users/getProfessorByUserId/**").hasAnyAuthority(Role.ADMIN.toString(), Role.PROFESSOR.toString())
                        .requestMatchers(HttpMethod.GET, "api/subjects/**").hasAnyAuthority(Role.ADMIN.toString(), Role.PARENT.toString(), Role.PROFESSOR.toString())
                        .requestMatchers(HttpMethod.POST, "/api/absences/add").hasAuthority("PROFESSOR")
                        .requestMatchers(HttpMethod.POST, "/api/professors/class").hasAuthority(Role.PROFESSOR.toString())
                        .requestMatchers(HttpMethod.POST, "/api/grades/addGrade").hasAuthority("PROFESSOR")
                        .requestMatchers(HttpMethod.PUT, "/api/grades/editGradeById/**").hasAuthority("PROFESSOR")
                        .requestMatchers(HttpMethod.GET, "/api/grades/getFinalGrade/**").hasAnyAuthority(Role.PROFESSOR.toString(),Role.PARENT.toString())
                        .requestMatchers(HttpMethod.GET, "/api/grades/details/**").hasAnyAuthority(Role.PROFESSOR.toString(),Role.PARENT.toString())
                        .requestMatchers(HttpMethod.GET, "/api/students/{id}").hasAuthority(Role.PROFESSOR.toString())
                        .requestMatchers(HttpMethod.GET, "/api/students/byParentId/**").hasAuthority(Role.PARENT.toString())
                        .requestMatchers(HttpMethod.PUT, "/api/absences/{id}").hasAuthority("PROFESSOR")
                        .requestMatchers(HttpMethod.GET, "/api/absences/student/{studentId}").hasAuthority("PROFESSOR")
                        .requestMatchers(HttpMethod.GET, "/api/students/absence/{studentId}").hasAuthority("PROFESSOR")
                        .requestMatchers(HttpMethod.POST, "/api/student-classes/add").hasAuthority("PROFESSOR")
                        .requestMatchers(HttpMethod.GET, "/api/student-classes/{id}").hasAuthority("PROFESSOR")
                        .requestMatchers(HttpMethod.GET, "/api/student-classes/{studentId}").hasAuthority("PROFESSOR")
                        .requestMatchers(HttpMethod.PUT, "/api/student-classes/update/{id}").hasAuthority("PROFESSOR")

                        .requestMatchers(HttpMethod.GET,"/api/events/**").hasAuthority(Role.PROFESSOR.toString())
                        .requestMatchers(HttpMethod.POST,"/api/events/**").hasAuthority(Role.PROFESSOR.toString())
                        .requestMatchers(HttpMethod.DELETE,"/api/events/**").hasAuthority(Role.PROFESSOR.toString())

                        .requestMatchers(HttpMethod.GET,"/api/schedule-subjects/class-schedule/{classScheduleId}").hasAnyAuthority(Role.PARENT.toString(), Role.PROFESSOR.toString())
                        .requestMatchers(HttpMethod.GET,"/api/class-schedules/{userId}").hasAuthority("PARENT")


                        .requestMatchers(HttpMethod.POST,"/api/class-schedules/get-or-create").hasAuthority("PROFESSOR")
                        .requestMatchers(HttpMethod.POST,"/api/schedule-subjects/add").hasAuthority("PROFESSOR")
                        .requestMatchers(HttpMethod.PUT,"/api/schedule-subjects/{id}").hasAuthority("PROFESSOR")
                        .requestMatchers(HttpMethod.GET,"/api/subjects/getAll").hasAuthority("PROFESSOR")
                        .requestMatchers(HttpMethod.GET,"/api/absences/parent/**").hasAuthority(Role.PARENT.toString())




                                .requestMatchers(HttpMethod.GET,"/api/grades/details/**").hasAuthority(Role.PROFESSOR.toString())
                                .requestMatchers(HttpMethod.PUT,"/api/absences/{id}").hasAuthority("PROFESSOR")
                                .requestMatchers(HttpMethod.GET,"/api/absences/student/{studentId}").hasAuthority("PROFESSOR")
                                .requestMatchers(HttpMethod.POST,"/api/student-classes/add").hasAuthority("PROFESSOR")
                                .requestMatchers(HttpMethod.GET,"/api/student-classes/{id}").hasAuthority("PROFESSOR")
                                .requestMatchers(HttpMethod.GET,"/api/student-classes/{studentId}").hasAuthority("PROFESSOR")
                                .requestMatchers(HttpMethod.PUT,"/api/student-classes/update/{id}").hasAuthority("PROFESSOR")
                                .requestMatchers(HttpMethod.POST,"/api/class-schedules/get-or-create").hasAuthority("PROFESSOR")
                                .requestMatchers(HttpMethod.POST,"/api/schedule-subjects/add").hasAuthority("PROFESSOR")
                                .requestMatchers(HttpMethod.PUT,"/api/schedule-subjects/{id}").hasAuthority("PROFESSOR")
                                .requestMatchers(HttpMethod.GET,"/api/schedule-subjects/class-schedule/{classScheduleId}").hasAnyAuthority(Role.PARENT.toString(), Role.PROFESSOR.toString())
                                .requestMatchers(HttpMethod.GET,"/api/subjects/getAll").hasAuthority("PROFESSOR")
                                .requestMatchers(HttpMethod.GET,"/api/class-schedules/{userId}").hasAuthority("PARENT")
                                .requestMatchers(HttpMethod.PUT,"/api/authentication/{userId}/assign-class").hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.GET,"/api/authentication/getStatus/{userId}").hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.GET,"/api/users/professors").hasAuthority("ADMIN")





                        .requestMatchers(HttpMethod.GET, "/api/student-classes/byParentId/{parentId}").hasAnyAuthority("PROFESSOR",Role.PARENT.toString())
                        .requestMatchers(HttpMethod.GET, "/api/school-years/current").hasAnyAuthority(Role.ADMIN.toString(),Role.PARENT.toString(), Role.PROFESSOR.toString())
                        .requestMatchers(HttpMethod.GET, "/api/students/gradesOrderedByDate/{parentId}/{schoolYearId}").hasAuthority(Role.PARENT.toString())
                        .requestMatchers(HttpMethod.GET,"/api/professors/school-class/{schoolClassId}").hasAuthority("ADMIN")

                        .requestMatchers(HttpMethod.GET,"/api/messages/parent/{parentId}").hasAuthority(Role.PARENT.toString())
                        .requestMatchers(HttpMethod.GET,"/api/messages/professor/{professorId}").hasAuthority(Role.PROFESSOR.toString())
                        .requestMatchers(HttpMethod.POST,"/api/messages").hasAnyAuthority(Role.PARENT.toString(),Role.PROFESSOR.toString())
                        .requestMatchers(HttpMethod.POST,"/api/messages/opened/{messageId}").hasAnyAuthority(Role.PARENT.toString(),Role.PROFESSOR.toString())
                        .requestMatchers(HttpMethod.GET,"/api/messages/{messageId}").hasAnyAuthority(Role.PARENT.toString(),Role.PROFESSOR.toString())
                        .requestMatchers(HttpMethod.GET,"/api/professors").hasAnyAuthority(Role.PARENT.toString(), Role.ADMIN.toString())
                        .requestMatchers(HttpMethod.GET,"/api/professors/byId/**").hasAnyAuthority(Role.ADMIN.toString())
                        .requestMatchers(HttpMethod.GET,"/api/professors/getProfessorsWithoutSubject").hasAnyAuthority(Role.ADMIN.toString())


                        .requestMatchers(HttpMethod.POST,"/api/subjects").hasAnyAuthority(Role.ADMIN.toString())

                        .requestMatchers(HttpMethod.POST,"/api/teachings").hasAnyAuthority(Role.ADMIN.toString())
                        .requestMatchers(HttpMethod.GET,"/api/teachings/professors/**").hasAnyAuthority(Role.ADMIN.toString())
                )
                .sessionManagement(manager -> manager.sessionCreationPolicy(STATELESS))
                .authenticationProvider(daoAuthenticationProvider())
                .addFilterBefore(
                        jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
