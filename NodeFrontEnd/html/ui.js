 

const HTTTPMethods = {
    "put": "PUT",
    "post": "POST",
    "get": "GET",
    "delete": "DELETE"
}


const APIURL = window.location.protocol+'//'+window.location.host+'/';
function sendHTTPRequest(urlAPI, data, method, cbOK, cbError) {
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar:  PUT actualizar archivo
    xhr.open(method, urlAPI);
    // 3. indicar tipo de datos JSO
    xhr.send(data);
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200 && xhr.status != 201) { // analizar el estatus de la respuesta HTTP 
            // Ocurrió un error
            cbError(xhr.status + ': ' + xhr.statusText);
        } else {
            //console.log(xhr.responseText); // Significa que fue exitoso
            cbOK({
                status: xhr.status,
                data: xhr.responseText
            });
        }
    };
}

function arrTemperature(params) {
    let yuri = [];
    for (const i of params) {
        yuri.push(i.Temperature)
    }
    return yuri;
}

//document.addEventListener('DOMContentLoaded', () => {
    //agrega tu codigo de asignación de eventos...
    let btn = document.getElementById('btn').addEventListener("click",(e)=>{
        let input = document.getElementById('input').value;
        switch (input) {
            case "":
                alert("Ingresa un Id valido");
                break;
        
            default:
                
                sendHTTPRequest(APIURL+"temp?id="+input,"",HTTTPMethods.get,(result)=>{                 
                    let tempList= [];
                    
                    let yaoi = JSON.parse(result.data);                   
                    //console.log(yaoi.sensor1)
                    for (const i of yaoi.sensor1) {
                        tempList.push(i.Timestamp);
                    }
                          
                    var temp = document.getElementById('chart').getContext('2d');
                    var chart = new Chart(temp,{
                        
                      type:"line",
                      data:{
                        labels : tempList,
                        // xAxisID:"time",
                        // yAxisID:"temperature",
                        datasets : [
                          {
                            label:'sensor1',
                            data : arrTemperature(yaoi.sensor1),
                            //fillColor : "rgba(172,194,132,0.4)",
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                          },
                          {
                            label:'sensor2',
                            data : arrTemperature(yaoi.sensor2),
                            //fillColor : "rgba(172,194,132,0.4)",
                            fill: false,
                            borderColor: 'rgb(51, 96, 255)',
                          },
                          {
                            label:'sensor3',
                            data : arrTemperature(yaoi.sensor3),
                            //fillColor : "rgba(172,194,132,0.4)",
                            fill: false,
                            borderColor: 'rgb(178, 51, 255)',
                          },
                          {
                            label:'sensor4',
                            data : arrTemperature(yaoi.sensor4),
                            //fillColor : "rgba(172,194,132,0.4)",
                            fill: false,
                            borderColor: 'rgb(125, 23, 187 )',
                          },
                          {
                            label:'sensor5',
                            data : arrTemperature(yaoi.sensor5),
                            //fillColor : "rgba(172,194,132,0.4)",
                            fill: false,
                            borderColor: 'rgb(27, 220, 234)',
                          },
                          {
                            label:'sensor6',
                            data : arrTemperature(yaoi.sensor6),
                            //fillColor : "rgba(172,194,132,0.4)",
                            fill: false,
                            borderColor: 'rgb(23, 88, 191)',
                          },
                          {
                            label:'sensor7',
                            data : arrTemperature(yaoi.sensor7),
                            //fillColor : "rgba(172,194,132,0.4)",
                            fill: false,
                            borderColor: 'rgb(246, 63, 229)',
                          },
                          {
                            label:'sensor8',
                            data : arrTemperature(yaoi.sensor8),
                            //fillColor : "rgba(172,194,132,0.4)",
                            fill: false,
                            borderColor: 'rgb(246, 3, 131)',
                          },                              
                      ]
                      }
                
                    })
                   
                },(err)=>{
                    console.log(err)
                })
                break;
        }
    })
    /*var temp = document.getElementById('chart').getContext('2d');
    var chart = new Chart(temp,{
        
      type:"line",
      data:{
        labels : tempList,
        // xAxisID:"time",
        // yAxisID:"temperature",
        datasets : [
          {
            label:'sensor1',
            data : arrTemperature(yaoi.sensor1),
            //fillColor : "rgba(172,194,132,0.4)",
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
          },
          {
            label:'sensor2',
            data : [15,11,2,13,30,21],
            //fillColor : "rgba(172,194,132,0.4)",
            fill: false,
            borderColor: 'rgb(51, 96, 255)',
          },
          {
            label:'sensor3',
            data : [1,5,9,2,15,14],
            //fillColor : "rgba(172,194,132,0.4)",
            fill: false,
            borderColor: 'rgb(178, 51, 255)',
          },
          {
            label:'sensor4',
            data : [1,5,10,3,1,-2],
            //fillColor : "rgba(172,194,132,0.4)",
            fill: false,
            borderColor: 'rgb(125, 23, 187 )',
          },
          {
            label:'sensor5',
            data : [0,13,19,22,12,1],
            //fillColor : "rgba(172,194,132,0.4)",
            fill: false,
            borderColor: 'rgb(27, 220, 234)',
          },
          {
            label:'sensor6',
            data : [1,-5,0,2,7,11],
            //fillColor : "rgba(172,194,132,0.4)",
            fill: false,
            borderColor: 'rgb(23, 88, 191)',
          },
          {
            label:'sensor6',
            data : [1,4,8,1,14,13],
            //fillColor : "rgba(172,194,132,0.4)",
            fill: false,
            borderColor: 'rgb(246, 63, 229)',
          },
          {
            label:'sensor7',
            data : [10,15,19,12,25,24],
            //fillColor : "rgba(172,194,132,0.4)",
            fill: false,
            borderColor: 'rgb(246, 3, 131)',
          },
          {
            label:'sensor8',
            data : [21,25,29,22,35,17],
            //fillColor : "rgba(172,194,132,0.4)",
            fill: false,
            borderColor: 'rgb(246, 3, 28)',
          },
        ]
      }

    })*/

//});