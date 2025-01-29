import express from 'express';
import { PrismaClient } from '@prisma/client';
// import { Request, Response } from 'express';

const port = 3000;
const app = express();
const prisma = new PrismaClient();

// Middleware para parsing do corpo da requisição como JSON
app.use(express.json());

app.get('/animes', async (_, res) => {
	try {
		const animes = await prisma.anime.findMany({
			orderBy: {
				title: 'asc',
			},
			include: {
				genres: true,
				languages: true,
			},
		});
		res.json(animes);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Erro ao buscar animes' });
	}
});

app.post('/animes', async (req, res) => {
	const { title, genre_id, language_id, description, release_date } = req.body;

	try {
		// Verificar se o anime já existe
		const animeExists = await prisma.anime.findFirst({
			where: { title: { equals: title, mode: 'insensitive' } },
		});
		if (animeExists) {
			res.status(409).send({ message: 'Anime já existe' });
		}

		await prisma.anime.create({
			data: {
				title: title,
				genre_id: genre_id,
				language_id: language_id,
				description: description,
				release_date: new Date(release_date),
			},
		});
		// Enviar uma resposta de sucesso
		res.status(201).send({ message: 'Anime criado com sucesso!' });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Erro ao criar anime' });
	}
});

app.put('/animes/:id', async (req, res) => {
	// console.log(req.params.id);
	try {
		const anime = await prisma.anime.findUnique({
			where: {
				id: Number(req.params.id),
			},
			include: {
				genres: true,
				languages: true,
			},
		});
		if (!anime) {
			res.status(404).send({ message: 'Anime não encontrado' });
		}

		await prisma.anime.update({
			where: {
				id: Number(req.params.id),
			},
			data: {
				title: req.body.title,
				genre_id: Number(req.body.genre_id),
				language_id: Number(req.body.language_id),
				description: req.body.description,
				release_date: new Date(req.body.release_date),
			},
		});
		res.status(200).send({ message: 'Dados atualizados com sucesso!' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Erro ao atualizar anime' });
	}
});

app.listen(port, () => {
	console.log(`Servidor executando na porta ${port}`);
});
