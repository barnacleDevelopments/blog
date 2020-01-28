const boldBtn = document.querySelector(".bold-btn")
const italicsBtn = document.querySelector(".italics-btn")
const underlineBtn = document.querySelector(".underline-btn")
const listBtn = document.querySelector(".list-btn")
const textArea = document.querySelector(".text-area")
const blogForm = document.querySelector(".blog-create-form").firstElementChild
const textContent = document.querySelector(".text-content")

console.log(blogForm)

function format(command, value) {
    document.execCommand(command, false, value);
 }

 function getContent() {
     console.log(textArea.textContent)
     console.log("rfthfh")
    textContent.value = textArea.innerHTML
 }


 boldBtn.addEventListener("click", () => {
    format("bold")
    textArea.focus()
 })

 italicsBtn.addEventListener("click", () => {
   format("italic")
   textArea.focus()
})


underlineBtn.addEventListener("click", () => {
   format("underline")
   textArea.focus()
})


listBtn.addEventListener("click", () => {
   format("insertunorderedlist")
   textArea.focus()
})

blogForm.addEventListener("submit", () => {
    getContent()
})

