let purchased = []
let valueCep = 0;
let cep = 0;
$('#zipcode').val('');

let subtotal = 0;
let subtotal_text = document.getElementById("summary-value-total");

let bag_item_list = document.getElementById("bag-item-list");
let bag_item_list_div = document.createElement("div");

if (jQuery.isEmptyObject(bagitems)) {
    document.getElementById("header-total").innerHTML = "Não há nada por aqui."
    document.getElementById("button-shipping-top").innerHTML = "Voltar ao início"
    document.getElementById("button-shipping-top").href = "index.html"
} else {

  if (localStorage.getItem("zipcode") !== null) {
      $("#zipcode").val(localStorage.getItem("zipcode"));
  }
    document.getElementById("header-total").innerHTML = `O total da sua compra é: <span class="total" id="total-total"></span>`

    for (let i in bagitems) {
        let li = document.createElement("li");
        li.id = i;
        let div_bag_item_row = document.createElement("div");
        div_bag_item_row.classList.add("bag-item", "row");

        let div_column_image_wrapper = document.createElement("div");
        div_column_image_wrapper.classList.add("column", "image-wrapper");
        let img = document.createElement("img");
        img.src = "assets/images/products/" + i + "/1.webp";
        img.alt = "";
        img.classList.add("image");
        div_column_image_wrapper.appendChild(img);
        div_bag_item_row.appendChild(div_column_image_wrapper);

        let div_column = document.createElement("div");
        div_column.classList.add("column");

        let div_details = document.createElement("div");
        div_details.classList.add("details");

        let div_product_name = document.createElement("div");
        div_product_name.classList.add("product-name");
        div_product_name.innerText = data[i].Nome;
        div_details.appendChild(div_product_name);

        let div_quantity = document.createElement("div");
        div_quantity.classList.add("quantity");

        let select = document.createElement("select");
        select.classList.add("quantity-element");
        select.setAttribute("onchange", `changeQuantity('` + i + `', this.selectedIndex + 1)`)

        for (let j = 1; j <= 10; j++) {
            if (bagitems[i].Quantidade >= j) {
                subtotal += data[i].Preço
            }
            if (bagitems[i].Quantidade == j) {
                select.innerHTML += '<option selected value="' + j + '">' + j + '</option>';
            } else {
                select.innerHTML += '<option value="' + j + '">' + j + '</option>';
            }
        }

        div_quantity.appendChild(select);

        let span_quantity_icon = document.createElement("span");
        span_quantity_icon.classList.add("quantity-icon");
        div_quantity.appendChild(span_quantity_icon);

        div_details.appendChild(div_quantity);
        let span_price = document.createElement("span");
        span_price.classList.add("price");
        span_price.id = "price-" + i;
        span_price.innerHTML = (Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(data[i].Preço * bagitems[i].Quantidade));

        div_details.appendChild(span_price);
        div_column.appendChild(div_details);
        div_column.innerHTML += `<div class="actions row"><div class="row-action"></div><div class="remove"><span class="remove-text" onclick="remove('` + i + `')">Remover</span></div></div>`
        div_bag_item_row.appendChild(div_column);
        li.appendChild(div_bag_item_row);
        bag_item_list_div.appendChild(li);
    }

    if (localStorage.getItem('purchased') !== null && JSON.parse(localStorage.getItem('purchased'))[0] !== undefined && JSON.parse(localStorage.getItem('purchased'))[1] === undefined) {
        valueCep = JSON.parse(localStorage.getItem('purchased'))[0];
        document.getElementById("summary-shipping-total").innerHTML = (Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(valueCep));
    }

    document.getElementById("summary").classList.remove("hidden");
    bag_item_list.appendChild(bag_item_list_div);
    refreshSubtotal(subtotal);
}
setTimeout(function() {
    document.querySelector("main").classList.remove("pre-animation");
}, 300)


// CEP
$('#button-zipcode').click(function() {
    $('.button-zipcode').toggleClass("hide");
});

$("#zipcode").blur(function() {
    let cep = this.value.replace(/[^0-9]/, "");

    if (cep.length != 8) {
        return false;
    }
    $(this).mask("99999-999");
});

function hideCep() {
    document.getElementById('button-zipcode').style.display = "none";
    let zipcode = document.getElementById('zipcode');
    zipcode.style.display = "block";
    zipcode.addEventListener('change', gerarValorCep);
}

function gerarValorCep() {
    localStorage.setItem('zipcode', document.getElementById("zipcode").value);
    let summary_shipping_total = document.getElementById("summary-shipping-total");
    valueCep = (Math.floor(Math.random() * 4700)) / 100;

    purchased[0] = valueCep;
    localStorage.setItem("purchased", JSON.stringify(purchased));

    refreshTotal(subtotal, valueCep);
    summary_shipping_total.classList.add("pre-animation");
    setTimeout(function() {
        summary_shipping_total.innerHTML = (Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(valueCep));
        summary_shipping_total.classList.remove("pre-animation");
    }, 250)
}

function refreshTotal(subtotal, valueCep) {
    let summary_total_total = document.getElementById("summary-total-total")
    let total_total = document.getElementById("total-total")
    let totalTotal = subtotal + valueCep;

    summary_total_total.classList.add("pre-animation");
    total_total.classList.add("pre-animation");

    setTimeout(function() {
        summary_total_total.innerHTML = (Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(totalTotal));

        total_total.innerHTML = (Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(totalTotal));

        summary_total_total.classList.remove("pre-animation");
        total_total.classList.remove("pre-animation");
    }, 250)
}

function changeQuantity(id, quantity) {

    let item_total_price = document.getElementById("price-" + id);
    item_total_price.classList.add("pre-animation");

    setTimeout(function() {
        item_total_price.innerHTML = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(data[id].Preço * quantity);
        item_total_price.classList.remove("pre-animation")
    }, 250)

    if (quantity > bagitems[id].Quantidade) {
        subtotal += data[id].Preço * (quantity - bagitems[id].Quantidade);
    } else if (quantity < bagitems[id].Quantidade) {
        subtotal -= data[id].Preço * (bagitems[id].Quantidade - quantity);
    }
    refreshSubtotal(subtotal);

    bagitems[id].Quantidade = quantity;
    refreshLocalstorage();
    refreshBagIcon();
}

function refreshSubtotal(subtotall) {
    subtotal_text.classList.add("pre-animation");
    setTimeout(function() {
        subtotal_text.innerHTML = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(subtotal);
        subtotal_text.classList.remove("pre-animation")
    }, 250)
    refreshTotal(subtotal, valueCep)
}

function remove(id) {
    delete bagitems[id];
    refreshLocalstorage();
    location.reload();
}
