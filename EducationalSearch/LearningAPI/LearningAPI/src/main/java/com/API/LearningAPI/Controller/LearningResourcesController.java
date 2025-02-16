package com.API.LearningAPI.Controller;

import java.net.URL;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.API.LearningAPI.Service.LearningResourceService;

@RestController
@CrossOrigin(origins = "http://localhost:3000") 
@RequestMapping("/LearningResources")
public class LearningResourcesController {

    @Autowired
    LearningResourceService servicer;

    @PostMapping("/getLinks")
    public List<URL> getLinksMethod(@RequestParam("skill") String skillName){ // @RequestParam("skill") String skillName
        return servicer.getLearningResources(skillName);
    }
    
}
