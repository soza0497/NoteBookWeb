const setSubject = (element) => {
    let subject = document.createElement("div");
    subject.setAttribute("class", "side-nav__select");

    let spanSubject = document.createElement("span");
    spanSubject.setAttribute("class", "side-nav__selected");
    spanSubject.textContent = element.subject;

    subject.appendChild(spanSubject);

    return subject;
}

const setTopics = (element) => {
    let topics = document.createElement("ul");
    topics.setAttribute("class", "side-nav__menu disable")

    element.topics.forEach(topicItem => {
        let listItem = document.createElement("li");
        let listAnchor = document.createElement("a");
        listAnchor.setAttribute("href", topicItem.url);
        listAnchor.textContent = topicItem.topic;

        listItem.appendChild(listAnchor);

        topics.appendChild(listItem);
    });
    return topics;
}

const setDropDownElement = (element) => {
    let dropdownContainer = document.createElement("section");
    dropdownContainer.setAttribute("class", "side-nav__dropdown");

    if (element.topics.length > 0) {
        let subject = setSubject(element);
        let topics = setTopics(element);

        dropdownContainer.appendChild(subject);
        dropdownContainer.appendChild(topics);
    } else {
        let subject = setSubject(element);
        dropdownContainer.appendChild(subject);
    }

    return dropdownContainer;
    return null; // No devuelve nada si no pasa la validación
}

const setSideNav = (sideNav, jsonFile) => {
    fetch(jsonFile)
        .then(response => response.json())
        .then(sideNavElement => {
            sideNavElement.forEach(sideNavItem => {
                let dropdown = setDropDownElement(sideNavItem);
                if (dropdown) {
                    sideNav.appendChild(dropdown);
                }

            });

            // Llamar a la función para inicializar eventos y funcionalidades
            initializeSideNav();
        });
}

document.addEventListener("DOMContentLoaded", () => {
    let sideNavElement = document.querySelector("#sideNav")
    let navJson = "/data/nav.json";

    setSideNav(sideNavElement, navJson);
})

const initializeSideNav = () => {
    let selects = document.querySelectorAll(".side-nav__select");

    const showDropdown = menu => {
        menu.classList.toggle("disable");
    }

    const highlightText = selected => {
        selected.classList.toggle("side-nav__selected_active")
    }

    const toggleDropdown = (select) => {
        let menu = select.nextElementSibling;
        let selected = select.querySelector(".side-nav__selected");

        showDropdown(menu);
        highlightText(selected);
    }

    selects.forEach((select) => {
        select.addEventListener("click", (event) => {
            toggleDropdown(select);
        })
    });

}
