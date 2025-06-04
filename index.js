import {storeData} from './data.js'

let data = JSON.parse(localStorage.getItem('storeData')) || storeData

function saveToLocal() {
    localStorage.setItem('storeData', JSON.stringify(storeData))
}

function render(d) {
    
    document.getElementById('store-list').innerHTML = d.map(function(store){
        
        let storeListHtml = ''
        
        if (store.isComplete) {
            storeListHtml += 
            `<div>
                <input type='checkbox' id='check-complete-${store.number}' data-store-number='${store.number}' checked>
                <label for='check-complete-${store.number}'>${store.location} | ${store.number}</label>
                <a href="tel:${store.number}"><button>Call Store</button></a>
            </div>
            `
        }

        else {
            storeListHtml +=
            `<div>
                <input type='checkbox' id='check-complete-${store.number}' data-store-number='${store.number}'>
                <label for='check-complete-${store.number}'>${store.location} | ${store.number}</label>
                <a href="tel:${store.number}"><button>Call Store</button></a>
            </div>
            `
        }
        return storeListHtml
        }).join('')
        
}

document.addEventListener('click', (e) => {
    if (e.target.dataset.storeNumber) {
        let targetStore = storeData.find(store => store.number === e.target.dataset.storeNumber)
        targetStore.isComplete = !targetStore.isComplete
        saveToLocal()
    }
})


  
render(data)