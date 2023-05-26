"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
//import fastifyCors from 'fastify-cors';
const dotenv = __importStar(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv.config();
const port = process.env.PORT;
const prisma = new client_1.PrismaClient();
const server = (0, fastify_1.default)();
server.get('/', (_request, reply) => {
    return "Servidor on-line...";
});
server.get('/lobos', async (request, reply) => {
    const lobos = await prisma.lobo.findMany();
    return reply.status(201).send(lobos);
});
server.post('/lobos', async (request, reply) => {
    const { familia, caracteristicas, pesoMedio, carnivoro } = request.body;
    const newLobo = await prisma.lobo.create({
        data: {
            familia,
            caracteristicas,
            pesoMedio,
            carnivoro,
        },
    });
    return reply.status(201).send(newLobo);
});
server.put('/post/:postId', async (request, reply) => {
    const { postId } = request.params;
    const { familia, caracteristicas, pesoMedio, carnivoro } = request.body;
    const updatePost = await prisma.lobo.updateMany({
        where: { id: postId },
        data: {
            familia,
            caracteristicas,
            pesoMedio,
            carnivoro,
        },
    });
    return reply.status(200).send(updatePost);
});
server.delete('/posts/:id', async (request, reply) => {
    const { id } = request.params;
    await prisma.lobo.delete({
        where: { id },
    });
    return reply.status(204).send();
});
server.listen({ port: 3000 }, (error, address) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    else {
        console.log(`Servidor rodando em ${address}`);
    }
});
