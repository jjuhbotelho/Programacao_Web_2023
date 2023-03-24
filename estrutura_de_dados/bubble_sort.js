function bubbleSort(array) {
    const length = array.length;
    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                // Troca os elementos adjacentes
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
}

// Exemplo de uso:
const arr = [3, 5, 1, 4, 2];
console.log(bubbleSort(arr)); // [1, 2, 3, 4, 5]
