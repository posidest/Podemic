
// functions here:

window.addEventListener("DOMContentLoaded", async (event)=>{
  const searchButton = document.getElementById('searchButton')
  if (searchButton){
    searchButton.addEventListener('click', (event)=> {
      document.getElementById('searchResults').classList.remove('hidden')
      document.getElementById('results-header').classList.remove('hidden')
      search()
    })

  }
});

const search= async () => {
  
  let searchTerm = document.getElementById('searchInput').value
  searchTerm.split(" ").join("%20")
  if (searchTerm===''){
    const searchResultsDiv = document.getElementById("searchResults")
    searchResultsDiv.innerText="Please enter a search term."
  }
  const response = await fetch(`/search/${searchTerm}`)
  const resJson = await response.json()
  
  

  
  let searchResults = []
  const searchResultsDiv = document.getElementById("searchResults")
  let arrayOfChildren =[]
  if (response.ok){
    searchResults = resJson
    if(searchResults.length=== 0){
      searchResultsDiv.innerText="There are no podcasts matching that search."
    }
    
    for(let i=0; i<searchResults.length; i++){
        let pod = searchResults[i]
        
      searchResultsDiv.innerText=''
      let ele =document.createElement("div")
      
      ele.setAttribute("class", "SearchResult___container")
      let podname = document.createElement('a')
      let podimg = document.createElement("img")
      podname.setAttribute('href', `/podcasts/${pod.id}`)
      podname.innerText= `${pod.title_original}`
      podimg.setAttribute('class', `feat__pod__img`)
      podimg.setAttribute('src', `${pod.thumbnail}`)
      podimg.setAttribute("onError","src='/images/logo.png'")
      ele.appendChild(podimg)
      ele.appendChild(podname)
      arrayOfChildren.push(ele)
      
    }
    searchResultsDiv.append(...arrayOfChildren)
  }

}
