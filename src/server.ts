import fastify from 'fastify';
//import fastifyCors from 'fastify-cors';
import * as dotenv from 'dotenv';
import {PrismaClient} from '@prisma/client';


dotenv.config();
const port: any = process.env.PORT;

const prisma = new PrismaClient();

const server = fastify();

// server.register(fastifyCors);

interface InterfaceLobos {
    familia: string;
    caracteristicas: string;
    pesoMedio: number;
    carnivoro: boolean;
}

server.get('/', (_request, reply) => {
    return "Servidor on-line...";
  });

server.get('/lobos', async (request, reply) => {
  const lobos = await prisma.lobo.findMany();
  return reply.status(201).send(lobos);
});

server.post('/lobos', async (request, reply) => {
    const {
        familia, caracteristicas, pesoMedio, carnivoro
    } = request.body as InterfaceLobos;

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


  server.put<{Params: {postId: string}}>('/post/:postId', async (request, reply) => {
    const  {postId}  = request.params;
    const {
        familia, caracteristicas, pesoMedio, carnivoro
     } = request.body as InterfaceLobos;
  
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



  server.delete<{Params: {id: string}}>('/posts/:id', async (request, reply) => {
    const { id } = request.params;
  
    await prisma.lobo.delete({
         where: { id },
 });
    return reply.status(204).send();
  });
  


server.listen ({port: 3000}, (error, address) => {
    if (error) {
        console.error(error);
        process.exit(1);
    } else {
        console.log(`Servidor rodando em ${address}`);
    }
});


