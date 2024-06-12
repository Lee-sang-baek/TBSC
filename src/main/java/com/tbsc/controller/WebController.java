package com.tbsc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {

    @RequestMapping(value = {"/{path:^(?!api$).*$}/**", "/{path:^(?!api$).*$}"})
    public String redirect() {
        return "forward:/index.html";
    }
}