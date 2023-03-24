// Curso de Engenharia de Software - UniEVANGÉLICA 
// Disciplina de Programação Web 
// Dev: Júlia 
// 24/03/2023 

function verificarPrimo(numero) {
    // Verifica se o número é menor que 2, pois não é possível que seja primo
    if (numero < 2) {
        return false;
    }

    // Percorre os números de 2 a metade do número e verifica se é divisível por algum deles
    for (let i = 2; i <= numero / 2; i++) {
        if (numero % i === 0) {
            return false;
        }
    }

    return true;
}
