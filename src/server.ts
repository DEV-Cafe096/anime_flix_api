import express from 'express';
import { PrismaClient } from '@prisma/client';

const port = 3000;
const app = express();
const prisma = new PrismaClient();

app.get('/animes', async (_, res) => {
	try {
		const animes = await prisma.anime.findMany({
            orderBy: {
                title: 'asc'
            },
            include: {
                genres: true,
                languages: true
                
            }
        });
		res.json(animes);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Erro ao buscar animes' });
	}
});

app.listen(port, () => {
	console.log(`Servidor executando na porta ${port}`);
});
