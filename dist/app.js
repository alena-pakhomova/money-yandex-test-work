"use strict";

(function() {
    const curRouter = new router({
        "index": indexPageModule,
        "page-card": pageCardModule
    });
})();
function cardPreview(domElem) {
    let currentCardPreviewClass = "card-promo__icon-link_card1";

    this.setCardPreview = function(cardIndex) {
        const newCardClass = "card-promo__icon-link_card" + (cardIndex);
        domElem.classList.remove(currentCardPreviewClass);
        domElem.classList.add(newCardClass);
        currentCardPreviewClass = newCardClass;
    };
}
function cardSwitcherItem(domElem, index, onClickCallback) {
    const SELECTED_ITEM_CLASS_NAME = "card-promo__slide-item_select";
    const self = this;

    this.domElement = domElem;
    this.index = index;
    this.onClickCallback = onClickCallback;

    this.select = function() {
        domElem.classList.add(SELECTED_ITEM_CLASS_NAME);
    };

    this.unSelect = function() {
        domElem.classList.remove(SELECTED_ITEM_CLASS_NAME);
    };

    this.domElement.onclick = function() {
        onClickCallback(self);
    };
}
function indexPageModule() {
    let selectedCardSwitcherItem;
    let cardsSwitcherItems = [];

    const cardPreviewDomElem = document.getElementsByClassName("card-promo__icon-link")[0];
    const cardsSwitcherItemsDomElem = document.getElementsByClassName("card-promo__slide-item");

    const localStorageService = new LocalStorageService();
    const cardPreviewComponent = new cardPreview(cardPreviewDomElem);

    for (let i = 0; i < cardsSwitcherItemsDomElem.length; i++) {
        const item = cardsSwitcherItemsDomElem[i];

        const itemClickCallback = function (si) {
            selectedCardSwitcherItem.unSelect();
            si.select();
            selectedCardSwitcherItem = si;

            cardPreviewComponent.setCardPreview(si.index);
            localStorageService.setSelectedCardIndex(si.index);
        };

        const newSwitcherItem = new cardSwitcherItem(item, i + 1, itemClickCallback);
        cardsSwitcherItems.push(newSwitcherItem);
    }

    const cardIndex = localStorageService.getSelectedCardIndex();
    selectedCardSwitcherItem = cardsSwitcherItems[cardIndex - 1];
    selectedCardSwitcherItem.select();
    cardPreviewComponent.setCardPreview(cardIndex);
}
function pageCardModule() {
    const cardPreviewComponent = new cardPreview(document.getElementsByClassName("card-promo__icon-link")[0]);

    let cardIndex = 1;
    cardIndex = localStorage.getItem("selected_card_index");
    if (!cardIndex) {
        cardIndex = 1;
    }

    cardPreviewComponent.setCardPreview(cardIndex);
}
function LocalStorageService() {
    const SELECTED_CARD_INDEX_KEY = "selected_card_index";
    
    this.getSelectedCardIndex = function() {
        let cardIndex = 1;
        cardIndex = localStorage.getItem(SELECTED_CARD_INDEX_KEY);
        if (!cardIndex) {
            cardIndex = 1;
        }

        return cardIndex;
    };

    this.setSelectedCardIndex = function(selectedCardIndex) {
        localStorage.setItem("selected_card_index", selectedCardIndex);
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