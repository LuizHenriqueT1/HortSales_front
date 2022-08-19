export interface Pessoa {
    id?: number;
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    telefone: string;
    endereco: string;
    dataNascimento: string;
    perfils: Perfil[] | string;
    dataCriacao: string;
}

export interface Funcionario extends Pessoa {}

export enum Perfil {
    ADMIN,
    FUNCIONARIO
}
