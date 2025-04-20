function carregarHistoricoPedidos(usuarioId) {
    $("#barra-lateral-direita").addClass("d-none");
    $("#conteudo").addClass("d-none");
    $("#historico-pedidos").removeClass("d-none");

    const $lista = $("#lista-pedidos");
    $lista.empty();

    const url = `http://localhost:5201/api/pedidos/historico?usuarioId=${usuarioId}`;

    $.ajax({
        url: url,
        type: 'GET',
        success: function (pedidos) {
            if (pedidos.length === 0) {
              $lista.append("<div class='col-12'><p>Você ainda não fez nenhum pedido.</p></div>");
            } else {
                pedidos.$values.forEach(pedido => {
                    let itensPedido = '';

                    pedido.itens.$values.forEach(item => {
                        itensPedido += `
                <div class="mb-2">
                  <strong>Produto:</strong> ${item.nomeProduto} - ${item.status}<br />
                  <strong>Quantidade:</strong> ${item.quantidade}
                </div>
              `;
                    });

                    // Adicionar o pedido no HTML
                    $lista.append(`
                        <div class="col-md-6 col-lg-4 mb-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <strong>Itens:</strong>
                                    <div class="itens-historico">${itensPedido}</div>
                                    <p><strong>Data do Pedido:</strong> ${new Date(pedido.dataPedido).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short', hour12: false })}</p>
                                    <p><strong>Status:</strong> ${pedido.status}</p>
                                </div>
                            </div>
                        </div>
            `);
                });
            }
        },
        error: function () {
            $lista.append("<p class='text-danger'>Erro ao buscar histórico de pedidos.</p>");
        }
    });
}
