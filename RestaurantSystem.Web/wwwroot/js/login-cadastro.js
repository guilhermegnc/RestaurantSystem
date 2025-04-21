$(document).ready(function () {
  const $btnEntrar = $("#btn-entrar");
  const $dropdown = $("#dropdown");
  const $loginForm = $("#login-form");
  const $cadastroForm = $("#cadastro-form");
  const $usuarioIcone = $("#usuario-icone");
  const $btnSair = $("#btn-sair");

  let tipoUsuarioAtual = null;

  // Alternar o dropdown com a classe d-none
  $btnEntrar.on("click", function () {
    $dropdown.toggleClass("d-none");
  });

  // Alternar entre o login e cadastro sem fechar o dropdown
  $("#link-para-cadastro").on("click", function (e) {
    e.preventDefault();
    $loginForm.addClass("d-none");
    $cadastroForm.removeClass("d-none");
  });

  $("#link-para-login").on("click", function (e) {
    e.preventDefault();
    $cadastroForm.addClass("d-none");
    $loginForm.removeClass("d-none");
  });

  // Impedir que o dropdown feche ao clicar nos links de login/cadastro
  $(".dropdown-menu").on("click", function (e) {
    e.stopPropagation(); // Evitar o fechamento automático do dropdown
  });

  // Função para cadastro
  $("#btn-cadastrar").on("click", function (e) {
    e.preventDefault();

    const nomeUsuario = $("#cadastro-usuario").val();
    const senha = $("#cadastro-senha").val();

    if (!nomeUsuario || !senha) {
      swalPadrao.fire({
        icon: 'warning',
        title: 'Erro!',
        text: 'Por favor, preencha todos os campos.',
        timer: 1000,
        showConfirmButton: false
      });
      return;
    }

    const usuarioCadastro = {
      nomeUsuario: nomeUsuario,
      senha: senha,
      tipoUsuario: "cliente" // Tipo fixo
    };

    $.ajax({
      url: 'http://localhost:5201/api/usuarios/cadastro',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(usuarioCadastro),
      success: function (response) {
        swalPadrao.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Cadastro realizado com sucesso!',
          timer: 1000,
          showConfirmButton: false
        });

        // Salvar o ID do usuário no localStorage para persistir a sessão
        localStorage.setItem("usuarioId", response.id);
        localStorage.setItem("tipoUsuario", "cliente");

        // Substituir o botão Entrar pelo ícone de usuário
        $btnEntrar.addClass("d-none");
        $usuarioIcone.removeClass("d-none");

        // Fechar o dropdown e resetar o formulário
        $dropdown.addClass("d-none");
        $("#cadastro-usuario").val('');
        $("#cadastro-senha").val('');
        document.body.click();
        alternarOpcaoHistorico(false);
      },
      error: function (xhr, status, error) {
        swalPadrao.fire({
          icon: 'error',
          title: 'Erro!',
          text: xhr.responseText,
          timer: 1000,
          showConfirmButton: false
        });
      }
    });
  });

  // Função para login
  $("#btn-login").on("click", function (e) {
    e.preventDefault();

    const nomeUsuario = $("#login-usuario").val();
    const senha = $("#login-senha").val();

    if (!nomeUsuario || !senha) {
      swalPadrao.fire({
        icon: 'warning',
        title: 'Erro!',
        text: 'Por favor, preencha todos os campos.',
        timer: 1000,
        showConfirmButton: false
      });
      return;
    }

    const usuarioLogin = {
      nomeUsuario: nomeUsuario,
      senha: senha
    };

    $.ajax({
      url: 'http://localhost:5201/api/usuarios/login',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(usuarioLogin),
      success: function (response) {
        if (response.id) {
          swalPadrao.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Login realizado com sucesso! Bem-vindo!',
            timer: 1000,
            showConfirmButton: false
          });

          // Salvar o ID do usuário no localStorage para persistir a sessão
          localStorage.setItem("usuarioId", response.id);
          localStorage.setItem("tipoUsuario", response.tipoUsuario);
          tipoUsuarioAtual = response.tipoUsuario; // Atualizar o tipo de usuário atual

          // Substituir o botão Entrar pelo ícone de usuário
          $btnEntrar.addClass("d-none");
          $usuarioIcone.removeClass("d-none");

          // Fechar o dropdown e resetar o formulário
          $dropdown.addClass("d-none");
          $("#login-usuario").val('');
          $("#login-senha").val('');
          document.body.click();
          alternarOpcaoHistorico(false);
          if (response.tipoUsuario != "cliente") {
            mostrarConteudoFuncionario(response.tipoUsuario);
          }
        } else {
          swalPadrao.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Usuário ou senha incorretos.',
            timer: 1500,
            showConfirmButton: false
          });
        }
      },
      error: function (xhr, status, error) {
        swalPadrao.fire({
          icon: 'error',
          title: 'Erro!',
          text: xhr.responseText,
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  });

  function alternarOpcaoHistorico(paraVoltar = false) {
    const $item = $("#userDropdown ~ .dropdown-menu .dropdown-item:contains('Histórico'), #userDropdown ~ .dropdown-menu .dropdown-item:contains('Voltar ao menu')");

    if (paraVoltar) {
      $item
        .text("Voltar ao menu")
        .off("click")
        .on("click", function (e) {
          e.preventDefault();
          voltarParaTelaPrincipal();
          document.body.click();
        });
    } else {
      $item
        .text("Histórico")
        .off("click")
        .on("click", function (e) {
          e.preventDefault();
          const usuarioId = localStorage.getItem("usuarioId");
          carregarHistoricoPedidos(usuarioId);
          alternarOpcaoHistorico(true);
          document.body.click();
        });
    }
  }

  function voltarParaTelaPrincipal() {
    $("#historico-pedidos").addClass("d-none");
    $("#barra-lateral-direita").removeClass("d-none");
    $("#conteudo").removeClass("d-none");

    alternarOpcaoHistorico(false);
  }

  // Chamada inicial ao carregar a página:
  alternarOpcaoHistorico(false);

  // Função para logout
  $btnSair.on("click", function (e) {
    e.preventDefault();

    // Remover o ID do usuário do localStorage
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("tipoUsuario");

    // Substituir o ícone de usuário pelo botão Entrar novamente
    $usuarioIcone.addClass("d-none");
    $btnEntrar.removeClass("d-none");

      // Resetar a interface para a tela de cliente
    $("#pedidos-copa").addClass("d-none");
    $("#pedidos-cozinha").addClass("d-none");
    $("#historico-pedidos").addClass("d-none");

    $("#barra-lateral-direita").removeClass("d-none");
    $("#conteudo").removeClass("d-none");
    $("#historico-dropdown").removeClass("d-none");
    $("#divider-dropdown").show();

    tipoUsuarioAtual = null;

    swalPadrao.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Você foi deslogado.',
      timer: 1000,
      showConfirmButton: false
    });
  });

  // Verificar se o usuário está logado ao carregar a página
  if (localStorage.getItem("usuarioId")) {
    // Se o usuário estiver logado, mostra o ícone de usuário
    $btnEntrar.addClass("d-none");
    $usuarioIcone.removeClass("d-none");
    const tipoUsuario = localStorage.getItem("tipoUsuario");
    if (tipoUsuario != "cliente") {
      $("#historico-dropdown").removeClass("d-none");
      mostrarConteudoFuncionario(tipoUsuario);
    }
  }

  // Atualiza a pagina do funcionario a cada 30 segundos
  setInterval(() => {
    if (tipoUsuarioAtual != "cliente" && tipoUsuarioAtual != null) {
      mostrarConteudoFuncionario(tipoUsuarioAtual);
    }
  }, 30000);
});
