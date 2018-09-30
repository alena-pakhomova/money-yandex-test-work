function cardPreview(domElem, currentClass, newClassBaseName) {
    let currentCardPreviewClass = currentClass;

    this.setCardPreview = function(cardIndex) {
        const newCardClass = newClassBaseName + (cardIndex);
        domElem.classList.remove(currentCardPreviewClass);
        domElem.classList.add(newCardClass);
        currentCardPreviewClass = newCardClass;
    };
}