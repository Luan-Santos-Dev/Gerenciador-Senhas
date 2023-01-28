let count = 0;

function preenchimento() {
    const PREENCHIMENTO = document.getElementById('informacoes');
    const BOTAO = document.getElementById('botao-preenchimento');

    if (count % 2 == 0) {
        /* 
        Na lista de classes do "PREENCHIMENTO" estou adicionando uma classe nova
        chamada "descer" pra eu conseguir adicionar um deslizamento suave. 
        */
        PREENCHIMENTO.classList.add('descer');
        // Limpando o conteúdo dentro do botão
        BOTAO.innerHTML = '';
        // Adicionando uma nova imagem nesse botão
        BOTAO.innerHTML = '<i class="fa-solid fa-sort-up"></i>'
    } else {
        // Removendo a classe "descer" para o preenchimento voltar ao seu lugar
        PREENCHIMENTO.classList.remove('descer');
        // Limpando o conteúdo dentro do botão
        BOTAO.innerHTML = '';
        // Adicionando novamente a imagem padrão do botão
        BOTAO.innerHTML = '<i class="fa-solid fa-file-circle-plus"></i>';
    }

    count += 1;
}

function ValidarDados(objeto) {
    for (let i in objeto) {
        if (objeto[i] == undefined || objeto[i] == '' || objeto[i] == null) {
            return false;
        }
    }
    return true;
}

function Fechar() {
    const CaixaAlerta = document.getElementById('CaixaFinal');
    CaixaAlerta.classList.remove('aparecer');
    window.location.reload();
}

function carregaListaDespesas() {
    let despesas = [];
    despesas = bd.recuperarTodosRegistros();
    
    let listaDespesas = document.getElementById('listaDespesas');
    despesas.forEach(function (d) {
        let linha = listaDespesas.insertRow();
        linha.insertCell(0).innerHTML = `${d.WEBSITE}`;
        linha.insertCell(1).innerHTML = `${d.DATA}`;
        linha.insertCell(2).innerHTML = `${d.SENHA}`;
        let btn = document.createElement('button');
        btn.className = 'w-50 ml-2 btn btn-danger';
        btn.innerHTML = '<i class="fas fa-times"></i>';
        btn.id = `id_despesa_${d.id}`;

        btn.onclick = function () {
            let id = this.id.replace('id_despesa_', '');

            bd.remover(id);

            window.location.reload();
        }

        linha.insertCell(3).append(btn);
    });
}

class Bd {
    constructor() {
        let id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0);
        }
    }

    recuperarTodosRegistros() {
        let despesas = [];
        let id = localStorage.getItem('id');

        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i));
            if (despesa === null) {
                continue;
            }
            despesa.id = i;
            despesas.push(despesa);
        }
        return despesas;
    }

    remover(id) {
        localStorage.removeItem(id);
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1;
    }

    gravar(d) {
        //localStorage.setItem('despesa', JSON.stringify(d));
        let id = this.getProximoId();
        
        localStorage.setItem(id, JSON.stringify(d));

        localStorage.setItem('id', id);
    }
}

let bd = new Bd();

function cadastrar() {
    const WEBSITE = document.getElementById('website').value;
    const DATA = document.getElementById('data').value;
    const SENHA = document.getElementById('password').value;

    let despesa = {
        WEBSITE: WEBSITE,
        DATA: DATA,
        SENHA, SENHA
    };

    if (ValidarDados(despesa)) {
        const CAIXAALERTA = document.getElementById('CaixaFinal');
        document.getElementById('titulo-caixa').className = 'text-success';
        document.getElementById('titulo-caixa').innerHTML = 'SUCESSO!!';
        document.getElementById('caixa-button').className = 'CaixaResultadoButton btn btn-success';
        
        CAIXAALERTA.classList.add('aparecer'); 


        bd.gravar(despesa);
    } else {
        const CAIXAALERTA = document.getElementById('CaixaFinal');
        document.getElementById('titulo-caixa').className = 'text-danger';
        document.getElementById('titulo-caixa').innerHTML = 'ERROR!!';
        document.getElementById('caixa-button').className = 'CaixaResultadoButton btn btn-danger';

        CAIXAALERTA.classList.add('aparecer');

    }
}
