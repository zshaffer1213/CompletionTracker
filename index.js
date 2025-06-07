import {storeData as initialData, storeData} from './data.js'

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
                <a href="sms:${store.text}"><button class="btn"><i class="fa-solid fa-comment"></i> SM</button></a>
                <a href="tel:${store.phone}"><button class="btn"><i class="fa-solid fa-phone"></i> Store</button></a>
            </div>
            `

        return storeListHtml
        }).join('')
        

        // progress bar logic
        const total = data.length
        const complete = data.filter(store => store.isComplete).length
        const percent = Math.round((complete / total) * 100);

        const progressBar =  document.getElementById('progress-bar')
        const progressText = document.getElementById('progress-text')

        progressBar.value = percent
        progressText.textContent = `${percent}%`
        
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

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
}