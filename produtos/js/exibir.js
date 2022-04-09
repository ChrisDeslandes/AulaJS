const divDetalhes = document.querySelector('.detalhes');

window.addEventListener('load', function() {
    carregarDados();
});

function carregarDados() {
    fetch('data/produtos.json')
        .then(function(resposta) {
            return resposta.json();
        }).then(function(dados) {
            acharProduto(dados);
        }).catch(function(erro) {
            console.error("Não foi possível carregar o arquivo: " + erro.message);
        })
}

function acharProduto(dados) {
    const url = document.URL;
    let idProcurado = url.substring(url.lastIndexOf('=') + 1);
    dados.forEach(dado => {
        if (dado['id'] == idProcurado) {
            mostrarDetalhes(dado);
            return;
        }
    });
}

function mostrarDetalhes(produto) {
    for (let chave in produto) {
        p = document.createElement('p');
        p.setAttribute('style', 'margin-bottom:15px;font-size:2em;');
        p.textContent = chave + ': ';
        if(chave == 'rating') {
            for (let campo in produto[chave]) {
                p2 = document.createElement('p');
                p2.textContent = '|------- ' + campo + ': ' + chave[campo];
                p.appendChild(p2);
            }
        } else {
            p.textContent += produto[chave];
        }
        divDetalhes.appendChild(p);
    }
}