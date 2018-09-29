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