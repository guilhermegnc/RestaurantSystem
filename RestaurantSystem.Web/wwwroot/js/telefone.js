const telefoneInput = document.getElementById("telefoneCliente");

telefoneInput.addEventListener("input", function (e) {
  let cursor = telefoneInput.selectionStart;
  let originalLength = telefoneInput.value.length;

  let value = telefoneInput.value.replace(/\D/g, ""); // só números

  // Corrigir se exceder 11 dígitos
  if (value.length > 11) value = value.slice(0, 11);

  let formatted = "";

  if (value.length <= 10) {
    // (XX) XXXX-XXXX
    if (value.length > 0) formatted = "(" + value.substring(0, 2);
    if (value.length >= 3) formatted += ") " + value.substring(2, 6);
    if (value.length >= 7) formatted += "-" + value.substring(6);
  } else {
    // (XX) X XXXX-XXXX
    formatted =
      "(" +
      value.substring(0, 2) +
      ") " +
      value.substring(2, 3) +
      " " +
      value.substring(3, 7);
    if (value.length >= 8) formatted += "-" + value.substring(7);
  }

  telefoneInput.value = formatted;

  // Ajusta o cursor para não pular pro fim
  let newLength = formatted.length;
  telefoneInput.setSelectionRange(cursor + (newLength - originalLength), cursor + (newLength - originalLength));
});
