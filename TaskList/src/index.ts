import "reflect-metadata";
import { createConnection, TypeORMError } from "typeorm";
import { User } from "./entity/User";

console.log('hello')

async function main() {
    let connection = await createConnection();
    console.log('visit User')
    let repos = connection.getRepository('User')
    let result = await repos.findAndCount();

    console.log(result)
    connection.close();
}
main()