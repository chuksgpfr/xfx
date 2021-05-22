import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import Swapi from "../../config/axios";
import { PrismaClient } from '@prisma/client'
import Joi from "joi"


export default class CommentController {
    public async init(request: Request, h: ResponseToolkit) {
        try {
            const prisma = new PrismaClient()
            const swapi = new Swapi();

            const requester = request.payload;

            let commentSchema = Joi.object({
                name: Joi.string().min(3),
                comment: Joi.string().required().min(3).max(500),
                movieId: Joi.number().required()
            });

            let {value, error} = commentSchema.validate(requester)
            if(error){
                return h.response({error}).code(401);
            }

            const {data, status} = await swapi.init().get(`/films/${value.movieId}`);

            //get ip address
            const xFF = request.headers['x-forwarded-for']
            const ip = xFF ? xFF.split(',')[0] : request.info.remoteAddress

            value.ipAddress = ip;

            await prisma.comments.create({data:value});

            return h.response({ message:"comment added", success:true }).code(200);

        } catch (error) {
            console.log(error.message)
            if(error.message.includes("404")){
                return h.response({ message:"movie does not exists", success:false }).code(500);
            }
            return h.response({ message:"something went wrong" }).code(500);
        }
    }

    public async allComment(request: Request, h: ResponseToolkit) {
        try {
            const prisma = new PrismaClient()

            let comments = await prisma.comments.findMany({
                orderBy:[
                    {
                        createdAt : 'desc'
                    }
                ]
            });

            return h.response({ comments }).code(500);
        } catch (error) {
            return h.response({ message:"something went wrong" }).code(500);
        }
    }

}