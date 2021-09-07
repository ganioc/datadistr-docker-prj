package org.exam;

import com.thetransactioncompany.jsonrpc2.client.JSONRPC2Session;

import java.net.URL;

public class Tracker {
    private static String HOST;
    private static int PORT;
    private static String URL;

    public static void main(String[] args) {
        System.out.println("Hello");

        String envHost=System.getenv("HOST");
        HOST = (envHost == null)? "192.168.0.199":envHost;
        String envPort = System.getenv("PORT") ;
        PORT = (envPort == null)?3000:Integer.valueOf(envPort);
        String envUrl = System.getenv("URL");
        URL = (envUrl == null)?"/rpc/v1/":envUrl;

        System.out.printf("Host: %s\nPort: %s\nUrl: %s\n", HOST, String.valueOf(PORT), URL);
        try{
            StringBuilder url = new StringBuilder();
            url.append("http://");
            url.append(HOST);
            url.append(":").append(PORT).append(URL);

            java.net.URL serverURL = new URL(url.toString());

            // Create new JSON-RPC 2.0 client session
            JSONRPC2Session mySession = new JSONRPC2Session(serverURL);


        }catch (Exception e){
            System.out.println("Wrong URL");
            System.out.println("Wrong URL");
        }


        Thread task = new Thread(new Runnable() {
            @Override
            public void run() {
                try{
                    int i =3;
                    while(i-- > 0) {
                        System.out.printf("%d\n", i);
                        Thread.sleep(3000);
                        System.out.println("task ended");
                    }
                }catch (InterruptedException e){
                    e.printStackTrace();
                }
            }
        });

        task.start();

    }
}
