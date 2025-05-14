import express from 'express';
// const express = require('express')
import dotenv from 'dotenv';
// const dotenv = require('dotenv')
import { getXataClient } from '../src/xata';
import { createUser, getUser } from '../scripts/users'; 


dotenv.config()
const app = express();

// Datbase
const xata = getXataClient();

app.use(express.json());

// Rotas para Users
app.post('/create_user', createUser);   // Criar usuário (nome, email, senha)
app.get('/get_user', getUser);    // Obter usuário (email, senha)

// Rotas para Cards
app.listen(3000, () => {
    try {
        console.log(`Conectado na porta 3000`)
    } catch {
        console.log("Erro!")
    }
})