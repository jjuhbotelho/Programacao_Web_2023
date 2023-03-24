// Curso de Engenharia de Software - UniEVANGÉLICA 
// Disciplina de Programação Web 
// Dev: Júlia 
// 24/03/2023 

function inverterString(str) {
    let resultado = "";

    // Itera a string de trás para frente e concatena cada caractere na variável resultado
    for (let i = str.length - 1; i >= 0; i--) {
        resultado += str[i];
    }

    return resultado;
}

