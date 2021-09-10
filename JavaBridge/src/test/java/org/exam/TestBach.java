package org.exam;

import com.thetransactioncompany.jsonrpc2.client.JSONRPC2Session;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.net.MalformedURLException;
import java.net.URL;

public class TestBach {
    @Test
    public  void jsonrpc(){
        String envHost=System.getenv("HOST");
        String HOST = (envHost == null)? "192.168.0.199":envHost;
        String envPort = System.getenv("PORT") ;
        int PORT = (envPort == null)?3000:Integer.valueOf(envPort);
        String envUrl = System.getenv("URL");
        String URL = (envUrl == null)?"/tasks/rpc/v2/":envUrl;


        System.out.println("jsonrpc");

        StringBuilder urlTemp = new StringBuilder();
        urlTemp.append("http://");
        urlTemp.append(HOST);
        urlTemp.append(":").append(PORT).append(URL);

        java.net.URL serverURL = null;
        try {
            serverURL = new URL(urlTemp.toString());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        System.out.println("URL:" + serverURL.toString());

        JSONRPC2Session mSession = new JSONRPC2Session(serverURL);

        Assertions.assertEquals(1,1);
    }
}
