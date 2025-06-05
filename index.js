import {storeData as initialData} from './data.js'

let data = JSON.parse(localStorage.getItem('storeData')) || initialData

function saveToLocal() {
    localStorage.setItem('storeData', JSON.stringify(data))
}

function render(d) {
    
    document.getElementById('store-list').innerHTML = d.map(function(store){
        
        let storeListHtml = ''
        
            storeListHtml += 
            `<div class="store">
                <input type='checkbox' id='check-complete-${store.number}' data-store-number='${store.number}' ${(store.isComplete) ? "checked" : " "}>
                <label for='check-complete-${store.number}'>${store.location} | ${store.number}</label>
                <a href="tel:${store.phone}"><button class="btn">Call Store</button></a>
            </div>
            `

        return storeListHtml
        }).join('')
        
}

document.addEventListener('click', (e) => {
    if (e.target.dataset.storeNumber) {
        let targetStore = data.find(store => store.number === e.target.dataset.storeNumber)
        targetStore.isComplete = !targetStore.isComplete
        saveToLocal()
        render(data)
    }
    else if (e.target.id === "reset") {

        if (confirm("Are you sure you want to reset all progress?")) {
            data = initialData
            saveToLocal()
            location.reload()
        }

    }
})


  
render(data)