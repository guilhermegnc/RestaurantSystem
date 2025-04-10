document.addEventListener("DOMContentLoaded", function () {
  const btnAvancar = document.getElementById("btn-avancar");
  const btnVoltar = document.getElementById("btn-voltar");
  const etapas = ["secao-itens", "secao-mesa", "secao-cliente"];
  let etapaAtual = 0;

  btnAvancar.addEventListener("click", () => {

    if (etapaAtual === 0) {
      const quantidades = document.querySelectorAll(".quantidade");
      const algumSelecionado = Array.from(quantidades).some(q => parseInt(q.textContent) > 0);
  
      if (!algumSelecionado) {
        alert("Adicione pelo menos 1 item ao pedido.");
        return;
      }
    }

    if (etapaAtual === 1) {
      const mesaSelecionada = document.querySelector(".mesa-btn.active");
      if (!mesaSelecionada) {
        alert("Por favor, selecione uma mesa antes de continuar.");
        return;
      }
    }

     if (etapaAtual === 2) {
      const telefone = document.getElementById("telefoneCliente").value.replace(/\D/g, "");
      const nome = document.getElementById("nomeCliente").value.trim();
      const tipoPedidoSelecionado = document.querySelector('input[name="tipoPedido"]:checked');

      if (!nome) {
        alert("Por favor, insira o nome do cliente.");
        return;
      }

      if (telefone.length < 10 || telefone.length > 11) {
        alert("Por favor, insira um número de telefone válido com DDD.");
        return;
      }
    
      if (!tipoPedidoSelecionado) {
        alert("Por favor, selecione o tipo de pedido.");
        return;
      }
    } 

    document.getElementById(etapas[etapaAtual]).classList.add("d-none");
    document.querySelectorAll(".lista-etapas .etapa")[etapaAtual].classList.remove("active");

    etapaAtual++;
    btnVoltar.style.display = etapaAtual > 0 ? "inline-block" : "none";
    if (etapaAtual < etapas.length) {
      document.getElementById(etapas[etapaAtual]).classList.remove("d-none");
      document.querySelectorAll(".lista-etapas .etapa")[etapaAtual].classList.add("active");

      if (etapaAtual === etapas.length - 1) {
        btnAvancar.textContent = "Finalizar Pedido";
      } else {
        btnAvancar.textContent = "Confirmar Etapa";
      }
    } else {
      alert("Pedido finalizado!");
      etapaAtual = 0;
      btnAvancar.textContent = "Confirmar Etapa";
      btnVoltar.style.display = "none";
      document.getElementById(etapas[etapaAtual]).classList.remove("d-none");
      document.querySelectorAll(".lista-etapas .etapa")[etapaAtual].classList.add("active");
    }
  });

  btnVoltar.addEventListener("click", () => {
    if (etapaAtual > 0) {
      document.getElementById(etapas[etapaAtual]).classList.add("d-none");
      document.querySelectorAll(".lista-etapas .etapa")[etapaAtual].classList.remove("active");
  
      etapaAtual--;
  
      document.getElementById(etapas[etapaAtual]).classList.remove("d-none");
      document.querySelectorAll(".lista-etapas .etapa")[etapaAtual].classList.add("active");
  
      btnAvancar.textContent = etapaAtual === etapas.length - 1 ? "Finalizar Pedido" : "Confirmar Etapa";
  
      btnVoltar.style.display = etapaAtual > 0 ? "inline-block" : "none";
    }
  });

  document.querySelectorAll(".btn-quantidade").forEach((botao) => {
    botao.addEventListener("click", () => {
      const operacao = botao.getAttribute("data-operacao");
      const quantidadeEl = botao.parentElement.querySelector(".quantidade");
      let valor = parseInt(quantidadeEl.textContent);
      if (operacao === "mais") {
        valor++;
      } else if (operacao === "menos" && valor > 0) {
        valor--;
      }
      quantidadeEl.textContent = valor;
    });
  });

  document.querySelectorAll(".mesa-btn").forEach((botao) => {
    botao.addEventListener("click", () => {
      document.querySelectorAll(".mesa-btn").forEach(btn => btn.classList.remove("active"));
      botao.classList.add("active");
    });
  });
});
