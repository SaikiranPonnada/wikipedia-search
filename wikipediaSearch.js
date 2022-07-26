let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;

    let resultItemElement = document.createElement("div");
    resultItemElement.classList.add("result-item");
    searchResultsEl.appendChild(resultItemElement);

    let resultTitleElement = document.createElement("a");
    resultTitleElement.classList.add("result-title");
    resultTitleElement.textContent = title;
    resultTitleElement.href = link;
    resultTitleElement.target = "_blank";
    resultItemElement.appendChild(resultTitleElement);

    let titleBreakEl = document.createElement("br");
    resultItemElement.appendChild(titleBreakEl);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemElement.appendChild(urlEl);

    let lineBreakEl = document.createElement("br");
    resultItemElement.appendChild(lineBreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("line-description");
    descriptionEl.textContent = description;
    resultItemElement.appendChild(descriptionEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {

        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none");

        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}


searchInputEl.addEventListener("keydown", searchWikipedia);