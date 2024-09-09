class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        const listaDeAnimais = [
            {especie: 'LEAO', ordem: "carnivoro", tamanho: 3, bioma: ['sabana']},
            {especie: 'LEOPARDO', ordem: "carnivoro", tamanho: 2, bioma: ['sabana']},
            {especie: 'CROCODILO', ordem: "carnivoro", tamanho: 3, bioma: ['rio']},
            {especie: 'MACACO', ordem: "herbivoro", tamanho: 1, bioma: ['sabana', 'floresta']},
            {especie: 'GAZELA', ordem: "herbivoro", tamanho: 2, bioma: ['sabana']},
            {especie: 'HIPOPOTAMO', ordem: "herbivoro", tamanho: 4, bioma: ['sabana', 'rio']}
        ];
        
        const animalEncontrado = listaDeAnimais.find(animalObj => animalObj.especie === animal);
        
        if (!animalEncontrado) {
            return {erro: "Animal inválido"};
        }
        if (quantidade <= 0) {
            return {erro: "Quantidade inválida"};
        }
      
        const recintos = [
            {numero: 1, bioma:['sabana'], capacidadeTotal: 10, ocupados: [{qtd: 3, especie: 'MACACO', ordem: "herbivoro", tamanho: 1}]},
            {numero: 2, bioma:['floresta'], capacidadeTotal: 5, ocupados: []},
            {numero: 3, bioma:['sabana', 'rio'], capacidadeTotal: 7, ocupados: [{qtd: 1, especie: 'GAZELA', ordem: "herbivoro", tamanho: 2}]},
            {numero: 4, bioma:['rio'], capacidadeTotal: 8, ocupados: []},
            {numero: 5, bioma:['sabana'], capacidadeTotal: 9, ocupados: [{qtd: 1, especie: 'LEAO', ordem: "carnivoro", tamanho: 3}]}
        ];
        
        const biomasPermitidos = animalEncontrado.bioma;
        const tamanhoAnimal = animalEncontrado.tamanho;
        const novoEspacoOcupado = tamanhoAnimal * quantidade;
        const ordemAlimentacao = animalEncontrado.ordem;
      
        const recintosViaveis = recintos.filter(recinto => {
            const biomaCompatível = recinto.bioma.some(biomaRecinto => biomasPermitidos.includes(biomaRecinto));
            
            const espacoOcupadoExistente = recinto.ocupados.reduce((total, animalOcupante) => {
                return total + (animalOcupante.qtd * animalOcupante.tamanho);
            }, 0);
            
            const existeEspecieDiferente = recinto.ocupados.some(animalOcupante => animalOcupante.especie !== animal);
            const espacoExtra = existeEspecieDiferente ? 1 : 0;
    
            if (animal === 'HIPOPOTAMO' && existeEspecieDiferente && !(recinto.bioma.includes('sabana') && recinto.bioma.includes('rio'))) {
                return false; 
            }
            
            if (animal === 'MACACO' && recinto.ocupados.length === 0 && quantidade === 1) {
                return false; 
            }
    
            const espacoLivre = recinto.capacidadeTotal - (espacoOcupadoExistente + espacoExtra);
            
            const mesmaOrdemAlimentacao = recinto.ocupados.every(animalOcupante => animalOcupante.ordem === ordemAlimentacao);
            
            return biomaCompatível && espacoLivre >= novoEspacoOcupado && mesmaOrdemAlimentacao;
        });
      
        if (recintosViaveis.length === 0) {
            return {erro: "Não há recinto viável"};
        } else {
            const mensagem = {
                recintosViaveis: recintosViaveis.map(recinto => {
                    const espacoOcupadoExistente = recinto.ocupados.reduce((total, animalOcupante) => {
                        return total + (animalOcupante.qtd * animalOcupante.tamanho);
                    }, 0);
                    const existeEspecieDiferente = recinto.ocupados.some(animalOcupante => animalOcupante.especie !== animal);
                    const espacoExtra = existeEspecieDiferente ? 1 : 0;
                    const espacoLivreFinal = recinto.capacidadeTotal - (espacoOcupadoExistente + espacoExtra + novoEspacoOcupado);
                    return `Recinto ${recinto.numero} (espaço livre: ${espacoLivreFinal} total: ${recinto.capacidadeTotal})`;
                })
            };
            return mensagem;
        }
    }

}

export { RecintosZoo as RecintosZoo };
