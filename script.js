let dia = 1;
let dinheiro = 100;
let clima = "Sol";
let estacao = "Primavera";
let plantas = [];
let estoque = 0;
let animais = 0;

function atualizarInterface() {
  document.getElementById("dia").innerText = dia;
  document.getElementById("dinheiro").innerText = dinheiro;
  document.getElementById("clima").innerText = clima;
  document.getElementById("estacao").innerText = estacao;
  document.getElementById("plantas").innerText = plantas.length;
  document.getElementById("estoque").innerText = estoque;
  document.getElementById("animais").innerText = animais;
}

function definirEstacao() {
  const estacoes = ["Primavera", "Verão", "Outono", "Inverno"];
  estacao = estacoes[Math.floor((dia - 1) / 10) % 4];
}

function gerarClima() {
  const climas = ["Sol", "Chuva", "Nublado", "Neve"];
  clima = climas[Math.floor(Math.random() * climas.length)];
}

function plantar() {
  if (dinheiro >= 10) {
    plantas.push({ dias: 0, irrigada: false, fertilizada: false });
    dinheiro -= 10;
    atualizarInterface();
  } else {
    alert("Dinheiro insuficiente para plantar!");
  }
}

function regar() {
  plantas.forEach(planta => planta.irrigada = true);
}

function fertilizar() {
  if (dinheiro >= 5) {
    plantas.forEach(planta => planta.fertilizada = true);
    dinheiro -= 5;
    atualizarInterface();
  } else {
    alert("Dinheiro insuficiente para fertilizar!");
  }
}

function colher() {
  let colhidas = 0;
  plantas = plantas.filter(planta => {
    if (planta.dias >= 3) {
      estoque++;
      dinheiro += 20;
      colhidas++;
      return false;
    }
    return true;
  });
  alert(`Você colheu ${colhidas} planta(s)!`);
  atualizarInterface();
}

function comprarAnimal() {
  if (dinheiro >= 50) {
    animais++;
    dinheiro -= 50;
    atualizarInterface();
  } else {
    alert("Dinheiro insuficiente para comprar animal!");
  }
}

function proximoDia() {
  dia++;
  definirEstacao();
  gerarClima();

  plantas.forEach(planta => {
    let crescimento = 1;
    if (planta.irrigada) crescimento += 0.5;
    if (planta.fertilizada) crescimento += 0.5;
    planta.dias += crescimento;
    planta.irrigada = false;
    planta.fertilizada = false;
  });

  dinheiro += animais * 10; // vacas geram renda diária

  atualizarInterface();
}
// Inicia o jogo com orçamento escolhido
function iniciarJogo() {
  const valor = parseInt(document.getElementById("orcamentoInicial").value);
  if (isNaN(valor) || valor < 10) {
    alert("💬 Por favor, digite um valor válido (mínimo 10).");
    return;
  }

  dinheiro = valor;
  atualizarInterface();

  // Esconde os controles de configuração
  document.querySelector(".config-inicial").style.display = "none";
}
function ativarTelaCheia() {
  const body = document.documentElement;
  if (body.requestFullscreen) {
    body.requestFullscreen();
  } else if (body.webkitRequestFullscreen) {
    body.webkitRequestFullscreen();
  } else if (body.msRequestFullscreen) {
    body.msRequestFullscreen();
  }
}
