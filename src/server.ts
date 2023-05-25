import fastify from "fastify";
// import cors from "@fastify/cors";
import dotenv from "dotenv";
import {PrismaClient} from "@prisma/client"

dotenv.config();
const port: any = process.env.PORT;

const prisma = new PrismaClient();

const server = fastify();

// server.register(cors, {
//     //Opções
// })

server.get('/', (request, reply) => {
    return "Servidor on-line...";
});

interface UserAttrs {
    email: string,
    password: string,
}

server.listen ({port: 3000}, (error, address) => {
    if (error) {
        console.error(error);
        process.exit(1);
    } else {
        console.log(`Servidor rodando em ${address}`);
    }
});
