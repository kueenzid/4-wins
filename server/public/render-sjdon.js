function renderSJDON(element, appRoot) {
    let newElement
    for (let i = 0; i < element.length; i++) {
        if(typeof element[i] == "string") {
            newElement = document.createElement(element[i])
            appRoot.appendChild(newElement)
        } else if(Array.isArray(element[i])) {
            let child = renderChild(element[i])
            newElement.appendChild(child)
        } else {
            setAttributes(newElement, element[i])
        }
    }
}

function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function renderChild(element) {
    console.log(element)
    let child = document.createElement(element[0])
    for(let j = 0; j < element.length; j++) {
        if(j == 0) {
            child = document.createElement(element[0])
        } else if(typeof element[j] == "string") {
            child.innerHTML = element[j]
        } else {
            setAttributes(child, element[j])
        }
    }
    return child
}

document.addEventListener('DOMContentLoaded', (event) => {
    const element =
    ["div", {style: "background: salmon"},
    ["h1", "Hello World"],
    ["h2", {style: "text-align:right"}, "from our library"] ]

    let appRoot = document.getElementById("app")
    
    renderSJDON(element, appRoot)
})
