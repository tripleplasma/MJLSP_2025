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

import org.jsoup.Jsoup;

public class TestObtain {
    
    public static String[] getLinks(String key, int n) throws MalformedURLException, IOException, URISyntaxException {
        
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

        List<String> strings = new ArrayList<String>();
        String search = "<h3 class=\"r\"><a href=\"/url?q=";
        int stringsFound = 0;
        int searchChar = search.length();
        while(stringsFound < n && searchChar <= wholeThing.length()) {
            if(wholeThing.substring(searchChar - search.length(), searchChar).equals(search)) {
                int endSearch = 0;
                while(!wholeThing.substring(searchChar + endSearch, searchChar + endSearch + 4).equals("&amp")) {
                    endSearch++;
                }
                strings.add(wholeThing.substring(searchChar, searchChar + endSearch));
                stringsFound++;
            }
            searchChar++;
        }
        String[] out = new String[strings.size()];
        for(int i = 0; i < strings.size(); i++) {
            out[i] = strings.get(i);
        }
        return out;

    }

    
    public static void main(String[] args) {
        try{
            // Jsoup.connect("https://www.google.com.au/search?q=python").get()
            // .select("h3.r").select("a")
            // .stream()
            // .limit(5)
            // .map(l -> l.attr("href"))
            // .forEach(System.out::println);
            // String[] links = getLinks("python", 5);
            // System.out.println(links.length);
            // for (String s : links){
            //     System.out.println(s);
            // }
            String url = "http://www.google.com/search?q=";
            String charset = "UTF-8";
            String query = String.format("%s", URLEncoder.encode("python", charset));
            URLConnection con = new URI(url + query).toURL().openConnection();
            //con.setRequestProperty("User-Agent",
            //        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.4; en-US; rv:1.9.2.2) Gecko/20100316 Firefox/3.6.2");
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            System.out.println(in.readLine());
        }catch(Exception e){
            System.out.println("Error");
        }

    }

}
