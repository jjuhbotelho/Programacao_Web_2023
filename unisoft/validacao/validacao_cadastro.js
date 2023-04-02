$('#form_cadastro').submit(function (e) {
    //Não permite que a página atualize
    e.preventDefault();

    //Variáveis do Nome com regEX pra filtrar
    var nomeFilter = /^([a-zA-Z \t]{3,15})+$/;
    var nomeText = $("#nome").val();

    //---------------------- Nome -----------------------------
    //Teste para validação -> verdadeiro retorna verde, falso retorna vermelho
    if (nomeFilter.test(nomeText)) {
        $("#nome").removeClass('is-invalid');
        $("#nome").addClass('is-valid');
    } else {
        $("#nome").removeClass('is-valid');
        $("#nome").addClass('is-invalid');
    }

    // --------------------- Sobrenome -----------------------
    //Variáveis do Sobrenome com regEX pra filtrar
    var sobrenomeFilter = /^([a-zA-Z \t]{3,15})+$/;
    var sobrenomeText = $("#sobrenome").val();

    if (sobrenomeFilter.test(sobrenomeText)) {
        $("#sobrenome").removeClass('is-invalid');
        $("#sobrenome").addClass('is-valid');
    } else {
        $("#sobrenome").removeClass('is-valid');
        $("#sobrenome").addClass('is-invalid');
    }

    //Variáveis do Telefone com regEX pra filtrar
    var telefoneFilter = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/
    var telefoneText = $("#telefone").val();

    if (telefoneFilter.test(telefoneText)) {
        $("#telefone").removeClass('is-invalid');
        $("#telefone").addClass('is-valid');
        console.log(111)
    } else {
        $("#telefone").removeClass('is-valid');
        $("#telefone").addClass('is-invalid');
    }

    // ----------------------- CPF / CNPJ -----------------------
    //Variáveis do CPF e CNPJ
    var cpfCnpj = $("#cpf_cnpj").val();
    //Tira os caracteres especiais da string
    cpfCnpj = cpfCnpj.replace(/[^\d]+/g, '');

    //Se tiver 11 dígitos = CPF
    if (cpfCnpj.length === 11) {
        if (validarCPF(cpfCnpj)) {
            $("#cpf_cnpj").removeClass('is-invalid');
            $("#cpf_cnpj").addClass('is-valid');
        } else {
            $("#cpf_cnpj").removeClass('is-valid');
            $("#cpf_cnpj").addClass('is-invalid');
            cpfCnpj = false;
        }
        //Se tiver 14 dígitos = CNPJ     
    } else if (cpfCnpj.length === 14) {
        if (validarCnpj(cpfCnpj)) {
            $("#cpf_cnpj").removeClass('is-invalid');
            $("#cpf_cnpj").addClass('is-valid');
        } else {
            $("#cpf_cnpj").removeClass('is-valid');
            $("#cpf_cnpj").addClass('is-invalid');
            cpfCnpj = false;
        }
    } else {
        $("#cpf_cnpj").removeClass('is-valid');
        $("#cpf_cnpj").addClass('is-invalid');
        cpfCnpj = false;
    }

    var dataNascimento = $("#data_nascimento").val();

    if (dataNascimento) {
        $("#data_nascimento").removeClass('is-invalid');
        $("#data_nascimento").addClass('is-valid');
    } else {
        $("#data_nascimento").removeClass('is-valid');
        $("#data_nascimento").addClass('is-invalid');
    }


    //Se o teste der falso retorna nada
    if ((!nomeFilter.test(nomeText)) || (!sobrenomeFilter.test(sobrenomeText)) ||
        (!telefoneFilter.test(telefoneText)) || !cpfCnpj) {
        return;
    }
    //Se o teste der verdadeiro mostra a mensagem     
    $("#form_cadastro").css("display", "none");
    $("#form").append("<h2 class='text-center'>Cadastro realizado!</h2>");
    return;

});

//Só aceita CPF válidos
function validarCPF(cpf) {
    if (cpf == '') return false;
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;

    return true;
}

function validarCnpj(cnpj) {
    if (!cnpj || cnpj.length != 14
        || cnpj == "00000000000000"
        || cnpj == "11111111111111"
        || cnpj == "22222222222222"
        || cnpj == "33333333333333"
        || cnpj == "44444444444444"
        || cnpj == "55555555555555"
        || cnpj == "66666666666666"
        || cnpj == "77777777777777"
        || cnpj == "88888888888888"
        || cnpj == "99999999999999")
        return false
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho)
    let digitos = cnpj.substring(tamanho)
    let soma = 0
    let pos = tamanho - 7
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--
        if (pos < 2) pos = 9
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
    if (resultado != digitos.charAt(0)) return false;
    tamanho = tamanho + 1
    numeros = cnpj.substring(0, tamanho)
    soma = 0
    pos = tamanho - 7
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--
        if (pos < 2) pos = 9
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
    if (resultado != digitos.charAt(1)) return false
    return true;
}

function limpa_formulário_cep() {
    // Limpa valores do formulário de cep.
    $("#endereco").val("");
    $("#bairro").val("");
    $("#cidade").val("");
    $("#estado").val("");
}

//Quando o campo cep perde o foco.
$("#cep").blur(function () {
    //Nova variável "cep" somente com dígitos.
    var cep = $(this).val().replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            $("#endereco").val("...");
            $("#bairro").val("...");
            $("#cidade").val("...");
            $("#estado").val("...");
            //Consulta o webservice viacep.com.br/
            $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                if (!("erro" in dados)) {
                    //Atualiza os campos com os valores da consulta.
                    $("#endereco").val(dados.logradouro);
                    $("#bairro").val(dados.bairro);
                    $("#cidade").val(dados.localidade);
                    $("#estado").val(dados.uf);
                    $("#cep").removeClass('is-invalid');
                    $("#cep").addClass('is-valid');
                } //end if.
                else {
                    //CEP pesquisado não foi encontrado.
                    limpa_formulário_cep();
                    $("#cep").removeClass('is-valid');
                    $("#cep").addClass('is-invalid');
                }
            });
        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            $("#cep").removeClass('is-valid');
            $("#cep").addClass('is-invalid');
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
});


