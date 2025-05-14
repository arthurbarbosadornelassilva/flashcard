import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { getXataClient } from '@/src/xata';
import { UsersRecord } from "@/src/xata";

const xata = getXataClient();
const JWT_SECRET = process.env.JWT_SECRET!;

// Função para criação de novo usuário
export async function createUser(req: express.Request, res: express.Response) {
    try {
        const newUser: Omit<UsersRecord, 'xata_id' | 'senha'> = req.body; // Recebe todos os dados, exceto id e senha (trataremos a senha separadamente)
        const senha = req.body.senha; // Extrai a senha do corpo da requisição

        // 1. Criptografar a senha usando bcrypt
        const saltRounds = 5; // Número de rounds para o hash (mais alto = mais seguro, mais lento)
        const hashedPassword = await bcrypt.hash(senha, saltRounds);

        // 2. Criar o novo usuário com a senha criptografada
        const createUser = await xata.db.users.create({ ...newUser, senha: hashedPassword });

        res.status(201).json(createUser); // Retorna o usuário criado com status 201

    } catch(error: any) {
        console.error("Erro ao criar usuário!", error.message);
        res.status(500).json({error: 'Erro ao criar usuário!'});
    }
}

// Função para obter dados de usuário 
export async function getUser(req: express.Request, res: express.Response): Promise <void> {
    const { email, senha} = req.body;   // Faz a requisição dos valores de email e senha inseridos em body

    if (!email || !senha) {
        res.status(400).json({ error: 'Por favor, forneça email e senha.' });
        return;
    }

    try {
        const getUser = await xata.db.users.getFirst({
            filter: { email: email }
        });

        if (!getUser) {
            res.status(401).json({error: "Credenciais inválidas!"});
            return
        }
        
        // Compara a senha fornecida com o hash armazenado
        const isPasswordMatch = await bcrypt.compare(senha, getUser.senha);

        if (isPasswordMatch) {
            // 1. Criar o payload do token (informações que você quer incluir no token)
            const payload = {
                xata_id: getUser.xata_id,
                nome: getUser.nome,
                email: getUser.email,
            };
            // 2. Assinar o token com a chave secreta e definir opções (opcional)
            const token = jwt.sign(payload, JWT_SECRET, {
                expiresIn: '1h'
            });
            // 3. Enviar o token na resposta
            const { senha: hashedPassword, ...userWithoutPassword } = getUser;
            res.status(200).json({ message: 'Login bem-sucedido!', user: userWithoutPassword, token });

        } else {
            // 4. Senha incorreta
            res.status(401).json({ error: 'Credenciais inválidas!' });
        }

    } catch (error: any) {
        console.error("Erro ao fazer login de usuário!", error.message);
        res.status(500).json({error: 'Erro ao fazer login de usuário!'});
    }
}

// Função para obter nome do usuário
export async function getName(req: express.Request, res: express.Response): Promise <void> {
    try {
        const getName = await xata.db.users.select(['nome']).getMany();

        if (getName) {
            res.status(200).json({ nome: getName });
        } else {
            res.status(404).json({ error: 'Nome do usuário não encontrado no token.' });
        }
    } catch(error: any) {
        console.error("Erro ao obter nome do usuário", error.message)
        res.status(500).json({error: "Erro ao obter nome do usuário!"});
    }
}