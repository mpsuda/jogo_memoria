var cartoes = document.querySelectorAll(".cartao");

var existeCartaoVirado = false;
var primeiroCartao, segundoCartao;

var resultadosJogadores = [];

var itensStorage = localStorage.getItem("resultado");

if (itensStorage) {
  var resultadosExistentes = JSON.parse(itensStorage);
} else {
  var resultadosExistentes = [];
}

console.log(resultadosJogadores);

var placar = 0;
var tempo = 0;

var intervalo = setInterval(function () {
  if (tempo == 30) {
    clearInterval(intervalo);
    alert("Tempo esgotado!");
    var nome = prompt("Digite o seu nome:");
    //Criar um objeto
    var resultado = {
      nomeJogador: nome,
      pontuacao: placar,
    };

    resultadosExistentes.push(resultado);
    localStorage.setItem("resultado", JSON.stringify(resultadosExistentes));

    document.getElementById("recordes").style.display = "block";

    var tabela = document.getElementById("resultados");

    resultadosExistentes.sort().forEach(function (resultado) {
      var tr = document.createElement("tr");
      var tdNome = document.createElement("td");
      tdNome.innerHTML = resultado.nomeJogador;
      var tdPontuacao = document.createElement("td");
      tdPontuacao.innerHTML = resultado.pontuacao;
      tr.appendChild(tdNome);
      tr.appendChild(tdPontuacao);
      tabela.appendChild(tr);
    });

    cartoes.forEach(function (cartao) {
      cartao.removeEventListener("click", virarCartao);
    });
    return;
  }

tempo = tempo + 1;
    documents.getElementById("tempo").innerHTML = tempo;
},1000);

function virarCartao() {
    this.classList.add("virado");

    if(existeCartaoVirado == false){
        existeCartaoVirado = true;
        primeiroCartao = this;
    }else{
        segundoCartao = this;
        existeCartaoVirado = false;

        if(primeiroCartao.dataset.info === segundoCartao.dataset.info) {
            primeiroCartao.removeEventListener("click", virarCartao);
            segundoCartao.removeEventListener("click", virarCartao);
            placar = placar + 10;
            document.getElementById("resultado").innerHTML = placar
        }else{
            cartoes.forEach(function(cartao){
                cartao.removeEventListener("click",virarCartao);
            });
            setTimeout(function () {
                cartoes.forEach(function (cartao) {
                cartao.addEventListener("click", virarCartao);
                });
                primeiroCartao.classList.remove("virado");
                segundoCartao.classList.remove("virado");
            }, 1000);
            placar = placar - 5;
            
        }
    }
}

cartoes.forEach(function(cartao) {
    cartao.addEventListener("click",virarCartao);
});