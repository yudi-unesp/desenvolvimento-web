/*localStorage.setItem('subtotal', subtotal);
localStorage.setItem('shipp', valueCep);
localStorage.setItem('total', totalTotal);*/
let purchased = JSON.parse(localStorage.getItem('purchased'));
let subtotal = 0;

$('#input-cc').blur(function() {
    $(this).mask("9999 9999 9999 9999");
});

$("#zipcode").blur(function() {
    let cep = $("#zipcode").val().replace(/[^0-9]/, "");

    if (cep.length != 8) {
        return false;
    }

    $("#zipcode").mask("99999-999");
    $("#address").val("").prop("disabled", false);
    $("#city").val("").prop("disabled", false);
    $("#state").val("").prop("disabled", false);

    $.getJSON("https://viacep.com.br/ws/" + cep + "/json/", function(apidata) {
        if (!(apidata.erro)) {
            $("#address").val(apidata.logradouro).prop("disabled", true);
            $("#city").val(apidata.localidade).prop("disabled", true);
            $("#state").val(apidata.uf).prop("disabled", true);
            $("#streetnumber").focus();

        }
    });
});

$('#ID-payment').blur(function() {
    if (this.value.replace(/[^0-9]/, "").length != 11) {
        return false;
    }
    $(this).mask("999.999.999-99");
});



$("#validade").blur(function() {
    $("#validade").mask("99/9999");
});

let input_cc = document.getElementById('input-cc');
let network_icon = document.getElementById('network-icon');

input_cc.addEventListener('keyup', function() {

    $(network_icon).attr('class', 'network-default');

    if (input_cc.value && !input_cc.value.startsWith("3")) {
        network_icon.classList.add("network-show");
        document.getElementById('card-code').maxLength = "3";
    } else {
        network_icon.classList.remove("network-show");
    }
    if (input_cc.value.startsWith("4")) {
        network_icon.classList.add("network-visa");
    } else if (input_cc.value.startsWith("5")) {
        network_icon.classList.add("network-mastercard");
    } else if (input_cc.value.startsWith("34") || input_cc.value.startsWith("35")) {
        network_icon.classList.add("network-amex");
        network_icon.classList.add("network-show");
        document.getElementById('card-code').maxLength = "4";
    } else {
        network_icon.classList.add("network-unknown");
    }
});


for (let i in purchased[3]) {
    subtotal += data[i].Preço * purchased[3][i].Quantidade
}

refreshTotal(subtotal, purchased[0]);

function refreshTotal(subtotal, valueCep) {
    let summary_total_total = document.getElementById("summary-total-total")
    let totalTotal = subtotal + valueCep;


    let summary_shipping_total = document.getElementById('summary-shipping-total');

    summary_total_total.classList.add("pre-animation");
    summary_shipping_total.classList.add("pre-animation");

    setTimeout(function() {
        summary_total_total.innerHTML = (Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(totalTotal));
        summary_total_total.classList.remove("pre-animation");


        summary_shipping_total.innerHTML = (Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(purchased[0]));
        summary_shipping_total.classList.remove("pre-animation");

    }, 250)

    refreshSubtotal(subtotal);
}

function refreshSubtotal(subtotall) {
    let subtotal_text = document.getElementById('summary-value-total');
    subtotal_text.classList.add("pre-animation");
    setTimeout(function() {
        subtotal_text.innerHTML = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(subtotal);
        subtotal_text.classList.remove("pre-animation")
    }, 250)

}

$('#shipping-submit').submit(function() {
    bagitems = {};
    refreshLocalstorage();
    return true;
});
