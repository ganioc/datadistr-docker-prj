package org.exam;

import com.thetransactioncompany.jsonrpc2.JSONRPC2Request;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Response;
import com.thetransactioncompany.jsonrpc2.client.JSONRPC2Session;

import java.net.URL;
import java.util.HashMap;
import java.util.Map;

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
        URL = (envUrl == null)?"/tasks/rpc/v2/":envUrl;

        System.out.printf("Host: %s\nPort: %s\nUrl: %s\n", HOST, String.valueOf(PORT), URL);
        try{
            StringBuilder url = new StringBuilder();
            url.append("http://");
            url.append(HOST);
            url.append(":").append(PORT).append(URL);

            java.net.URL serverURL = new URL(url.toString());
            System.out.println("URL:" + serverURL.toString());

            // Create new JSON-RPC 2.0 client session
            JSONRPC2Session mySession = new JSONRPC2Session(serverURL);
            // The remote method to call
            String method = "QueryOutTask";

            // The required named parameters to pass
            Map<String,Object> params = new HashMap<String,Object>();
            params.put("pageOffset", 0);
            params.put("pageSize", 10);
            params.put("finished", false);
            params.put("all",true);
            // The mandatory request ID
            String id = "req-001";

            // Create a new JSON-RPC 2.0 request
            JSONRPC2Request reqOut = new JSONRPC2Request(method, params, id);
            // Serialise the request to a JSON-encoded string
            String jsonString = reqOut.toString();

            System.out.println(jsonString);
            JSONRPC2Request reqIn = null;

            reqIn = JSONRPC2Request.parse(jsonString);

            System.out.println("Parsed request with properties :");
            System.out.println("\tmethod     : " + reqIn.getMethod());
            System.out.println("\tparameters : " + reqIn.getNamedParams());
            System.out.println("\tid         : " + reqIn.getID() + "\n\n");

            JSONRPC2Response response = null;
            response = mySession.send(reqIn);

            if (response.indicatesSuccess())
                System.out.println(response.getResult());
            else
                System.out.println(response.getError().getMessage());


        }catch (Exception e){
            System.out.println(e.getMessage());
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
