const express = require('express');
const app = express();
const fs = require('fs');


let RNC = [];
app.get('/', function (req,res) {
    res.sendFile('./index.html');
   
});




app.get('/rnc/id=:id',(req,res) =>{
    const id = (req.params.id);
    var some = fs.readFileSync('./DGII_RNC.txt', 'utf-8');
    let rnc = [];

    if(id.length>= 9 && id.length < 12  && isNaN(id) == false){

    if(some.indexOf(id) != -1){
        
        var elindex = some.indexOf(id);
        var texto = '';

         for (let i = elindex; i < (elindex +200); i++) {
             texto += some.charAt(i);

            if ((texto.indexOf('|NORMAL')!= -1) && (rnc[0] == null)) {
                var arra = texto.split('|');
                var rncjs = {
                    RNC	: arra[0],
                    Nombre	: arra[1],
                    Nombre_Comercial	: arra[2],
                    Actividad_Economica: arra[3],
                    Categoria: arra[4],
                    Fecha: arra[8],
                    Estado	: arra[9],
                    Regimen_de_pago	: arra[10]
                };
                
                rnc.push(rncjs);
            }
            if(rnc[0] != null)
             {
                 break;
             }
         }
    
    }
        else{
            rnc.push('No existe dicho RNC')
        }
        
    }
    else{
        rnc.push('No existe dicho RNC')
       
    }

    res.send(rnc)
  
});


const port = process.env.port || 3000;
app.listen(port, console.log('Server on port ' + port))