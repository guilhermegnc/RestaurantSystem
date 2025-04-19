$(document).ready(function () {
    let todosProdutos = [];

    function renderizarProdutos(produtosFiltrados) {
        const $container = $("#secao-itens .row");
        $container.empty();

        if (produtosFiltrados.length === 0) {
            $container.append("<p class='text-muted'>Nenhum produto encontrado.</p>");
            return;
        }

        produtosFiltrados.forEach(function (produto) {
            const itemHtml = `
            <div class="col-md-4 mb-4">
                <div class="item-card produto" data-id="${produto.id}" data-nome="${produto.nome}" data-tipo="${produto.categoria.toLowerCase()}">
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
            $container.append(itemHtml);
        });
    }

    function aplicarFiltros() {
        const tipoSelecionado = $(".filtro-btn.active").data("tipo") || "";
        const termoBusca = $("#barra-pesquisa").val().toLowerCase();
    
        const produtosFiltrados = todosProdutos.filter(prod => {
            const nome = prod.nome.toLowerCase();
            const descricao = prod.descricao.toLowerCase();
            const tipo = prod.categoria.toLowerCase();
    
            const passaFiltroTipo = tipoSelecionado === "" || tipo === tipoSelecionado;
            const passaBusca = nome.includes(termoBusca) || descricao.includes(termoBusca);
    
            return passaFiltroTipo && passaBusca;
        });
    
        renderizarProdutos(produtosFiltrados);
    }

    // Carrega os produtos e salva todos em uma variável
    $.ajax({
        url: "http://localhost:5201/api/produtos",
        type: "GET",
        success: function (data) {
            todosProdutos = data.$values || [];
            renderizarProdutos(todosProdutos);
        },
        error: function () {
            console.error("Erro ao carregar produtos.");
            $("#secao-itens .row").html("<p>Erro ao carregar produtos.</p>");
        }
    });

    // Eventos de filtro e busca
    $("#filtro-tipo, #barra-pesquisa").on("input", aplicarFiltros);

    // Evento para clique nos botões de filtro de tipo
    $(document).on("click", ".filtro-btn", function () {
        const $btn = $(this);
    
        if ($btn.hasClass("active")) {
            // Desmarca se já estava ativo (mostrar todos os produtos)
            $btn.removeClass("active");
        } else {
            // Marca apenas o botão clicado
            $(".filtro-btn").removeClass("active");
            $btn.addClass("active");
        }
    
        aplicarFiltros();
    });

    // Clique nas mesas
    $(document).on("click", ".mesa-btn", function () {
        $(".mesa-btn").removeClass("selecionada");
        $(this).addClass("selecionada");
    });
});
