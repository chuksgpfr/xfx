import * as Hapi from "@hapi/hapi";
import Movies from "./routes/movies";
import Character from "./routes/characters";
import Comment from './routes/comments'


export async function main(): Promise<Hapi.Server> {
    try {
        const port = process.env.PORT || 3003;

        const server = new Hapi.Server({
            debug: { request: ['error'] },
            port: port,
            routes: {
                cors: {
                    origin: ["*"]
                }
            }
        });

        // Logs.init(server, configs, database);
        Movies(server);
        Character(server);
        Comment(server);

        return server;


    } catch (error) {
        console.log("Error starting server: ", error);
        throw error;
    }
}