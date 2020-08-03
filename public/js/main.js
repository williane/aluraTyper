var tempoInicial = $('#tempo-digitacao').text();
var campo = $('.campo-digitacao');

// $(function) mesmo que função abaixo
$(document).ready(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $('#botao-reiniciar').click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
    var frase = $('.frase').text();
    var numeroPalavras = frase.split(' ').length;
    var tamanhoFrase = $('#tamanho-frase');
    tamanhoFrase.text(numeroPalavras);

}

function inicializaContadores() {
    campo.on('input', function () {
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;

        $('#contador-palavras').text(qtdPalavras);

        var qdtCaracteres = conteudo.length;
        $('#contador-caracteres').text(qdtCaracteres);

    });
}

function inicializaCronometro() {
    var tempoRestante = $('#tempo-digitacao').text();
    campo.one('focus', function () {
        $("#botao-reiniciar").attr("disabled", true);
        var cronometroId = setInterval(function () {
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroId);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo() {
    campo.attr('disabled', true);
    $("#botao-reiniciar").attr("disabled", false);
    campo.addClass('campo-desativado');
    //campo.toggleClass se tem a classe ele tira se não tem ele coloca
    inserePlacar();
}

function inicializaMarcadores() {
    var frase = $('.frase').text();
    campo.on('input', function () {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if (frase.startsWith(digitado)) {
            campo.removeClass('campo-errado');
            campo.addClass('campo-correto');
        } else {
            campo.addClass('campo-errado');
            campo.removeClass('campo-correto');
        }

    });
}

function reiniciaJogo() {
    campo.attr('disabled', false);
    campo.val('');
    $('#contador-palavras').text('0');
    $('#contador-caracteres').text('0');
    $('#tempo-digitacao').text(tempoInicial);
    inicializaCronometro();
    campo.removeClass('campo-desativado');
    campo.removeClass('campo-certo');
    campo.removeClass('campo-errado');
}

