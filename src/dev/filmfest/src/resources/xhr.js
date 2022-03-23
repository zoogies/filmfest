export default function basicxhr(route,data){
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://192.168.50.80:5000/"+route);
        xhr.setRequestHeader("Accept","apllication/json");
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } 
            else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            //this is where its rejecting on mobile TODO HTTPS
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(JSON.stringify(data));
        });
}

//file xhr
export function filexhr(file,data,route){
    return new Promise(function (resolve, reject) {
        var formData = new FormData();
        formData.append("file",file);
        for(const property in data){
            formData.append(`${property}`,`${data[property]}`)
        }
        //formData.append("file", file);
        //formData.append('id', data['id']);
        //formData.append('key', data['key']);
        //formData.append('first', data['first']);
        //formData.append('last', data['last']);
        //formData.append('bio', data['bio']);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://192.168.50.80:5000/'+route, true);

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } 
            else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            //this is where its rejecting on mobile TODO HTTPS
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };

        xhr.send(formData);
    });
}