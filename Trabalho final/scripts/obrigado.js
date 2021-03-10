if (localStorage.getItem('purchased') === null) {
    document.querySelector('main').innerHTML = "";
    throw new Error("Não há dados de compra");
}

let purchased = JSON.parse(localStorage.getItem('purchased'))

if (!purchased[3]) {
    document.querySelector('main').innerHTML = "";
    throw new Error("Não há dados de compra");
}

if (purchased[2] == 0) {
    document.getElementById('order-shipping-time').innerHTML = "Hoje";
} else if (purchased[2] == 1) {
    document.getElementById('order-shipping-time').innerHTML = "Amanhã";
} else {
    document.getElementById('order-shipping-time').innerHTML = purchased[2] + " dias";
}

document.getElementById('order-number').innerHTML = purchased[1].toString().padStart(6, "0");

let valueCep = 0;

let subtotal = 0;
let subtotal_text = document.getElementById("summary-value-total");

let bag_item_list = document.getElementById("bag-item-list");
let bag_item_list_div = document.createElement("div");


document.getElementById("summary").classList.remove("hidden");
for (let i in purchased[3]) {
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

    let select = document.createElement("a");
    select.classList.add("quantity-element");
    select.setAttribute("onchange", `changeQuantity('` + i + `', this.selectedIndex + 1)`)
    select.innerHTML += purchased[3][i].Quantidade;

    subtotal += data[i].Preço * purchased[3][i].Quantidade

    div_quantity.appendChild(select);

    div_details.appendChild(div_quantity);
    let span_price = document.createElement("span");
    span_price.classList.add("price");
    span_price.id = "price-" + i;
    span_price.innerHTML = (Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(data[i].Preço * purchased[3][i].Quantidade));

    div_details.appendChild(span_price);
    div_column.appendChild(div_details);
    div_bag_item_row.appendChild(div_column);
    li.appendChild(div_bag_item_row);
    bag_item_list_div.appendChild(li);
}

if (localStorage.getItem('purchased') !== null) {
    valueCep = JSON.parse(localStorage.getItem('purchased'))[0];
    document.getElementById("summary-shipping-total").innerHTML = (Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valueCep));
}
bag_item_list.appendChild(bag_item_list_div);
refreshSubtotal(subtotal);

setTimeout(function() {
    document.querySelector("main").classList.remove("pre-animation");
}, 300)


function refreshTotal(subtotal, valueCep) {
    let summary_total_total = document.getElementById("summary-total-total")

    let totalTotal = subtotal + valueCep;
    summary_total_total.classList.add("pre-animation");

    summary_total_total.innerHTML = (Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(totalTotal));


    summary_total_total.classList.remove("pre-animation");


}

function changeQuantity(id, quantity) {

    let item_total_price = document.getElementById("price-" + id);
    item_total_price.classList.add("pre-animation");


    item_total_price.innerHTML = Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(data[id].Preço * quantity);
    item_total_price.classList.remove("pre-animation")


    if (quantity > purchased[3][id].Quantidade) {
        subtotal += data[id].Preço * (quantity - purchased[3][id].Quantidade);
    } else if (quantity < purchased[3][id].Quantidade) {
        subtotal -= data[id].Preço * (purchased[3][id].Quantidade - quantity);
    }
    refreshSubtotal(subtotal);

    purchased[3][id].Quantidade = quantity;
    refreshLocalstorage();
    refreshBagIcon();
}

function refreshSubtotal(subtotall) {
    subtotal_text.classList.add("pre-animation");

    subtotal_text.innerHTML = Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(subtotal);
    subtotal_text.classList.remove("pre-animation")
    refreshTotal(subtotal, valueCep)
}

function showDetails() {
    document.getElementById("purchase-info").classList.remove("hidden");
}


localStorage.removeItem('purchased');
localStorage.removeItem('zipcode');
