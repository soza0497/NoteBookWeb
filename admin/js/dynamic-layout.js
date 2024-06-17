/**
 * Creates links to various CSS files and appends them to the <head> element.
 * @param {HTMLCollectionOf<HTMLHeadElement>} head The <head> element from the HTML document (you should use head[0]).
 * @param {string} jsonFile The path to the JSON file containing the links and other head elements.
 */
const setLinks = (head, jsonFile) => {
    fetch(jsonFile)
        .then(response => response.json())
        .then(headLinks => {
            headLinks.forEach(linkObj => {
                let element = document.createElement(linkObj.element);
                
                if (linkObj.attributes) {
                    linkObj.attributes.forEach(attr => {
                        element.setAttribute(attr.attributes, attr.value);
                    });
                }
                
                head[0].insertBefore(element, head[0].firstChild);
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

/**
 * Event listener for DOMContentLoaded that initializes the link setup in the <head> element.
 */
document.addEventListener("DOMContentLoaded", () => {
    // Variables
    let head = document.getElementsByTagName("head");

    // JSON File Path
    let headElementJSON = '/admin/json/head-element.json';

    // Function Call
    setLinks(head, headElementJSON);
});

