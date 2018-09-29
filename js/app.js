"use strict";

function slideItem(domElem, index) {
    const SELECTED_ITEM_CLASS_NAME = "card-promo__slide-item_select";

    this.domElement = domElem;
    this.index = index;

    this.select = function() {
        domElem.classList.add(SELECTED_ITEM_CLASS_NAME);
    };

    this.unSelect = function() {
        domElem.classList.remove(SELECTED_ITEM_CLASS_NAME);
    };
}

function cardIconLink(domElem) {
    let currentCardClass = "card-promo__icon-link_card1";

    this.setCard = function(cardIndex) {
        const newCardClass = "card-promo__icon-link_card" + (cardIndex);
        domElem.classList.remove(currentCardClass);
        domElem.classList.add(newCardClass);
        currentCardClass = newCardClass;
    };
}

function router(options) {
    const pathName = window.document.location.pathname;
    const currentPageName = window.document.location.pathname.substr(1, pathName.length - 6).toLowerCase();
    let currentModule = {};

    if (currentPageName in options) {
        currentModule = new options[currentPageName]();
    } else {
        currentModule = new options["index"]();
    }
}

function indexPageModule() {
    let selectedSlideItem;
    let slideItems = [];

    const cardsSlideItems = document.getElementsByClassName("card-promo__slide-item");
    const cardIconLinkElem = new cardIconLink(document.getElementsByClassName("card-promo__icon-link")[0]);

    for (let i = 0; i < cardsSlideItems.length; i++) {
        const item = cardsSlideItems[i];

        slideItems.push(new slideItem(item, i + 1));

        slideItems.forEach(si => {
            si.domElement.onclick = function() {
                selectedSlideItem.unSelect();
                si.select();
                selectedSlideItem = si;
    
                cardIconLinkElem.setCard(si.index);
                localStorage.setItem("selected_card_index", si.index);
            };
        });
    }

    let slideItemIndex = 1;
    if (sessionStorage) {
        slideItemIndex = localStorage.getItem("selected_card_index");
        if (!slideItemIndex) {
            slideItemIndex = 1;
        }
    }
    selectedSlideItem = slideItems[slideItemIndex - 1];
    selectedSlideItem.select();
    cardIconLinkElem.setCard(selectedSlideItem.index);
}

function pageCardModule() {
    const cardIconLinkElem = new cardIconLink(document.getElementsByClassName("card-promo__icon-link")[0]);

    let slideItemIndex = 1;
    if (sessionStorage) {
        slideItemIndex = localStorage.getItem("selected_card_index");
        if (!slideItemIndex) {
            slideItemIndex = 1;
        }
    }
    cardIconLinkElem.setCard(slideItemIndex);
}

(function() {
    const curRouter = new router({
        "index": indexPageModule,
        "page-card": pageCardModule
    });
})();