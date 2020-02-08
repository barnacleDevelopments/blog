const searchInput     = document.getElementById("search-input")
const searchContainer = document.getElementById("search-items")

searchInput.addEventListener("input", () => {
    const searchQuery = searchInput.value
    if(!searchQuery) {
       searchInput.dataset.state = ""
    }

    const trimmed = searchQuery.trim()

    if(trimmed) {
        searchInput.dataset.state = "valid"
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              handleData(JSON.parse(this.responseText), searchQuery)
          }
        };
        xhttp.open("GET", "/blogs/search", true);
        xhttp.send();
    } else {
        searchInput.dataset.state = "invalid"
        emptySearchSuggestions()
    }


})


const handleData = (data, searchQuery) => {    
   const blogData = data.map((data) => {
       return {
           title: data.title.toLowerCase(),
           id: data._id
       }
   })

    blogData.forEach((blog) => {
        if(blog.title.includes(searchQuery)) {
                createSearchSuggestion(blog)
        }
    }) 
}

const createSearchSuggestion = (blog) => {

        let blogTitleText = document.createTextNode(blog.title)
        let link          = document.createElement("a")
        link.appendChild(blogTitleText)
        link.href = `/blogs/${blog.id}`
        let listItem = document.createElement("li")
        listItem.appendChild(link)
        searchContainer.appendChild(listItem) 
}

const emptySearchSuggestions= () => {
    while(searchContainer.firstChild) {
        searchContainer.removeChild(searchContainer.firstElementChild)
    }

}

window.addEventListener("click", (e) => {
    e.target.value = ""
    emptySearchSuggestions() 
})

searchInput.addEventListener("focus", (e) => {
    emptySearchSuggestions()
    e.target.value = ""
})



  

