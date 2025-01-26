import express from "express";
import { PrismaClient } from "@prisma/client";


const port = 3000;
const app = express();
const prisma = new PrismaClient();

app.get('/animes', async (req, res) => {
    const animes = await prisma.anime.findMany();
    res.json(animes);
})

app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
});
