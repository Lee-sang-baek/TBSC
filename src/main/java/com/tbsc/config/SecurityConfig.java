package com.tbsc.config;

import com.tbsc.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final MemberService memberService;

    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
       //         .csrf().disable()   // 배포 시 주석 처리
//                .formLogin(formLogin -> formLogin
//                        .loginPage("/member/login")
//                        .usernameParameter("id")
//                        .passwordParameter("password")
//                        .defaultSuccessUrl("/")
//                        .failureUrl("/login/error"))

                .logout(logout -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                        .logoutSuccessUrl("/"))

                .authorizeHttpRequests(request -> request
                        .requestMatchers(new AntPathRequestMatcher("/member/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/**/**/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/**/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/**")).permitAll()
                        // .requestMatchers(new AntPathRequestMatcher("/admin/**")).hasRole("ADMIN")
                        .requestMatchers(new AntPathRequestMatcher("/admin/**")).permitAll()
                        .anyRequest().authenticated())

                .sessionManagement(sm -> sm
                        .maximumSessions(1)
                        .maxSessionsPreventsLogin(false));

//                .exceptionHandling(handling -> handling
//                        .authenticationEntryPoint(authenticationEntryPoint()));
//                .csrf(csrf -> csrf
//                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(memberService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/**");
    }


//    @Bean
//    public AuthenticationEntryPoint authenticationEntryPoint() {
//        return new CustomAuthenticationEntryPoint();
//    }

}
