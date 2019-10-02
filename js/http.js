export class HTTP {

    static getJSON(url) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.onreadystatechange = (evt) => {
                if (req.readyState === 4 && req.status === 200) {
                    resolve(JSON.parse(req.responseText));
                }
            };
            req.open("GET", url, true);
            req.setRequestHeader('accept', 'application/json');
            req.setRequestHeader('content-type', 'application/json');
            req.send();
        });
    }

    static postJSON(url, data) {
        return new Promise((resolve, reject)=> {
            const req = new XMLHttpRequest();
            req.onreadystatechange = (evt) => {
                if (req.readyState === 4 && req.status === 200) {
                    resolve(JSON.parse(req.responseText));
                }
            };
            req.open("GET", url, true);
            req.setRequestHeader('accept', 'application/json');
            req.setRequestHeader('content-type', 'application/json');
            req.send(JSON.stringify(data));
        });
    }
}