// =============================================================================
// FUNCTIONS
// =============================================================================

function saveInLocalStorage(fruits){
    try {
        if(fruits instanceof Array){
            localStorage.setItem("fruits", JSON.stringify(fruits));
        }
    } catch (error) {
        alert("Error save in local storage - " + error);
    }
}

// =============================================================================

function cleanInputElementValue(inputElement){
    var value = inputElement.value;
    if(value){
        if(inputElement instanceof HTMLInputElement) {
            inputElement.value = "";
        }  
    }else{
        alert("Input element already cleaned");
    }
}

// =============================================================================

function deleteFruitInHTMLLIstAndInArray(fruits, fruit, listElement, fruitElement, linkElement){
    try {
        if(fruits instanceof Array){
            fruits.splice(fruit, 1);
            listElement.removeChild(fruitElement) && listElement.removeChild(linkElement);
            saveInLocalStorage(fruits);
        }
    } catch (error) {
        alert("Error delete fruit HTML and Array - " + error);
    }
}

// =============================================================================

function deleteAllHTLMAndArray(listElement, fruits){
    try {
        listElement.innerHTML = "";
        if(fruits instanceof Array){
            while(fruits.length > 0) {
                fruits.pop();
            }
        }
        saveInLocalStorage(fruits);
    } catch (error) {
        alert("Error in delete all HTML and Array - " + error);
    }
}

// =============================================================================

function renderFruitToHTMLList(fruits, fruit, listElement){
    try {
        var fruitElement = document.createElement("li");
        var linkElement = document.createElement("a");
    
        var fruitElementText = document.createTextNode(fruit);
        var linkElementText = document.createTextNode("Delete");
    
        fruitElement.setAttribute("id", fruit);
        linkElement.setAttribute("href", "#");
        linkElement.setAttribute("id", "link_" + fruit);
    
        linkElement.addEventListener("click", function() {deleteFruitInHTMLLIstAndInArray(fruits, fruit, listElement, document.getElementById(fruit), document.getElementById("link_" + fruit))});
    
        fruitElement.appendChild(fruitElementText);
        linkElement.appendChild(linkElementText);
    
        listElement.appendChild(fruitElement);
        listElement.appendChild(linkElement);

        saveInLocalStorage(fruits);
    } catch (error) {
        alert("Error in Render the Fruit to HTML list - " + error);
    }
}

// =============================================================================

function renderArrayFruitsToHTMLList(fruits, listElement){
    try {
        for (const fruit of fruits) {
            renderFruitToHTMLList(fruits, fruit, listElement);
        }
    } catch (error) {
        alert("Error in Render the Array Fruits to HTML list - " + error);
    }
}

// =============================================================================

function getFruitInInputTextAppendInFruitsListAndRender(inputElement, fruits, listElement){
    try {
        if(inputElement instanceof HTMLInputElement) {
            var fruit = inputElement.value;
            if(fruit){
                if(fruits.includes(fruit)){
                    cleanInputElementValue(inputElement);
                    alert("We alredy have the fruit " + fruit + " in our list...");
                }else{
                    if(fruits.length > 10){
                        cleanInputElementValue(inputElement);
                        alert("Your list is full")
                    }else{
                        cleanInputElementValue(inputElement);
                        fruits.push(fruit);
                        renderFruitToHTMLList(fruits, fruit, listElement);
                    }
                }
            }else{
                alert("We need a fruit to add in the list...");
            }
        }
    } catch (error) {
        alert("Error in get fruit in input and render in HTML list - " + error);
    }
}

// =============================================================================
// GETTING ELEMENTS
// =============================================================================

var listElement = document.querySelector("body ul");
var inputElement = document.querySelector("body div#app input#input");
var buttonElementAddList = document.querySelector("body div#app button#btn_add_list");
var buttonElementCleanText = document.querySelector("body div#app button#btn_clean_text");
var buttonElementCleanAll = document.querySelector("body div#app button#btn_clean_all");

// =============================================================================
// GETTING FRUITS ARRAY BASED IN LOCAL STORAGE
// =============================================================================

var fruits = JSON.parse(localStorage.getItem("fruits")) || ["Morango", "Uva"];

// =============================================================================
// RENDER ARRAY FRUITS TO HTML LIST
// =============================================================================

renderArrayFruitsToHTMLList(fruits, listElement);

// =============================================================================
// ADDING BUTTON EVENT LISTENER
// =============================================================================

buttonElementAddList.addEventListener("click", function () {getFruitInInputTextAppendInFruitsListAndRender(inputElement, fruits, listElement)});
buttonElementCleanText.addEventListener("click", function () {cleanInputElementValue(inputElement)});
buttonElementCleanAll.addEventListener("click", function () {deleteAllHTLMAndArray(listElement, fruits)});
