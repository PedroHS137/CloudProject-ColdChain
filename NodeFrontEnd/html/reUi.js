function httpPOSTcloudant(data) {
    let xhr = new XMLHttpRequest();
    console.log(data);
    xhr.open("POST", 'https://us-south.functions.appdomain.cloud/api/v1/web/is708055%40iteso.mx_dev/guestbook/save-guestbook-entry-sequence', false);
    xhr.setRequestHeader('Content-Type','application/json')
    xhr.send(data);
    return xhr.responseText;
}


//document.addEventListener('DOMContentLoaded', () => {
    //agrega tu codigo de asignación de eventos...
    let btn = document.getElementById('btn1').addEventListener("click",(e)=>{
        let user = document.getElementById('user').value;
        let email = document.getElementById('email').value;
        let com = document.getElementById('rea').value;
        
        let data={
            name: user,
            email: email,
            comment: com
        };
        
        //let dta=JSON.parse(data);
        console.log(data);
        httpPOSTcloudant(JSON.stringify(data));

        
    })