const boldBtn = document.querySelector(".bold-btn")
const italicsBtn = document.querySelector(".italics-btn")
const underlineBtn = document.querySelector(".underline-btn")
const listBtn = document.querySelector(".list-btn")
const textArea = document.querySelector(".text-area")
const blogForm = document.querySelector(".blog-create-form")
const textContent = document.querySelector(".text-content")

function format(command, value) {
    document.execCommand(command, false, value);
 }

 function getContent() {
    textContent.value = textArea.innerHTML
 }


 blogForm.addEventListener("submit", () => {
   getContent()
})


 boldBtn.addEventListener("click", (e) => {
   e.preventDefault()
    format("bold")
    textArea.focus()
 })

 italicsBtn.addEventListener("click", (e) => {
   e.preventDefault()
   format("italic")
   textArea.focus()
})


underlineBtn.addEventListener("click", (e) => {
   e.preventDefault()
   format("underline")
   textArea.focus()
})


listBtn.addEventListener("click", (e) => {
   e.preventDefault()
   format("insertunorderedlist")
   textArea.focus()
})


