function cardPreview(domElem) {
    let currentCardPreviewClass = "card-promo__icon-link_card1";

    this.setCardPreview = function(cardIndex) {
        const newCardClass = "card-promo__icon-link_card" + (cardIndex);
        domElem.classList.remove(currentCardPreviewClass);
        domElem.classList.add(newCardClass);
        currentCardPreviewClass = newCardClass;
    };
}