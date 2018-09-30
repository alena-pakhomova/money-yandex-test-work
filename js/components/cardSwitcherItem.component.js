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