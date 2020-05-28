const aboutMe = 790
const portfolioPix = 1600

/**
 * scrollToElement is a helper function that will force window scroll to an 
 * element on the page. use this in conjunction with a const variable to scroll
 * to a section on the page.
 * 
 * id: the id of the specified element to scroll to
 */
scrollToElement = function (id) {
    console.log(id)
    document.getElementById(id).scrollIntoView()
}