import { data } from '/data.js'

const getStrainBtn = document.getElementById('get-strain-btn')
const effectsRadios = document.querySelector('#effects-radios');
const strainModalInner = document.getElementById('strain-modal-inner')
const listModal = document.getElementById('list-modal')
const listModalCloseBtn = document.getElementById('list-modal-close-btn')

effectsRadios.addEventListener('change', highlightChecked)

getStrainBtn.addEventListener('click', renderStrainList)


listModalCloseBtn.addEventListener('click', closeModal)

function closeModal() {
    listModal.style.display = 'none';
}


function highlightChecked(e) {
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}




function getStrainArray(strains){
    const strainArray = [];
    for (let strain of strains) {
        for (let effect of strain.effects) {
            if(!strainArray.includes(effect)){
                strainArray.push(effect)
            };
        }
    };
    return strainArray;
};


function renderEffectsRadios(strains) {
    let effectsItems = '';
    const effects = getStrainArray(strains);
    for (let effect of effects) {
        effectsItems += `
                        <div class="radio">
                        <input type="radio"
                        id="${effect}"
                        value="${effect}"
                        name="effects" />
                        <label for="${effect}">${effect}</label>
                        </div>                    
                        `
    };
    effectsRadios.innerHTML = effectsItems;
};
renderEffectsRadios(data)



function getMatchingStrainsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEffect = document.querySelector('input[type="radio"]:checked').value
       
        
        const matchingStrainsArray = data.filter(function(eff){
            
            return eff.effects.includes(selectedEffect)
                      
        })
        return matchingStrainsArray 
    }  
}

function renderStrainList() {
    
    let renderedList = ''
    const strainList = getMatchingStrainsArray()
    for (let strain of strainList) {
        renderedList += `
                        <div class="list-item">
                            <h2>${strain.name}</h2>
                            <div class="strain-card">
                                <img src="${strain.image}" />
                                <div class="stats">
                                        <div>${strain.type}</div>
                                          <div> THC: ${strain.thc}% </div> 
                                        //   <div>Helps With: ${strain.medical} </div>     
                                </div>
                            </div>
                        </div>                        `
    }
    listModal.style.display = 'block'
    strainModalInner.innerHTML = renderedList


}