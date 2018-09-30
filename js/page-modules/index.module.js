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