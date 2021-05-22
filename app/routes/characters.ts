import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import CharacterController from "../controllers/characters";

export default function (server: Server) {

    const characterController = new CharacterController();
    server.bind(characterController);

    server.route({
        method: "GET",
        path: "/character",
        options: {
            handler: characterController.init,
            tags: ["api", "character"],
            description: "Get character.",
            
        }
    });

    server.route({
        method: "GET",
        path: "/character/{film}",
        options: {
            handler: characterController.byMovies,
            tags: ["api", "character"],
            description: "Get character.",
            
        }
    });
}