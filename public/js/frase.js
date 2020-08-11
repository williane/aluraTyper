$('#botao-frase').click(fraseAleatoria);
$('#botao-frase-id').click(buscaFrase);

function fraseAleatoria() {
    $('#spinner').show();
    $('.frase').hide();
    $.get('http://localhost:3000/frases', trocaFraseAleatoria)
        .fail(() => {
            $('#erro').show();
            setTimeout(() => {
                $('#erro').hide();
            }, 2000);
        })
        .always(() => {
            $('#spinner').hide();
            $('.frase').show();
        });
}

function trocaFraseAleatoria(data) {
    var frase = $('.frase');
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo)
}

function buscaFrase() {
    $('#spinner').show();
    $('.frase').hide();
    var fraseId = $('#frase-id').val();
    var dados = { id: fraseId };

    $.get('http://localhost:3000/frases', dados, trocaFrase)
        .fail(() => {
            $('#erro').show();
            setTimeout(() => {
                $('#erro').hide();
            }, 2000);
        })
        .always(() => {
            $('#spinner').hide();
            $('.frase').show();
        });

}

function trocaFrase(data) {
    var frase = $('.frase');
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}

