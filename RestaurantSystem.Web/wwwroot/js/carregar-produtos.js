$(document).ready(function () {
    $.ajax({
        url: "http://localhost:5201/api/produtos", // ou a URL correta
        type: "GET",
        success: function (data) {
            const produtos = data.$values;

            produtos.forEach(function (produto) {
                const itemHtml = `
                <div class="col-md-4 mb-4">
                    <div class="item-card produto" data-id="${produto.id}" data-nome="${produto.nome}">
                        <img src="${produto.imagem}" alt="${produto.nome}" class="img-fluid mb-2" />
                        <h6 class="item-nome">${produto.nome}</h6>
                        <p class="item-descricao">${produto.descricao}</p>
                        <div class="item-preco-e-quantidade">
                            <span class="item-preco">R$ ${produto.preco.toFixed(2)}</span>
                            <div class="quantidade-controls">
                            <button class="btn btn-sm btn-quantidade" data-operacao="menos">-</button>
                            <span class="quantidade">0</span>
                            <button class="btn btn-sm btn-quantidade" id="btn-mais" data-operacao="mais">+</button>
                            </div>
                        </div>
                    </div>
                </div>
                `;

                $("#secao-itens .row").append(itemHtml);
            });
        },
        error: function () {
            console.error("Erro ao carregar produtos.");
            $("#secao-itens").html("<p>Erro ao carregar produtos.</p>");
        }
    });

    $(document).on("click", ".mesa-btn", function () {
        $(".mesa-btn").removeClass("selecionada");
        $(this).addClass("selecionada");
    });
});