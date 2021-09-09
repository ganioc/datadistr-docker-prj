package org.exam;

import com.thetransactioncompany.jsonrpc2.JSONRPC2ParseException;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Request;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Response;
import com.thetransactioncompany.jsonrpc2.client.JSONRPC2Session;
import com.thetransactioncompany.jsonrpc2.client.JSONRPC2SessionException;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class JsonRpc {
    private String mHost;
    private  int mPort;
    private  String mUrl;
    private  JSONRPC2Session mSession;
    private int id =1;

    private  int getId(){
        id++;
        return id;
    }

    public JsonRpc( String host, int port, String url) throws MalformedURLException {
        this.mHost = host;
        this.mPort = port;
        this.mUrl = url;

        StringBuilder urlTemp = new StringBuilder();
        urlTemp.append("http://");
        urlTemp.append(host);
        urlTemp.append(":").append(port).append(url);

        java.net.URL serverURL = new URL(url.toString());
        System.out.println("URL:" + serverURL.toString());

        this.mSession = new JSONRPC2Session(serverURL);
    }

    public JSONRPC2Response queryOutTask(int pageOffset, int pageSize, boolean finished, boolean getAll) throws JSONRPC2ParseException, JSONRPC2SessionException {
        String method = "QueryOutTask";

        // The required named parameters to pass
        Map<String,Object> params = new HashMap<String,Object>();
        params.put("pageOffset", 0);
        params.put("pageSize", 10);
        params.put("finished", false);
        params.put("all",true);
        // The mandatory request ID
        String id = "req"+ getId();

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

        JSONRPC2Response response = this.mSession.send(reqIn);

//        if (response.indicatesSuccess())
//            System.out.println(response.getResult());
//        else
//            System.out.println(response.getError().getMessage());

        return response;
    }
}
