$(document).ready(function () {
    const $btnAvancar = $("#btn-avancar");
    const $btnVoltar = $("#btn-voltar");
    const etapas = ["secao-itens", "secao-mesa", "secao-cliente"];
    let etapaAtual = 0;

    $btnAvancar.on("click", function () {
        if (etapaAtual === 0) {
            const algumSelecionado = $(".quantidade").toArray().some(q => parseInt($(q).text()) > 0);

            if (!algumSelecionado) {
                alert("Adicione pelo menos 1 item ao pedido.");
                return;
            }
        }

        if (etapaAtual === 1) {
            const mesaSelecionada = $(".mesa-btn.active");
            if (!mesaSelecionada.length) {
                alert("Por favor, selecione uma mesa antes de continuar.");
                return;
            }
        }

        if (etapaAtual === 2) {
            const telefone = $("#telefoneCliente").val().replace(/\D/g, "");
            const nome = $("#nomeCliente").val().trim();
            const tipoPedidoSelecionado = $('input[name="tipoPedido"]:checked');

            if (!nome) {
                alert("Por favor, insira o nome do cliente.");
                return;
            }

            if (telefone.length < 10 || telefone.length > 11) {
                alert("Por favor, insira um número de telefone válido com DDD.");
                return;
            }

            if (!tipoPedidoSelecionado.length) {
                alert("Por favor, selecione o tipo de pedido.");
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
            const success = enviarPedidoFinalizado();

            if (success) {
                alert("Pedido finalizado!");
                etapaAtual = 0;
                $btnAvancar.text("Confirmar Etapa");
                $btnVoltar.css("display", "none");
                $("#" + etapas[etapaAtual]).removeClass("d-none");
                $(".lista-etapas .etapa").eq(etapaAtual).addClass("active");
            }
            else {
                alert("Erro ao finalizar o pedido. Tente novamente.");
                etapaAtual--;
                $("#" + etapas[etapaAtual]).removeClass("d-none");
                $(".lista-etapas .etapa").eq(etapaAtual).addClass("active");
            }
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
        }
    });
});