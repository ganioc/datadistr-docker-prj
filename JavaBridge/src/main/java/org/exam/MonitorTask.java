package org.exam;

public class MonitorTask {
    private Thread task;

    public MonitorTask() {
        this.task = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("Task started");
                try {
                    int i = 10;
                    while (i-- > 0) {
                        System.out.printf("%d\n", i);
                        Thread.sleep(3000);
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
