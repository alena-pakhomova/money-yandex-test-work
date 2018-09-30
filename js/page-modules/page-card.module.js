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