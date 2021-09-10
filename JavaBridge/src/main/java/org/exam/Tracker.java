package org.exam;

import com.thetransactioncompany.jsonrpc2.JSONRPC2Request;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Response;
import com.thetransactioncompany.jsonrpc2.client.JSONRPC2Session;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class Tracker {
    private static String HOST;
    private static int PORT;
    private static String URL;
    private static JsonRpc jsonRpc;

    public static void main(String[] args) {
        System.out.println("Hello");

        String envHost=System.getenv("HOST");
        HOST = (envHost == null)? "192.168.0.199":envHost;
        String envPort = System.getenv("PORT") ;
        PORT = (envPort == null)?3000:Integer.valueOf(envPort);
        String envUrl = System.getenv("URL");
        URL = (envUrl == null)?"/tasks/rpc/v2/":envUrl;

        System.out.printf("Host: %s\nPort: %s\nUrl: %s\n", HOST, String.valueOf(PORT), URL);

        try {
            jsonRpc = new JsonRpc(HOST, PORT, URL);
        } catch (MalformedURLException e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }

        MonitorTask task = new MonitorTask(jsonRpc);
        task.start();
    }
}
