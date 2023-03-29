// Curso de Engenharia de Software - UniEVANGÉLICA 
// Disciplina de Programação Web 
// Dev: Júlia 
// 24/03/2023 

function contarPalavras(str) {
    // Remove os espaços em branco no início e no fim da string
    str = str.trim();

    // Verifica se a string está vazia
    if (str === "") {
        return 0;
    }

    // Divide a string em palavras usando espaços em branco como separador e retorna o número de palavras
    const palavras = str.split(/\s+/);
    return palavras.length;
}

