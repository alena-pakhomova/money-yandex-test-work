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