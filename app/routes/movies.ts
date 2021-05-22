import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import MovieController from "../controllers/movies/movie";

export default function (server: Server) {

    const movieController = new MovieController();
    server.bind(movieController);

    server.route({
        method: "GET",
        path: "/movies",
        options: {
            handler: movieController.init,
            tags: ["api", "movies"],
            description: "Get movies.",
            
        }
    });

    server.route({
        method: "GET",
        path: "/movies/{name}",
        options: {
            handler: movieController.searchName,
            tags: ["api", "movies"],
            description: "Get movies.",
            
        }
    });
}