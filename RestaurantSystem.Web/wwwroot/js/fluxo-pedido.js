$(document).ready(function () {
    const $btnAvancar = $("#btn-avancar");
    const $btnVoltar = $("#btn-voltar");
    const $filtros = $("#barra-filtros");
    const etapas = ["secao-itens", "secao-mesa", "secao-cliente"];
    let etapaAtual = 0;

    $btnAvancar.on("click", function () {
        if (etapaAtual === 0) {
            const algumSelecionado = $(".quantidade").toArray().some(q => parseInt($(q).text()) > 0);
            $filtros.addClass("d-none");

            if (!algumSelecionado) {
                swalPadrao.fire({
                    icon: 'warning',
                    title: 'Carrinho Vazio',
                    text: 'Adicione pelo menos 1 item ao pedido.',
                    timer: 1500,
                    showConfirmButton: false
                  });
                return;
            }
        }

        if (etapaAtual === 1) {
            const mesaSelecionada = $(".mesa-btn.active");
            if (!mesaSelecionada.length) {
                swalPadrao.fire({
                    icon: 'warning',
                    title: 'Mesa não selecionada',
                    text: 'Por favor, selecione uma mesa antes de continuar.',
                    timer: 1500,
                    showConfirmButton: false
                  });
                return;
            }
        }

        if (etapaAtual === 2) {
            const telefone = $("#telefoneCliente").val().replace(/\D/g, "");
            const nome = $("#nomeCliente").val().trim();
            const tipoPedidoSelecionado = $('input[name="tipoPedido"]:checked');

            if (!nome) {
                swalPadrao.fire({
                    icon: 'warning',
                    title: 'Nome não informado',
                    text: 'Por favor, insira o seu nome.',
                    timer: 1500,
                    showConfirmButton: false
                  });
                return;
            }

            if (telefone.length < 10 || telefone.length > 11) {
                swalPadrao.fire({
                    icon: 'warning',
                    title: 'Telefone não informado',
                    text: 'Por favor, insira um número de telefone válido com DDD.',
                    timer: 1500,
                    showConfirmButton: false
                  });
                return;
            }

            if (!tipoPedidoSelecionado.length) {
                swalPadrao.fire({
                    icon: 'warning',
                    title: 'Tipo de pedido não selecionado',
                    text: 'Por favor, selecione o tipo de pedido.',
                    timer: 1500,
                    showConfirmButton: false
                  });
                return;
            }
        }

        $("#" + etapas[etapaAtual]).addClass("d-none");
        $(".lista-etapas .etapa").eq(etapaAtual).removeClass("active");

        etapaAtual++;
        $btnVoltar.css("display", etapaAtual > 0 ? "inline-block" : "none");
        if (etapaAtual < etapas.length) {
            $("#" + etapas[etapaAtual]).removeClass("d-none");
            $(".lista-etapas .etapa").eq(etapaAtual).addClass("active");

            if (etapaAtual === etapas.length - 1) {
                $btnAvancar.text("Finalizar Pedido");
            } else {
                $btnAvancar.text("Confirmar Etapa");
            }
        } else {
            // Chama a função que faz o POST com os dados do pedido
            async function finalizarPedido() {
                try {
                    const result = await enviarPedidoFinalizado(); // Espera o resultado da Promise
                    if (result.success) {
                        swalPadrao.fire({
                            icon: 'success',
                            title: 'Sucesso!',
                            text: 'Pedido finalizado!',
                            timer: 1000,
                            showConfirmButton: false
                          });
                        etapaAtual = 0;
                        $btnAvancar.text("Confirmar Etapa");
                        $btnVoltar.css("display", "none");
                        $("#" + etapas[etapaAtual]).removeClass("d-none");
                        $(".lista-etapas .etapa").eq(etapaAtual).addClass("active");
                        $filtros.removeClass("d-none");
                    } else {
                        swalPadrao.fire({
                            icon: 'error',
                            title: 'Erro!',
                            text: 'Erro ao finalizar o pedido. Tente novamente.',
                            timer: 1500,
                            showConfirmButton: false
                          });
                        etapaAtual--;
                        $("#" + etapas[etapaAtual]).removeClass("d-none");
                        $(".lista-etapas .etapa").eq(etapaAtual).addClass("active");
                    }
                } catch (error) {
                    swalPadrao.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: 'Erro ao finalizar o pedido. Tente novamente.',
                        timer: 1500,
                        showConfirmButton: false
                      });
                    etapaAtual--;
                    $("#" + etapas[etapaAtual]).removeClass("d-none");
                    $(".lista-etapas .etapa").eq(etapaAtual).addClass("active");
                }
            }

            finalizarPedido();
        }
    });

    $btnVoltar.on("click", function () {
        if (etapaAtual > 0) {
            $("#" + etapas[etapaAtual]).addClass("d-none");
            $(".lista-etapas .etapa").eq(etapaAtual).removeClass("active");

            etapaAtual--;

            $("#" + etapas[etapaAtual]).removeClass("d-none");
            $(".lista-etapas .etapa").eq(etapaAtual).addClass("active");

            $btnAvancar.text(etapaAtual === etapas.length - 1 ? "Finalizar Pedido" : "Confirmar Etapa");

            $btnVoltar.css("display", etapaAtual > 0 ? "inline-block" : "none");

            if (etapaAtual === 0) {
                $filtros.removeClass("d-none");
            }
        }
    });
});