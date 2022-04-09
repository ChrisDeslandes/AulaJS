const table = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');

const tableContainer = document.querySelector('.wrapper');

const cabecalho = ['ID', 'Nome', 'Preço', 'Categoria', 'Excluir'];

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
        let excluir = document.createElement('td');
        let botaoExcluir = document.createElement('button');
        id.textContent = dado['id'];
        nome.textContent = dado['title'];
        preco.textContent = dado['price'];
        categoria.textContent = dado['category'];
        botaoExcluir.textContent = 'x';
        botaoExcluir.setAttribute('type', 'button');
        botaoExcluir.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            linha.remove();          
            let corpoTabela = document.getElementById("corpo-tabela");
            let linhas = corpoTabela.getElementsByTagName("tr");
            let cont = 0;
            for(let i = 0; i < linhas.length; i++) {
                if(linhas[i].style.display == '') {
                    cont += 1;
                }
            }
            if(cont == 0) {
                carregarCategorias();
                for(let i = 0; i < linhas.length; i++) {
                    linhas[i].style.display = '';
                }
            }
            atualizarNumProdutos();
        });
        excluir.appendChild(botaoExcluir);
        linha.setAttribute('onclick', 'exibirDetalhes(' + dado['id'] + ')');
        linha.appendChild(id);
        linha.appendChild(nome);
        linha.appendChild(preco);
        linha.appendChild(categoria);
        linha.appendChild(excluir);
    });    
    atualizarNumProdutos();
    carregarCategorias();
}

function exibirDetalhes(id) {
    window.open('exibir.html?id=' + id, '_blank');
}

function filtrar() {
    let filtro = document.getElementById("filtroCategoria").value;
    corpoTabela = document.getElementById("corpo-tabela");
    let linhas = corpoTabela.getElementsByTagName("tr");
    if (filtro == 'Todas') {
        for (let i = 0; i < linhas.length; i++) {
            linhas[i].style.display = "";
        }
    } else {
        for (let i = 0; i < linhas.length; i++) {
            let tdCategoria = linhas[i].getElementsByTagName("td")[3];
            if (tdCategoria) {
                let categoria = tdCategoria.textContent;
                if (categoria == filtro) {
                    linhas[i].style.display = "";
                } else {
                    linhas[i].style.display = "none";
                }
            }
        }
    }
    atualizarNumProdutos();
}

function atualizarNumProdutos() {    
    corpoTabela = document.getElementById("corpo-tabela");
    let linhas = corpoTabela.getElementsByTagName("tr");
    let contador = 0;
    for (let i = 0; i < linhas.length; i++) {
        if (linhas[i].style.display == "") {
            contador += 1;
        }
    }
    document.getElementById('numProdutos').textContent = contador;
}

function carregarCategorias() {
    const filtro = document.getElementById("filtroCategoria");
    filtro.innerHTML = '';
    let todas = document.createElement('option');
    todas.value = 'Todas';
    todas.textContent = 'Todas as categorias';
    filtro.appendChild(todas);
    let linhas = corpoTabela.getElementsByTagName("tr");
    let categorias = [];
    for (let i = 0; i < linhas.length; i++) {
        if(!categorias.includes(linhas[i].getElementsByTagName("td")[3].textContent)) {
            categorias.push(linhas[i].getElementsByTagName("td")[3].textContent);
        }
    }
    categorias.forEach((categoria) => {
        let opt = document.createElement('option');
        opt.value = categoria;
        opt.textContent = categoria;
        filtro.appendChild(opt);
    });
}