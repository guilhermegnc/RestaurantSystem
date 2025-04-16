function enviarPedidoFinalizado() {
  return new Promise((resolve, reject) => { // Garantir que estamos retornando uma Promise
    const nomeCliente = $("#nomeCliente").val().trim();
    const telefone = $("#telefoneCliente").val().replace(/\D/g, "");
    const tipoPedido = $('input[name="tipoPedido"]:checked').val();
    const informacoesAdicionais = $("#informacoesAdicionais").val().trim();

    const mesaAtiva = $(".mesa-btn.active");
    const mesaNumero = mesaAtiva.length ? parseInt(mesaAtiva.text()) : null;

    const usuarioId = localStorage.getItem('usuarioId') || null;

    // Coletar os produtos selecionados
    const itens = [];

    $(".item-card").each(function () {
      const $card = $(this);
      const quantidade = parseInt($card.find(".quantidade").text());

      if (quantidade > 0) {
        itens.push({
          produtoId: parseInt($card.data("id")),
          quantidade: quantidade,
          nomeProduto: $card.data("nome") || null
        });
      }
    });

    const payload = {
      nomeCliente,
      telefone,
      tipoPedido,
      mesaNumero,
      usuarioId,
      informacoesAdicionais: informacoesAdicionais || null,
      itens
    };

    console.log("Enviando pedido:", payload); // Debug

    $.ajax({
      url: "http://localhost:5201/api/pedidos", // substituir a porta se necessário
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function (response) {
        resolve({ success: true, message: "Pedido finalizado com sucesso!", response });
        console.log("Resposta do servidor:", response);
      },
      error: function (xhr, status, error) {
        reject({ success: false, message: "Erro ao enviar o pedido. Tente novamente.", error, response: xhr.responseText });
        console.error("Erro:", error, "Status:", status, "Resposta:", xhr.responseText);
      }
    });
  });
}
