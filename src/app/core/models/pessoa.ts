export interface Pessoa {
    id?: number;
    nome?: string;
    email?: string;
    cpf?: string;
    senha?: string;
    telefone?: string;
    endereco?: string;
    dataNascimento?: string;
    dataCriacao: string;
    perfils: Perfil[] | string[]; 
}

export interface Funcionario extends Pessoa {}

export enum Perfil {
    ADMIN,
    FUNCIONARIO
}
