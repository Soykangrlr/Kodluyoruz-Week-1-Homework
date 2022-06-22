
let users = []
//Userların Yüklenmesi
loadUserDom.addEventListener('click', () => {
    getRequest("https:jsonplaceholder.typicode.com/users").then(response => {
        loadingDom.style.display = "block"
        hidePost.style.display = "none"
        loadPost.style.display = "inline-block"
         // setTimeout ile lodinDom daha fazla görünmesini sağladım
        setTimeout(() => {
            loadingDom.style.display = "none"
            users = response.map((x, index) => {
                x.orderNo = index + 1
                return x
            })
            search.style.display="block"
            userDom.style.display = "block"
            postdom.style.display = "none"
            renderUsers(users)
        }, 1000)


    })
})
//User Render
const renderUsers = (users = []) => {
    userDom.innerHTML = ""
    const table = document.createElement("table")

    table.classList.add("table")
    table.id = "myTable"
    const thead = document.createElement("thead")
    thead.innerHTML = `
    <tr>
      <th  scope="col">Id</th>
      <th    scope="col">Sıra No</th>
      <th  scope="col">Name</th>
      <th  scope="col">Email</th>
      <th  scope="col">Phone</th>
      <th scope="col">Website</th>
      <th  scope="col">Actions</th>
    </tr>`
    table.appendChild(thead)

    const tbody = document.createElement("tbody")

    tbody.innerHTML = users.map((user, index) => {
        return `<tr>
        <td  scope="row">${user.id}</td>
        <td  scope="row">${index + 1}</td>
        <td >${user.name}</td>
        <td >${user.email}</td>
        <td >${user.phone}</td>
        <td >${user.website}</td>
        <td>
        <button type="button" class="btn btn-danger btn-sm remove" data-id="${user.id}">Sil</button>
        <button type="button" class="btn btn-warning btn-sm update" data-id="${user.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Düzenle</button>
        </td>
      </tr>`
    }).join(" ")
    table.appendChild(tbody)
    userDom.appendChild(table)
    tdDom = document.querySelectorAll('td') //Search için burada alındı
    // Sil butonu için gerekli kodlar
    document.querySelectorAll(".remove").forEach(button => {
        button.addEventListener("click", function () {
            const status = confirm("Kaydı silmek üzeresiniz emin misiniz?")
            if (status) {
                const id = this.getAttribute("data-id")
                renderUsers(users.filter(x => x.id != id))
             
            }
        })
    })
    // update butonu için gerekli kodlar
    document.querySelectorAll(".update").forEach(button => {
        button.addEventListener("click", function () {
            const id = this.getAttribute("data-id")
            const _user = users.find(user => user.id == id)
            updateModal(_user)
        })
    })


    //Sıralama işlemleri için gerekli kodlar
    document.querySelectorAll('th').forEach(th => th.addEventListener('click', () => {
        let tdArray = []
        const tdDom = document.querySelectorAll('td')
        tdDom.forEach(td => {
            if (td.cellIndex == th.cellIndex) {  //tıklana th'nin altındaki td'leri yakaladım
                //Eğer cellIndex 0(id) veya 1(sırano) ise number push yaptım değilse string
                if (th.cellIndex == 0 || th.cellIndex == 1) {
                    tdArray.push(Number(td.textContent))
                } else {
                    tdArray.push(td.textContent)
                }
            }

        })
        //push işlemi tamamalandıktan sonra tıklana th'ye göre number sıralama veya strin sıralama yaptım
        //Bundan dolayı tekrar sorgulattım
        if (th.cellIndex == 0 || th.cellIndex == 1) {
            //Eğer ilk değer ,2. değerden küçükse(Büyükten küçüğe Sıralandı)
            //değise (Küçükten Büyüğe)
            if (tdArray[0] < tdArray[1]) { tdArray.sort(function (a, b) { return b - a }) }
            else { tdArray.sort(function (a, b) { return a - b }) }


            for (let i = 0; i <= tdArray.length - 1; i++) {
                tdDom.forEach(td => {
                    if (tdArray[i] == td.textContent) {
                        //Gelen td'lerin perantlarını alıp table ekledim
                        tbody.appendChild(td.parentNode)
                        table.appendChild(tbody)
                    }

                })
            }

        } 
        //Gelen değer strin ise bu alana düşecek ve string sıralama yapılacak
        else {
            // string değerleri sorgulatıp ona göre sıralandı
            if (tdArray[0] < tdArray[1]) {
                // z-a sıralama sort ile a-z sıranlanıp reverse ile ters çevirdim
                tdArray.sort()
                tdArray.reverse()
            } else {
                // a-z sıralama yapıldı
                 tdArray.sort() }

            for (let i = 0; i <= tdArray.length - 1; i++) {
                tdDom.forEach(td => {
                    if (tdArray[i] == td.textContent) {
                        //Gelen td'lerin perantlarını alıp table ekledim
                        tbody.appendChild(td.parentNode)
                        table.appendChild(tbody)
                       
                        
                    }

                })
            }
        }
    }

    ))
   
   //Search Kodları
    userSearch.addEventListener('keyup',(e)=>{
        let textFind=e.target.value.toLowerCase()
        tbody.innerHTML=''
        table.innerHTML=''
        let tdText=''
            tdDom.forEach(td => {
                tdText=td.textContent.toLowerCase()
                
               if(tdText.includes(textFind)==true){
                console.log(td.parentNode)
                    tbody.insertAdjacentElement("beforeend",td.parentNode)
                    table.appendChild(tbody)
                    table.appendChild(thead)
                 
               }
               
            })
         
    })

}
//update Modal value'ya tablodaki değeri atandı
const updateModal = (user) => {
    document.querySelector("#labelName").value = user.name
    document.querySelector("#labelPhone").value = user.phone
    document.querySelector("#labelWebSite").value = user.website
    document.querySelector("#labelEmail").value = user.email
    document.querySelector("#userId").value = user.id
}
// değiştirilen user kaydedildi
const updateUser = () => {
    const name = document.querySelector("#labelName").value
    const phone = document.querySelector("#labelPhone").value
    const webSite = document.querySelector("#labelWebSite").value
    const email = document.querySelector("#labelEmail").value
    const userId = document.querySelector("#userId").value
    const index = users.findIndex(user => user.id == userId)
    users[index] = { name, phone, website: webSite, email, id: userId }
    renderUsers(users)
    alert("Kayıt Başarılı")
}
// save button click işlemi
document.querySelector('#save').addEventListener('click', updateUser)

