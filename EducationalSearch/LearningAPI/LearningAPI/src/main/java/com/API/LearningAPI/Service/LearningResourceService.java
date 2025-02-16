package com.API.LearningAPI.Service;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class LearningResourceService {


    // need to figure out params, for what our learning
    // resources api would need
    public List<URL> getLearningResources(){
        ArrayList<URL> urls = new ArrayList<>();
        // 
        try{
            URL url1 = new URI("https://www.cs.wisc.edu/").toURL();
            URL url2 = new URI("https://engineering.wisc.edu/").toURL();
            urls.add(url1);
            urls.add(url2);
        }catch(URISyntaxException | MalformedURLException e){
            System.out.println("Error with string format");
        }
        
        return urls;
    } 
    
}
