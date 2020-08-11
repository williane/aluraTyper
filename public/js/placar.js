$('#botao-placar').click(mostraPlacar);
$('#botao-sync').click(sincronizaPlacar);


function inserePlacar() {
    var corpoTabela = $('.placar').find('tbody');
    var usuario = $('#usuarios').val();
    var numPalavras = $('#contador-palavras').text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find('.botao-remover').click(removeLinha);

    corpoTabela.prepend(linha); //append adiciona no final prepend adiciona no inicio
    $('.placar').slideDown(400);
    scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $('.placar').offset().top;
    $('html, body').animate({
        scrollTop: posicaoPlacar
    }, 1000);
}

function novaLinha(usuario, numPalavras) {
    var linha = $('<tr>');
    var colunaUsuario = $('<td>').text(usuario);
    var colunaPalavras = $('<td>').text(numPalavras);
    var colunaRemover = $('<td>');
    var link = $('<a>').addClass('botao-remover').attr('href', '#');
    var icone = $('<i>').addClass('small').addClass('material-icons').text('delete');

    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(function () {
        linha.remove();
    });
    /* setTimeout(function (){
        linha.remove();
    },600); */
}

function mostraPlacar() {
    //$('.placar').show(); aparece e hide esconde, toggle ja verifca qual deve ser feito
    $('.placar').stop().slideToggle(600);
}

function sincronizaPlacar() {
    var placar = [];
    var linhas = $('tbody>tr');

    linhas.each(function () {
        var usuario = $(this).find('td:nth-child(1)').text();
        var palavras = $(this).find('td:nth-child(2)').text();

        var score = {
            usuario: usuario,
            pontos: palavras,
        };

        placar.push(score);
    });

    var dados = {
        placar: placar,
    }

    $.post("http://localhost:3000/placar", dados, function () {
        console.log("Placar sincronizado com sucesso");
        $(".tooltip").tooltipster("open");
    }).fail(function () {
        $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar");
    }).always(function () { //novo
        setTimeout(function () {
            $(".tooltip").tooltipster("close");
        }, 1200);
    });
}

function atualizaPlacar() {
    $.get('http://localhost:3000/placar', function (data) {
        $(data).each(function () {
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find('.botao-remover').click(removeLinha);
            $('tbody').append(linha);
        });
    });
}