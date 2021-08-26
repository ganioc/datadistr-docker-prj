import "reflect-metadata";
import { createConnection, TypeORMError } from "typeorm";
import { User } from "./entity/User";

/* createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "John";
    user.lastName = "Smith";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error)); */

async function main() {
    let connection = await createConnection();
    console.log('visit User')
    let repos = connection.getRepository('User')
    let result = await repos.findAndCount();

    console.log(result)
    connection.close();
}
main()
