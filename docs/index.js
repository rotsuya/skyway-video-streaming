const word = document.getElementById('word');
const btnSend = document.getElementById('btnSend');
const btnReceive = document.getElementById('btnReceive');
const storedWord = localStorage.word;

function getHash() {
    const formValue = word.value;
    const encoded = encodeURIComponent(formValue);
    return encoded.replace(/[^A-Za-z0-9_-]/g, '');
}

function launchApp(url) {
    localStorage.word = word.value;
    const hash = getHash();
    location.href = url + '#' + hash;
}

function enableButton() {
    const hash = getHash();
    if (hash.length > 0) {
        btnSend.disabled = false;
        btnReceive.disabled = false;
    } else {
        btnSend.disabled = true;
        btnReceive.disabled = true;
    }
}

if (storedWord) {
    word.value = storedWord;
    enableButton();
}

btnSend.addEventListener('click', () => {
    launchApp('send.html');
});

btnReceive.addEventListener('click', () => {
    launchApp('receive.html');
});

word.addEventListener('input', enableButton);
