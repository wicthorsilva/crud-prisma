import fastify from 'fastify';
//import fastifyCors from 'fastify-cors';
import * as dotenv from 'dotenv';
import {PrismaClient} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

dotenv.config();
const port: any = process.env.PORT;

const prisma = new PrismaClient();

const server = fastify();

// server.register(fastifyCors);

interface interfaceLobos {
    familia: string;
    caracteristicas: string;
    pesoMedio: number;
    carnivoro: boolean;
}

server.get('/lobos', async (request, reply) => {
  const lobos = await prisma.lobo.findMany();
  return reply.status(201).send(lobos);
});

server.post('/lobos', async (request, reply) => {
    const {
        familia, caracteristicas, pesoMedio, carnivoro
    } = request.body as interfaceLobos;

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


  server.put('/posts/:id', async (request, reply) => {
    const  {id}  = request.params;
    const {
        familia, caracteristicas, pesoMedio, carnivoro
     } = request.body as interfaceLobos;
  
    const updatedPost = await prisma.lobo.update({
      where: { id },
      data: {
        familia,
          caracteristicas,
          pesoMedio,
          carnivoro,
      },
    });
  
    return reply.status(200).send(updatedPost);
  });



  server.delete('/posts/:id', async (request, reply) => {
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


