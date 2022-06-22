//gelen API json çevrime
function getRequest(url="") {
    return fetch(url)
   .then(response => {
            return response.json()
       
  })
  }
  
  window.getrequest = getRequest