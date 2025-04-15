$(document).ready(function () {
    const $telefoneInput = $("#telefoneCliente");

    $telefoneInput.on("input", function (e) {
        let cursor = $telefoneInput[0].selectionStart;
        let originalLength = $telefoneInput.val().length;

        let value = $telefoneInput.val().replace(/\D/g, ""); // só números

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

        $telefoneInput.val(formatted);

        // Ajusta o cursor para não pular pro fim
        let newLength = formatted.length;
        $telefoneInput[0].setSelectionRange(cursor + (newLength - originalLength), cursor + (newLength - originalLength));
    });
});