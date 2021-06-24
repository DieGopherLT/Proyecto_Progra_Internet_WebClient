import { meterToKilometer, minutesToHours, sliceName } from './helpers.js';
import { getRequestsList, defineProgressRequest } from './requests.js';

//VARIABLES

//Displayed data
const imageContainer = document.querySelector('#evidenceImage');
const nameParagraph = document.querySelector('#name');
const codeParagraph = document.querySelector('#code');
const timeParagraph = document.querySelector('#time');
const distanceParagraph = document.querySelector('#distance');

//Chevrons
const leftChevron = document.querySelector('#leftChevron');
const rightChevron = document.querySelector('#rightChevron');

//Buttons
const refreshButton = document.querySelector('#refreshButton');
const noRequestsRefreshButton = document.querySelector('#noRequestRefresh');
const acceptButton = document.querySelector('#acceptButton');
const rejectButton = document.querySelector('#rejectButton');

//Containers
const noRequestsContent = document.querySelector('.noRequestContentContainer');
const content = document.querySelector('.grid-container');

let index = 0;
let data = [];
let currentID;
let currentCode;
let previousSize = 0;
let currentSize = 0;

//EVENTS
document.addEventListener('DOMContentLoaded', getPendingProgressRequests);

refreshButton.addEventListener('click', getPendingProgressRequests);
noRequestsRefreshButton.addEventListener('click', getPendingProgressRequests);
leftChevron.addEventListener('click', previousRequest);
rightChevron.addEventListener('click', nextRequest);
acceptButton.addEventListener('click', () => commitChanges(0));
rejectButton.addEventListener('click', () => commitChanges(1));

//FUNCTIONS
async function getPendingProgressRequests() {
    index = 0;

    const { pendingProgressesList } = await getRequestsList();
    currentSize = pendingProgressesList.length;

    if(pendingProgressesList.length === 0){
        hideContent();
        hideChevrons();
        hideButtons();
        Swal.fire(
            'Resultado de actualización',
            'No hay solicitudes pendientes',
            'warning'
        );
    }
    else{
        data = pendingProgressesList;
        setData(data[index]);
        showContent();
        showChevrons();
        showButtons();
        Swal.fire(
            'Resultado de actualización',
            (previousSize >= currentSize) ? 'No hay solicitudes nuevas' : 'Nuevas solicitudes recibidas',
            (previousSize >= currentSize) ? 'warning' : 'success'
        )
    }
    previousSize = pendingProgressesList.length;
}

async function commitChanges(status){
    const { msg } = await defineProgressRequest(currentID, currentCode, status);
    data = data.filter(student => student.id !== currentID);

    if(data.length > 0 && index > 0){
        --index;
        setData(data[index]);
    }
    else if(data.length > 0 && index === 0){
        index = data.length - 1;
        setData(data[index]);
    }
    else if(data.length === 0){
        hideContent();
        hideChevrons();
        hideButtons();
    }

    Swal.fire(
        'Resultado de confirmación',
        msg,
        (status === 0) ? 'success' : 'error'
    )
}

function setData(data) {

    const { id, code, name, distance, time, image } = data;
    currentID = id;
    currentCode = code;

    imageContainer.src = image;
    nameParagraph.textContent = sliceName(name);
    codeParagraph.textContent = `Código: ${ code }`;
    timeParagraph.textContent = `En ${ minutesToHours(time) }`;
    distanceParagraph.textContent = `Recorrió ${ meterToKilometer(distance) } km`;
}

function previousRequest(){
    if(index === 0)
        index = data.length - 1;
    else
        --index;
    setData(data[index]);
}

function nextRequest(){
    if(index === data.length - 1)
        index = 0;
    else 
        ++index;
    setData(data[index]);
}

function hideButtons(){
    refreshButton.classList.add('none');
    acceptButton.classList.add('none');
    rejectButton.classList.add('none');
}

function showButtons(){
    refreshButton.classList.remove('none');
    acceptButton.classList.remove('none');
    rejectButton.classList.remove('none');
}

function hideChevrons(){
    leftChevron.classList.add('none');
    rightChevron.classList.add('none');
}

function showChevrons(){
    leftChevron.classList.remove('none');
    rightChevron.classList.remove('none');
}

function hideContent(){
    content.classList.add('none');
    noRequestsContent.classList.remove('none');
}

function showContent(){
    content.classList.remove('none');
    noRequestsContent.classList.add('none');
}
