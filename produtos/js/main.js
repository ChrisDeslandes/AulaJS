const table = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');

const tableContainer = document.querySelector('.wrapper');

const cabecalho = ['ID', 'Nome', 'Preço', 'Categoria'];

let produtos = [];

window.addEventListener('load', function() {
    criarTabela();
    criarCabecalho();
    carregarDados();
});

function criarTabela() {
    thead.setAttribute('id', 'cabecalho-tabela');
    tbody.setAttribute('id', 'corpo-tabela');
    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);
}

function criarCabecalho() {
    let linha = thead.insertRow();
    cabecalho.forEach(valor => {
        let th = document.createElement('th');
        th.textContent = valor;
        linha.appendChild(th);
    });
}

function carregarDados() {
    fetch('data/produtos.json')
        .then(function(resposta) {
            return resposta.json();
        }).then(function(dados) {
            atualizarLinhas(dados);
        }).catch(function(erro) {
            console.error("Não foi possível carregar o arquivo: " + erro.message);
        })        
}

function atualizarLinhas(dados) {
    dados.forEach(dado => {
        let linha = tbody.insertRow();
        let id = document.createElement('td');
        let nome = document.createElement('td');
        let preco = document.createElement('td');
        let categoria = document.createElement('td');
        id.textContent = dado['id'];
        nome.textContent = dado['title'];
        preco.textContent = dado['price'];
        categoria.textContent = dado['category'];
        linha.appendChild(id);
        linha.appendChild(nome);
        linha.appendChild(preco);
        linha.appendChild(categoria);
    });
}