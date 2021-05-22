import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import CommentController from "../controllers/comments";

export default function (server: Server) {

    const commentController = new CommentController();
    server.bind(commentController);

    server.route({
        method: "POST",
        path: "/comment",
        options: {
            handler: commentController.init,
            tags: ["api", "comment"],
            description: "add comment.",
        }
    });

    server.route({
        method: "GET",
        path: "/comment",
        options: {
            handler: commentController.allComment,
            tags: ["api", "comment"],
            description: "list all comment.",
        }
    })
}