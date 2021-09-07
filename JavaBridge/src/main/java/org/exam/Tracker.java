package org.exam;

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
        URL = (envUrl == null)?"/":envUrl;

        System.out.printf("Host: %s\nPort: %s\nUrl: %s\n", HOST, String.valueOf(PORT), URL);

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
