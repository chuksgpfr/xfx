import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import Swapi from "../../config/axios";
import { PrismaClient } from '@prisma/client'

export default class MovieController {
    public async init(request: Request, h: ResponseToolkit) {
        try {
            const prisma = new PrismaClient()

            const movies: Array<object>=[];

            const swapi = new Swapi();

            const {data} = await swapi.init().get('/films');

            for (let i = 0; i < data.results.length; i++) {
                const element = data.results[i];

                const {title, opening_crawl, release_date, episode_id} = element;
                let comment = await prisma.comments.findMany({
                    where:{
                        movieId:{
                            equals: episode_id
                        }
                    }
                });
                
                movies.push({title, opening_crawl, comment_count: comment.length});
            }

            return h.response({ movies }).code(200);

        } catch (error) {
            return h.response({ message:"something went wrong"}).code(500);
        }
    }

    public async searchName(request: Request, h: ResponseToolkit) {
        try {
            
            
            const {name} = request.params;

            const movies: Array<object>=[];

            const swapi = new Swapi();

            const {data} = await swapi.init().get('/films');

            data.results.forEach((movie:any) => {
                const {title, opening_crawl, release_date} = movie;
                movies.push({title, opening_crawl, release_date});
            });

            const filtered:any = movies.filter((movie:any)=>movie.title === name)

            return filtered.length > 0 ?  
                h.response({filtered}).code(200) 
                :  
                h.response({error:"this is not a star war's movie"}).code(401)
            

        } catch (error) {
            return h.response({ error:"something went wrong"}).code(500);
        }
    }
}