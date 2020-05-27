const portfolioPix = 800

/**
 * scrollToElement is a helper function that will force window scroll to an 
 * element on the page. use this in conjunction with a const variable to scroll
 * to a section on the page.
 * 
 * length: amount of pixels to scroll down
 */
scrollToElement = function (length) {
    window.scroll({
        top: length, 
        left: 0, 
        behavior: 'smooth'
    });
}