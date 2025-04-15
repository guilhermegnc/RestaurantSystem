$(document).ready(function () {
  $(document).on("click", ".btn-quantidade", function () {
    const botao = $(this);
    const operacao = botao.data("operacao");

    // Pega o span.quantidade mais próximo
    const spanQuantidade = botao.closest(".item-preco-e-quantidade").find(".quantidade");

    let quantidadeAtual = parseInt(spanQuantidade.text());

    if (operacao === "mais") {
      quantidadeAtual++;
    } else if (operacao === "menos" && quantidadeAtual > 0) {
      quantidadeAtual--;
    }

    // Atualiza o texto do span com nova quantidade
    spanQuantidade.text(quantidadeAtual);
  });
});