// Curso de Engenharia de Software - UniEVANGÉLICA 
// Disciplina de Programação Web 
// Dev: Júlia 
// 24/03/2023 

function fibonacci(limite) {
    // Verifica se o limite é menor que 1, pois não é possível gerar uma série de Fibonacci com menos de 2 números
    if (limite < 1) {
        return [];
    }

    // Define os primeiros dois números da série como 0 e 1
    let a = 0;
    let b = 1;

    // Cria um array para armazenar a série de Fibonacci
    const resultado = [a, b];

    // Gera os próximos números da série enquanto o limite não é alcançado
    while (b < limite) {
        // Calcula o próximo número da série como a soma dos dois anteriores
        const proximo = a + b;

        // Adiciona o próximo número ao array de resultados
        resultado.push(proximo);

        // Atualiza os valores de a e b para os próximos cálculos
        a = b;
        b = proximo;
    }

    return resultado;
}

