let body = document.body;
let menu_button = document.getElementById("menu_button");
let menu_item = document.getElementsByClassName("menu-wrapper");
let menu_link = document.getElementsByClassName("menu_link");
let nav = document.querySelector("nav");
let bag = document.getElementById("bag");
let logo = document.getElementById("logo");
let search_icon_desktop = document.getElementById("search-icon");
let search_icon_desktop_submit = document.getElementById("search-icon-submit");
let search_clear_desktop = document.getElementById("clear-search");
let search_box_desktop = document.getElementById("search-box");
let search_box_mobile = document.getElementById("search-box-mobile");
let search_clear_mobile = document.getElementById("clear-search-mobile");
let search_icon_mobile = document.getElementById("search-icon-mobile");
let menu_clicked = false;
let search_desktop_clicked = false;


// Media Listener
window.matchMedia("(min-width: 921px)").addListener(menu_toggle)
window.matchMedia("(max-width: 920px)").addListener(closeSearchDesktop)


// Bag
if (localStorage.getItem('bagitems') === null) {
    var bagitems = {};
} else {
    var bagitems = JSON.parse(localStorage.getItem('bagitems'));
}

let bag_number = document.getElementById('bag-number');


function refreshBagIcon() {
    if (Object.keys(bagitems).length == 0) {
        bag_number.innerHTML = "";
    } else {
        let bag_quantity = 0;
        for (let i in bagitems) {
            bag_quantity += bagitems[i].Quantidade
            if (bag_quantity > 99) {
                bag_quantity = "+";
                break;
            }
        }
        bag_number.innerHTML = bag_quantity;
    }
}

refreshBagIcon();

// Menu
function menu_toggle(option) {
    if (!menu_clicked && option == 0) {
        menu_button.classList.add("menu_button_open");
        nav.style = "background: rgb(255, 255, 255); height: 100vh; max-height: 44px;";
        body.style = "overflow: hidden;";
        logo.style = "top: 22px;";
        bag.style = "opacity: 0; visibility: hidden";
        menu_clicked = true;
        nav.style.maxHeight = 100 + "%";
        for (let i = 0; i < menu_link.length; i++) {
            menu_link[i].style.display = "block";
        }
    } else if (menu_clicked) {
        if (option != 0) {
            nav.classList.add("no-transition");
        }
        menu_button.classList.remove("menu_button_open");
        nav.removeAttribute("class")
        nav.removeAttribute("style")
        body.removeAttribute("style")
        logo.removeAttribute("style")
        bag.removeAttribute("style")
        menu_clicked = false;
        for (let i = 0; i < menu_link.length; i++) {
            menu_link[i].removeAttribute("style")
        }
    }
}

// Search
function checkSearch(option) {
    if (!option) {
        if (search_box_desktop.value === "") {
            search_icon_desktop_submit.disabled = true;
            search_icon_desktop_submit.style.cursor = "default";
        } else {
            search_icon_desktop_submit.disabled = false;
            search_icon_desktop_submit.style.cursor = "pointer";
        }
    } else {
        if (search_box_mobile.value === "") {
            search_icon_mobile.disabled = true;
            search_icon_mobile.style.cursor = "default";
            search_clear_mobile.style.display = "none";
        } else {
            search_icon_mobile.disabled = false;
            search_icon_mobile.style.cursor = "pointer";
            search_clear_mobile.style.display = "block";
        }
    }
}


// Search - Desktop
search_icon_desktop.onclick = function() {
    if (!search_desktop_clicked) {
        search_desktop_clicked = true
        search_box_desktop.classList.remove("search-box-inactive");
        search_clear_desktop.removeAttribute("style");
        search_icon_desktop.style.display = "none";
        search_icon_desktop_submit.style.display = "block";
        search_icon_desktop_submit.disabled = true;
        search_icon_desktop_submit.style.cursor = "default";
    }
}

function closeSearchDesktop() {
    search_desktop_clicked = false
    search_box_desktop.classList.add("search-box-inactive");
    search_clear_desktop.style.display = "none";
    search_icon_desktop.removeAttribute("style");
    search_icon_desktop_submit.style.display = "none";
    search_box_desktop.value = '';
    search_icon_desktop.disabled = false;
}

search_clear_desktop.onclick = closeSearchDesktop;


// Search - Mobile
function closeSearchMobile() {
    search_box_mobile.value = '';
    search_icon_mobile.disabled = true;
    search_clear_mobile.style.display = "none";
}

search_clear_mobile.onclick = closeSearchMobile;


function refreshLocalstorage() {
    localStorage.setItem("bagitems", JSON.stringify(bagitems));
}
