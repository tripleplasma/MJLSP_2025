package com.API.LearningAPI.Service;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.API.LearningAPI.Service.CrawlingStuff.TestObtain;

@Service
public class LearningResourceService {


    // need to figure out params, for what our learning
    // resources api would need
    public List<URL> getLearningResources(String key){
        ArrayList<URL> urls = new ArrayList<>();
        ArrayList<String> links = new ArrayList<>();
        
        try{
            links = TestObtain.getLinks(key);
            for (String link : links){
                urls.add(new URI(link).toURL());
            }
        }catch(Exception e){
        }
        
        return urls;
    } 
    
}
