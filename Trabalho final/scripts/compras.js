// Sidebar
$('.cate-btn').click(function() {
    $('.cate-show').toggleClass("show");
});

$('.tempo-btn').click(function() {
    $('.tempo-show').toggleClass("show");
});

// Inicialização da página
// Desmarcando caixas do filtro
$(".filter_checkbox:checked").prop("checked", false);


window.matchMedia("(min-width: 921px)").addListener(resetType)

function resetType() {
    document.getElementById("type-list").classList.add('type-display-none');
    document.getElementById("gender-list").classList.add('type-display-none');
}

// Gerar produtos sem filtro
let filtro_categorias = [];
refreshProducts(filtro_categorias);

// Gerar produtos quando um filtro por selecionado
function refreshCheckboxes() {
    filtro_categorias = [];
    let checkboxes = document.querySelectorAll('input[name=categoria]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            filtro_categorias.push(checkboxes[i].value)
            checkboxes[i].parentNode.parentNode.style = "background-color: #EDEDED; color: #0077ed";
        } else {
            checkboxes[i].parentNode.parentNode.style = "";
        }
    }
    refreshProducts(filtro_categorias);
}

// Adicionar ao carrinho
function addToBag(id) {
    let button = document.getElementById("add-to-bag-button-" + id);
    if (id in bagitems) {
        if (bagitems[id].Quantidade < 10) {
            bagitems[id] = {
                Quantidade: bagitems[id].Quantidade + 1
            };
            button.classList.add("pre-animation");
            if (bagitems[id].Quantidade == 10) {
              button.style.backgroundColor = "#bebebe"
            }
        }
    } else {
        bagitems[id] = {
            Quantidade: 1
        }
        button.classList.add("pre-animation");
    }
    refreshLocalstorage();
    refreshBagIcon();
    setTimeout(function() {
        button.classList.remove("pre-animation");
    }, 100)
}

// Verifica se dois arrays possuem elementos em comum, retornando true ou false
function elementosComuns(array1, array2) {
    return array1.some(item => array2.includes(item));
}

// Gerar produtos
function refreshProducts(array) {
    let listaProdutos = document.getElementById("listProdutos");
    listaProdutos.classList.add("pre-animation");
    setTimeout(function() {
        listaProdutos.innerHTML = "";
        for (let i in data) {
            if (array.length != 0) {
                // Filtro inclusivo
                if (!elementosComuns(array, data[i].Categoria)) {
                    continue;
                }
            }
            let div_produto = document.createElement('div');
            div_produto.classList.add('produto');
            div_produto.innerHTML = `<li class="produto-inner-wrapper"><img class="imagem" src="assets/images/products/` + i + `/1.webp"><a id="name-` + i + `" class="nome">` + data[i].Nome + `</a><a id="price-` + i + `" class="price">R$59,99</a><button class="add-to-bag" id="add-to-bag-button-` + i + `"onclick="addToBag('` + i + `')">Adicionar à sacola</button></li>`;
            div_produto.querySelector("#price-" + i).innerText = Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(data[i].Preço);
            listaProdutos.appendChild(div_produto);
        }
        listaProdutos.classList.remove("pre-animation");
    }, 210)
}

function typeShow(id) {
    if (window.innerWidth > 920) {
        return;
    }
    if (id == 0) {
        let list = document.getElementById("type-list")
        let icon = document.getElementById('expand-type');
        if (list.classList.contains('type-display-none')) {
            list.classList.remove('type-display-none');
            icon.classList.add('rotate');
        } else {
            list.classList.add('type-display-none');
            icon.classList.remove('rotate');
        }
    } else if (id == 1) {
        let list = document.getElementById("gender-list")
        let icon = document.getElementById('expand-gender');
        if (list.classList.contains('type-display-none')) {
            list.classList.remove('type-display-none');
            icon.classList.add('rotate');
        } else {
            list.classList.add('type-display-none');
            icon.classList.remove('rotate');
        }
    }
}
