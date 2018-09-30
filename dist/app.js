"use strict";

(function() {
    const curRouter = new router({
        "index": indexPageModule,
        "page-card": pageCardModule
    });
})();
function cardPreview(domElem, currentClass, newClassBaseName) {
    let currentCardPreviewClass = currentClass;

    this.setCardPreview = function(cardIndex) {
        const newCardClass = newClassBaseName + (cardIndex);
        domElem.classList.remove(currentCardPreviewClass);
        domElem.classList.add(newCardClass);
        currentCardPreviewClass = newCardClass;
    };
}
function cardSwitcherItem(domElem, selectedItemClassName, index, onClickCallback) {
    const self = this;

    this.domElement = domElem;
    this.index = index;
    this.onClickCallback = onClickCallback;

    this.select = function() {
        domElem.classList.add(selectedItemClassName);
    };

    this.unSelect = function() {
        domElem.classList.remove(selectedItemClassName);
    };

    this.domElement.onclick = function() {
        onClickCallback(self);
    };
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
function indexPageModule() {
    let selectedCardSwitcherItem;
    let cardsSwitcherItems = [];

    const cardPreviewDomElem = document.getElementsByClassName("card-promo__icon-link")[0];
    const cardsSwitcherItemsDomElem = document.getElementsByClassName("card-promo__slide-item");

    const localStorageService = new LocalStorageService();
    const cardPreviewComponent = new cardPreview(cardPreviewDomElem, "card-promo__icon-link_card1", "card-promo__icon-link_card");

    for (let i = 0; i < cardsSwitcherItemsDomElem.length; i++) {
        const item = cardsSwitcherItemsDomElem[i];

        const itemClickCallback = function (si) {
            selectedCardSwitcherItem.unSelect();
            si.select();
            selectedCardSwitcherItem = si;

            cardPreviewComponent.setCardPreview(si.index);
            localStorageService.setSelectedCardIndex(si.index);
        };

        const newSwitcherItem = new cardSwitcherItem(item, "card-promo__slide-item_select", i + 1, itemClickCallback);
        cardsSwitcherItems.push(newSwitcherItem);
    }

    const cardIndex = localStorageService.getSelectedCardIndex();
    selectedCardSwitcherItem = cardsSwitcherItems[cardIndex - 1];
    selectedCardSwitcherItem.select();
    cardPreviewComponent.setCardPreview(cardIndex);
}
function pageCardModule() {
    const cardPreviewComponent = new cardPreview(document.getElementsByClassName("card-promo__icon-link")[0], "card-promo__icon-link_card1", "card-promo__icon-link_card");
    const cardPreviewModalComponent = new cardPreview(document.getElementsByClassName("card-modwindow__card")[0], "card-modwindow__card1", "card-modwindow__card");
    const chooseNewDesignModal = $("#choose-card-design-modwindow");
    const chooseNewDesignModalButton = document.querySelector(".card-modwindow__button");

    const localStorageService = new LocalStorageService();
    let selectedCardSwitcherItem;
    let cardsSwitcherItems = [];
    const cardsSwitcherItemsModalDomElem = document.getElementsByClassName("card-modwindow__item");

    for (let i = 0; i < cardsSwitcherItemsModalDomElem.length; i++) {
        const item = cardsSwitcherItemsModalDomElem[i];

        const itemClickCallback = function (si) {
            selectedCardSwitcherItem.unSelect();
            si.select();
            selectedCardSwitcherItem = si;

            cardPreviewModalComponent.setCardPreview(si.index);
        };

        const newSwitcherItem = new cardSwitcherItem(item, "card-modwindow__item_selected", i + 1, itemClickCallback);
        cardsSwitcherItems.push(newSwitcherItem);
    }

    const cardIndex = localStorageService.getSelectedCardIndex();
    selectedCardSwitcherItem = cardsSwitcherItems[cardIndex - 1];
    selectedCardSwitcherItem.select();
    cardPreviewComponent.setCardPreview(cardIndex);
    cardPreviewModalComponent.setCardPreview(cardIndex);

    chooseNewDesignModalButton.onclick = function() {
        chooseNewDesignModal.modal("hide");

        cardPreviewComponent.setCardPreview(selectedCardSwitcherItem.index);
        localStorageService.setSelectedCardIndex(selectedCardSwitcherItem.index);
    }
}