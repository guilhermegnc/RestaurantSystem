function mostrarConteudoFuncionario(tipoUsuario) {
    $("#barra-lateral-direita").addClass("d-none");
    $("#conteudo").addClass("d-none");
    $("#historico-dropdown").addClass("d-none");
    $("#divider-dropdown").hide();

    let $lista = null;

    if (tipoUsuario === "copa") {
        $("#pedidos-copa").removeClass("d-none");
        $lista = $("#lista-copa");
        $lista.empty();
        tipoProduto = "bebida";
    } else {
        $("#pedidos-cozinha").removeClass("d-none");
        $lista = $("#lista-cozinha");
        $lista.empty();
        tipoProduto = "comida";
    }

    const url = `http://localhost:5201/api/Pedidos/historico?setor=${tipoProduto}`;

    $.ajax({
        url: url,
        type: 'GET',
        success: function (pedidos) {
            if (pedidos.length === 0) {
                $lista.append("<p>Ainda não há nenhum pedido.</p>");
            } else {
                pedidos.$values
                .filter(pedido => pedido.itens.$values.some(item => item.status.toLowerCase() !== "entregue"))
                .forEach(pedido => {
                    pedido.itens.$values
                    .filter(item => item.status.toLowerCase() !== "entregue")
                    .forEach(item => {
                        const cardHtml = `
                            <div class="col-md-6 col-lg-4 mb-4">
                                <div class="card h-100" data-item-id="${item.id}">
                                    <div class="card-body">
                                        <p><strong>Produto:</strong> ${item.nomeProduto}</p>
                                        <p><strong>Quantidade:</strong> ${item.quantidade}</p>
                                        <p><strong>Mesa:</strong> ${pedido.mesaNumero}</p>
                                        <p><strong>Data do Pedido:</strong> ${new Date(pedido.dataPedido).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short', hour12: false })}</p>
                                        <p><strong>Status:</strong> <span class="status-text">${item.status}</span></p>
                                        <div class="botoes-status d-flex flex-wrap gap-2">
                                            <button class="btn btn-sm btn-secondary btn-alterar-status" data-status="em preparo">Em Preparo</button>
                                            <button class="btn btn-sm btn-success btn-alterar-status" data-status="pronto">Pronto</button>
                                            <button class="btn btn-sm btn-primary btn-alterar-status" data-status="entregue">Entregue</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        $lista.append(cardHtml);
                    });
                });

                // Evento para alterar status de item individual
                $(".btn-alterar-status").on("click", function () {
                    const novoStatus = $(this).data("status");
                    const $card = $(this).closest(".card");
                    const itemId = $card.data("item-id");
                    const $statusText = $card.find(".status-text");

                    $.ajax({
                        url: `http://localhost:5201/api/PedidoItem/${itemId}/status`,
                        type: 'PUT',
                        contentType: 'application/json',
                        data: JSON.stringify(novoStatus),
                        success: function () {
                            $statusText.text(novoStatus);
                        },
                        error: function () {
                            swalPadrao.fire({
                                icon: 'error',
                                title: 'Erro',
                                text: 'Erro ao atualizar o status do item.'
                            });
                        }
                    });
                });
            }
        },
        error: function () {
            $lista.append("<p class='text-danger'>Erro ao buscar pedidos.</p>");
        }
    });
}
