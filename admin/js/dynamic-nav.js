const setSubject = (element) => {
    let subject = document.createElement("li");
    subject.setAttribute("class", "nav__button");

    let subjectLink = document.createElement("a");
    subjectLink.setAttribute("class", "nav__button-link");
    subjectLink.textContent = element.subject;

    subject.appendChild(subjectLink);

    return subject;
}

const setTopics = (element) => {
    let topics = document.createElement("ul");
    topics.setAttribute("class", "nav__dropdown")

    element.topics.forEach(topicItem => {
        let listItem = document.createElement("li");
        listItem.setAttribute("class", "dropdown__item");

        let listAnchor = document.createElement("a");
        listAnchor.setAttribute("href", topicItem.url);
        listAnchor.textContent = topicItem.topic;

        listItem.appendChild(listAnchor);
        topics.appendChild(listItem);
    });
    return topics;
}

const setNav = (nav, jsonFile) => {
    let container = document.createElement("ul");
    container.setAttribute("class", "nav__container");

    fetch(jsonFile)
        .then(response => response.json())
        .then(navElement => {
            navElement.forEach(navItem => {
                let subject = setSubject(navItem);
                let topics = setTopics(navItem);
                if (topics) {
                    subject.appendChild(topics)
                }
                container.appendChild(subject);
            });
            nav.appendChild(container);
            initializeSideNav();
        });
}

document.addEventListener("DOMContentLoaded", () => {
    let sideNavElement = document.querySelector("#sideNav")
    let navJson = "/data/nav.json";

    setNav(sideNavElement, navJson);
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
