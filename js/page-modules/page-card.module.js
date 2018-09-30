function pageCardModule() {
    const cardPreviewComponent = new cardPreview(document.getElementsByClassName("card-promo__icon-link")[0]);

    let cardIndex = 1;
    cardIndex = localStorage.getItem("selected_card_index");
    if (!cardIndex) {
        cardIndex = 1;
    }

    cardPreviewComponent.setCardPreview(cardIndex);
}