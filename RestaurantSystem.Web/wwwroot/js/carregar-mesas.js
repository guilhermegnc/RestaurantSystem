$(document).ready(function () {
  $.ajax({
    url: "http://localhost:5201/api/mesas", // ajuste a porta se necessário
    type: "GET",
    success: function (mesas) {
      const mesaGrid = $(".mesa-grid");
      mesaGrid.empty(); // Garante que começa vazio

      mesas.$values.forEach(mesa => {
        console.log('oi');
        const button = $("<button>")
          .addClass("mesa-btn")
          .attr("data-num", mesa.numero)
          .text(mesa.numero);
        mesaGrid.append(button);
      });
    },
    error: function () {
      console.error("Erro ao carregar as mesas.");
    }
  });

  $(document).on("click", ".mesa-btn", function () {
    $(".mesa-btn").removeClass("active");
    $(this).addClass("active");
  });
});