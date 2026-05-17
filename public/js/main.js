console.log('live from browser console');
const articleContainer = document.querySelector(".features");

var dataObject = []

function openAPost(e)
{
    var elementId = e.target.getAttribute('href');
    const params = {id:elementId}
    fetch(`/elementId`, {method: 'GET'}).then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log('Error on net', data.error)
        }else{
            console.log(data)
        }
    })
})
}

function FormulateImgElement(pd) {
    var element = document.createElement("a")
    element.text = pd.description
    element.href = pd._id
    element.target = "_blank"
    element.setAttribute("class", "card")
    element.addEventListener("click", openAPost)
    dataObject.push(element)
    dataObject.forEach(AppendElement)
}
   
function AppendElement(pd) {
    articleContainer.appendChild(pd)
}


fetch('/allpost').then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log('Error on net', data.error)
        }else{
            data.forEach(FormulateImgElement)
        }
    })
})

