// selectors

const myForm = document.querySelector('#entryForm');
const textArea = document.querySelector('.entry-textbox');
const entriesSection = document.querySelector('#entries');
const entriesNav = document.querySelector('.entries-nav');
const deleteBts = document.querySelectorAll('.delete-btn');
let targetbutton;

// event listeners

document.addEventListener('DOMContentLoaded', getLocalEntries);
myForm.addEventListener('submit', addEntryToDom);
entriesSection.addEventListener('click', deleteEntry);
entriesNav.addEventListener('click', deleteDisplayButton);

// functions

function addEntryToDom(evt) {
    // prevent form from submitting
    evt.preventDefault();

    // make section element visible
    entriesSection.classList.add('is-visible');

    // create entry
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('single-entry');
    const entryText = textArea.value;
    entryDiv.textContent = entryText;
    entryDiv.style.display = 'none';

    // create entry delete button
    const deleteBt = document.createElement('button');
    deleteBt.classList.add('delete-btn');
    deleteBt.textContent = 'Delete';
    entryDiv.append(deleteBt);

    // add entry div to section
    entriesSection.appendChild(entryDiv);
    textArea.value = '';

    // create displayEntryButton
    const displayEntryButton = document.createElement('button');
    displayEntryButton.classList.add('display-entry-button');
    displayEntryButton.innerText = new Date().toLocaleString();;
    entriesNav.append(displayEntryButton);

    // create object to store both values
    const entry = {
        number: displayEntryButton.innerText,
        text: entryText
    }
    // save in local storage
    saveLocalEntries(entry);

    // add click event to close all entrydivs except target one 
    displayEntryButton.addEventListener('click', (entry) => {
        const allEntries = document.querySelectorAll('.single-entry');
        for (let i = 0; i < allEntries.length; i++) {
            allEntries[i].style.display = 'none';
        }
        entryDiv.style.display = 'block';
    });

}

function deleteDisplayButton(evt) {
    // get current display entry bt
    targetbutton = evt.target;

    // call delete entry function
    deleteEntry(evt);
}

function deleteEntry(evt) {
    // get current delete button
    const deleteBt = evt.target;

    if (deleteBt.classList[0] === 'delete-btn') {
        // get parent from delete bt
        const entry = deleteBt.parentElement;
        entry.remove();
        targetbutton.remove();
        // pass the display entry bt
        deleteLocalEntries(targetbutton);
    }
}

function saveLocalEntries(entry) {
    // check if already have entries
    let entries;

    if (localStorage.getItem('entries') === null) {
        // if not create array
        entries = [];
    } else {
        // show entries section
        entriesSection.classList.add('is-visible');
        //  get existing entries
        entries = JSON.parse(localStorage.getItem('entries'));
    }

    // add entry to array
    entries.push(entry);

    // save it lo localstorage
    localStorage.setItem('entries', JSON.stringify(entries));

}

function getLocalEntries() {
    // check if already have entries
    let entries;

    if (localStorage.getItem('entries') === null) {
        // if not create array
        entries = [];
    } else {
        // show entries section
        entriesSection.classList.add('is-visible');
        //  get existing entries
        entries = JSON.parse(localStorage.getItem('entries'));
    }

    entries.forEach(function (entry) {

        // create entry
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('single-entry');
        entryDiv.textContent = entry.text;
        entryDiv.style.display = 'none';

        // create entry delete button
        const deleteBt = document.createElement('button');
        deleteBt.classList.add('delete-btn');
        deleteBt.textContent = 'Delete';
        entryDiv.append(deleteBt);

        // add entry div to section
        entriesSection.appendChild(entryDiv);
        textArea.value = '';

        // create displayEntryButton
        const displayEntryButton = document.createElement('button');
        displayEntryButton.classList.add('display-entry-button');
        displayEntryButton.innerText = entry.number;
        entriesNav.append(displayEntryButton);

        // add click event to close all entrydivs except target one 
        displayEntryButton.addEventListener('click', (entry) => {
            const allEntries = document.querySelectorAll('.single-entry');
            for (let i = 0; i < allEntries.length; i++) {
                allEntries[i].style.display = 'none';
            }
            entryDiv.style.display = 'block';
        });

    })
}

function deleteLocalEntries(entry) {
    // check if already have entries
    let entries;

    if (localStorage.getItem('entries') === null) {
        // if not create array
        entries = [];
    } else {
        // show entries section
        entriesSection.classList.add('is-visible');
        //  get existing entries
        entries = JSON.parse(localStorage.getItem('entries'));
    }

    // get text form display entry button and find array index
    const index = entries.findIndex(x => x.number == entry.innerText);

    // remove stored entries value from found index
    entries.splice(index, 1);

    // get the stores entries
    localStorage.setItem('entries', JSON.stringify(entries));

}