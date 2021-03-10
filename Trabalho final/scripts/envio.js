if (localStorage.getItem("purchased") === null) {
    var purchased = []
} else {
    var purchased = JSON.parse(localStorage.getItem('purchased'));
}


$('#phone').blur(function() {
    if (this.value.replace(/[^0-9]/, "").length != 10) {
        return false;
    }
    $(this).mask("(99) 9999-9999");
});

$('#mobilephone').blur(function() {
    if (this.value.replace(/[^0-9]/, "").length != 11) {
        return false;
    }
    $(this).mask("(99) 99999-9999");
});

$('#ID-shipping').blur(function() {
    if (this.value.replace(/[^0-9]/, "").length != 11) {
        return false;
    }
    $(this).mask("999.999.999-99");
});

if (localStorage.getItem("zipcode") !== null) {
    $("#zipcode").val(localStorage.getItem("zipcode"));
    zipcodeval();
}

$("#zipcode").on('blur mouseup', function() {
    zipcodeval()
});

function zipcodeval() {
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
}

$('#shipping-submit').submit(function() {
    localStorage.setItem("zipcode", $("#zipcode").val())
    if (purchased[0] === undefined) {
        purchased[0] = (Math.floor(Math.random() * 4700)) / 100;
    }
    purchased[1] = Math.floor(Math.random() * 1000000);
    purchased[2] = Math.floor(Math.random() * 15);
    purchased[3] = JSON.parse(localStorage.getItem('bagitems'));
    localStorage.setItem("purchased", JSON.stringify(purchased));
    return true;
});
