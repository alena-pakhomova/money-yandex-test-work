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