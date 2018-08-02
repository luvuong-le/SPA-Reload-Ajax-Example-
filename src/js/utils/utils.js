const loader = document.getElementById('loader');

function replace(element, content) {
    element.innerHTML = content;
}

function showLoader() {
    loader.style.opacity = 1;
    loader.style.visibility = 'visible';
}

function hideLoader() {
    loader.style.opacity = 0;
    loader.style.visibility = 'hidden';
}

function createXHR(method, url, async, data, callback) {
    showLoader();
    
    let xhttp = new XMLHttpRequest();
    xhttp.open(method, url, async);

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    if (data !== null) {
        xhttp.send(data);
    } else {
        xhttp.send();
    }

    xhttp.onload = function() {
        hideLoader();
    }

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.response);
        }
    }
}

function returnURLName(string) {
    return string.split('/')[1];
}

module.exports = {
    replace,
    request: createXHR,
    returnURLName
}