// post yükleme işlemleri
loadPost.addEventListener('click', () => {
    getRequest("https://jsonplaceholder.typicode.com/posts")
        .then(response => {
            userDom.style.display = "none"
            loadingDom.style.display = "block"
            search.style.display="none"
            // setTimeout ile lodinDom daha fazla görünmesini sağladım
            setTimeout(() => {
                loadingDom.style.display = "none"
                const post = response.slice(0, 20)
                renderPost(post)
                togglePost("block")
                loadPost.style.display = "none"
                hidePost.style.display = "inline-block"
            }, 500)

        })

})
const renderPost = (data = []) => {
    data.forEach((item) => {
        const li = document.createElement('li')
        li.innerHTML = `
    <div class="card border-primary mb-3">
    <div class="card-body">${item.title}</div>
    </div>
    `
        postdom.appendChild(li)
    })
}
//Post gizle butonu görünürlüğü ayarladım
hidePost.addEventListener('click', () => {
    togglePost("none")
    hidePost.style.display = "none"
    loadPost.style.display = "inline-block"
})




const togglePost = (display = "block") => {
    postdom.style.display = display
}

