document.querySelector('.page-loaded')
    .innerText = new Date().toLocaleTimeString();

document.querySelector('.ajax-get-html')
    .addEventListener('click', getAjaxHtml);

function getAjaxHtml() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.querySelector('.html-container')
                .innerHTML = xhr.responseText;
        }
    }
    xhr.open('GET', 'client-data.html', true);
    xhr.send();
}

document.querySelector('.fetch-html')
    .addEventListener('click', fetchHtml);

function fetchHtml() {
    fetch('client-data.html')
        .then( response => response.text() )
        .then( html => document.querySelector('.html-container').innerHTML = html );
}


// JSON
document.querySelector('.ajax-get-json')
    .addEventListener('click', getAjaxJson);

function getAjaxJson() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const clientData = JSON.parse(xhr.responseText);
            document.querySelector('.client-name').innerText = clientData.name;
            document.querySelector('.account-balance').innerText = clientData.balance;
        }
    }
    xhr.open('GET', 'client-data.json', true);
    xhr.send();
}

document.querySelector('.fetch-json')
    .addEventListener('click', fetchJson);

function fetchJson() {
    fetch('client-data.json')
        .then( response => response.json() )
        .then( clientData => {
            document.querySelector('.client-name').innerText = clientData.name;
            document.querySelector('.account-balance').innerText = clientData.balance;
        } );
}


// Form with backend handler
document.querySelector('.login-form input[type=submit]')
    .addEventListener('click', login);

function login(e) {
    e.preventDefault();
    fetch('login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            name: document.querySelector('.login-form input[name=name]').value,
            password: document.querySelector('.login-form input[name=password]').value
        })
    })
        .then(_ => document.querySelector('.login-form').reset());
}