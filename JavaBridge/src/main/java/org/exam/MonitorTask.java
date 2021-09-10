package org.exam;

import com.thetransactioncompany.jsonrpc2.JSONRPC2Response;

public class MonitorTask {
    private Thread task;

    public MonitorTask(JsonRpc jsonRpc) {



        this.task = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("Task started");
                try {
                    int i = 10;
                    while (i-- > 0) {
                        System.out.printf("%d\n", i);
                        try{
                            JSONRPC2Response response = jsonRpc.getState();
                            if (response.indicatesSuccess())
                                System.out.println(response.getResult());
                            else
                                System.out.println(response.getError().getMessage());
                        }catch (Exception e){
                                System.out.println(e.getMessage());
                        }

                        Thread.sleep(5000);
                        System.out.println("timeout");
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    public void start() {
        this.task.start();
    }
}
