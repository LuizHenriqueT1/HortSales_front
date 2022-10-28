export interface Request {
  produto: string;
  quantidade: string;
  condicaoProduto: string;
  unidadeMedida: string;
}

export type typeArrayRequest = Request[];

export type typeListRequest = {
  listaPedidos : typeArrayRequest;
}

//json
// {
//   "listaPedidos": [ {
//     "produto": "Abacate",
//     "quantidade": 100,
//     "condicaoProduto": "verde",
//     "unidadeMedida": "unidade"
// }






