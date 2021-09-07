import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { CatsService } from "./cats.service";
import { Cat } from "./interfaces/cat.interface";
import { CreateCatDto } from "./model/create-cat.dto";

@Controller("cats")
export class CatsController {
    constructor(private catsService: CatsService) { }

    @Get()
    findAll(): Cat[] {
        console.log("This action returns all cats");
        return this.catsService.findAll();
        // return 'find all cats';
    }
    @Get("ab*cd")
    findAllWildcard() {
        return "This route uses a wildcard";
    }

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        // return 'This action adds a new cat';
        console.log("createCatDto: ", createCatDto);
        this.catsService.create(createCatDto);
    }
}
