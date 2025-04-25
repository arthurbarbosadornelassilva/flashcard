import express from 'express'
import dotenv from 'dotenv'
import { getXataClient } from './xata'
import { SelectedPick, SelectableColumn, EditableData } from '@xata.io/client'
import { UserRecord } from './xata'

const app = express() 
const PORT: number = Number(process.env.PORT) || 3000

// Datbase
const xata = getXataClient()
const fields: SelectableColumn<UserRecord>[] = ['id', 'nome', 'senha']

type aluno = EditableData<SelectedPick<UserRecord, typeof fields>>

// async function conectarAoBD {
/**
 * // Generated with CLI
import { getXataClient } from "./xata";
const xata = getXataClient();

const record = await xata.db.tableName.read("rec_xyz");
console.log(record);
 */
// }

app.listen(PORT, () => {
    try {
        console.log(`Aplicação escutando a porta ${PORT}.`)
        // Comando para conectar ao banco de dados online (tabela de usuários)
    } catch {
        console.error(`Houve um erro ao tentar escutar a porta ${PORT}`)
    }
})