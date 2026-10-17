export default function trataErros(erro){
   if(erro.code === 'ENOENT'){
     throw new Error('Arquivo não econtrado')
   } else{
    return 'Erro na aplicação'
   }
}

