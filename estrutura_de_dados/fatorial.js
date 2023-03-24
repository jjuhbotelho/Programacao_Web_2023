function fatorial(numero) {
    // Verifica se o número é menor que zero, pois não existe fatorial de número negativo
    if (numero < 0) {
        return "Não existe fatorial de número negativo";
    }

    // Caso o número seja igual a zero ou um, o fatorial é 1
    if (numero === 0 || numero === 1) {
        return 1;
    }

    // Caso contrário, calcula o fatorial usando recursão
    return numero * fatorial(numero - 1);
}

