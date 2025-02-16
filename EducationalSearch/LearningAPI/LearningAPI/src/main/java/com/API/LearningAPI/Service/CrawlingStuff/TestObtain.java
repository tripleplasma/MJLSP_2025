package com.API.LearningAPI.Service.CrawlingStuff;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class TestObtain {
    
    public static ArrayList<String> getLinks(String key) throws MalformedURLException, IOException, URISyntaxException {
        
        String url = "http://www.google.com/search?q=";
        String charset = "UTF-8";
        String query = String.format("%s", URLEncoder.encode(key, charset));
        URLConnection con = new URI(url + query).toURL().openConnection();
        con.setRequestProperty("User-Agent",
                "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.4; en-US; rv:1.9.2.2) Gecko/20100316 Firefox/3.6.2");
        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        String wholeThing = "";
        while ((inputLine = in.readLine()) != null) wholeThing += inputLine;
        in.close();
        //System.out.println(wholeThing);

        ArrayList<String> links = new ArrayList<>();
        boolean stillSearching = true;

        while(stillSearching){
            int index = wholeThing.indexOf("href=\"/url?q=");
            stillSearching = false;
            if (index != -1){
                stillSearching = true;
                int startingIndex = index + "href=\"/url?q=".length();
                wholeThing = wholeThing.substring(startingIndex);
                String link = wholeThing.substring(0, wholeThing.indexOf("&amp"));
                links.add(link);
                wholeThing = wholeThing.substring(wholeThing.indexOf('"')+1);
            }
        }

        return links;
    }

    
    public static void main(String[] args) {

    }

}
