import fs from "fs";
import path from "path";
import trataErros from "./erros/FuncoesErro.js";
import { contarPalavras } from "./index.js";
import { montaSaidaArquivo } from "./helpers.js";
import { Command } from "commander";
import chalk from "chalk";

const program = new Command();

program
  .version("0.0.1")
  .option("-t, --texto <string>", "caminho do texto a ser processado")
  .option(
    "-d, --destino <string>",
    "caminho da pasta onde deve ser salvo os resultados",
  )
  .action((option) => {
    const { texto, destino } = option;

    if (!texto || !destino) {
      console.error(chalk.red("erro: favor inserir caminho de origem e destino"));
      program.help();
      return;
    }
    const caminhoTexto = path.resolve(texto);
    const caminhoDestino = path.resolve(destino);
    try {
      processarArquivo(caminhoTexto, caminhoDestino);
    } catch (erro) {
      console.log(chalk.red("Ocorreu um erro no processamento"));
    }
  });

program.parse();

const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];
const endereco = caminhoArquivo[3];

function processarArquivo(texto, destino) {
  fs.readFile(texto, "utf-8", (erro, texto) => {
    try {
      if (erro) throw erro;
      const resultado = contarPalavras(texto);
      criaESalvaArquivo(resultado, destino);
    } catch (erro) {
      trataErros(erro);
    }
  });
}

async function criaESalvaArquivo(listaPalavras, endereco) {
  const arquivoNovo = `${endereco}/resultado.txt`;
  const textoPalavras = montaSaidaArquivo(listaPalavras);
  try {
    await fs.promises.writeFile(arquivoNovo, textoPalavras);
    console.log(chalk.green("Arquivo criado"));
  } catch (erro) {
    throw erro;
  }
}

// function criaESalvaArquivo(listaPalavras, endereco) {
//   const arquivoNovo = `${endereco}/resultado.txt`;
//   const textoPalavras = JSON.stringify(listaPalavras);
//   fs.promises
//     .writeFile(arquivoNovo, textoPalavras)
//     .then(() => {
//       console.log("Arquivo criado");
//     })
//     .catch((erro) => {
//       throw erro;
//     }).finally(() =>{
//       console.log("Operação finalizada")
//     })
// }
