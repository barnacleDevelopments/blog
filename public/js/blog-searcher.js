const searchInput = document.getElementById("blog-search")
const searchContainer = document.getElementById(("searched-items"))

searchInput.addEventListener("input", (e) => {
    const searchQuery = e.target.value
    var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        handleData(JSON.parse(this.responseText), searchQuery)
    }
  };
  xhttp.open("GET", "/blogs/search", true);
  xhttp.send();
})

const handleData = (data, searchQuery) => {
    const searchedItems = data.map((d) => {
        return titleLetters = d.title
    })
    
    let searchedContainer = []

    searchedItems.map((item) => {
        if(item.includes(searchQuery)) {
            searchedContainer.push(item)
        } 
    })
    
    sendResults(searchedContainer)
}


const sendResults = searchedContainer => {
    let list     = document.createElement("ul")
    searchedContainer.forEach((item) => {
        let itemText = document.createTextNode(item)
        let listItem = document.createElement("li")
        listItem.appendChild(itemText)
        list.appendChild(listItem)
    })

    searchContainer.appendChild(list)


   
}