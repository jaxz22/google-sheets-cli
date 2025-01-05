Ámbito de permisos: En el código auth.js, el ámbito (scope) está configurado para trabajar solo con Google Sheets. Si necesitas más permisos, agrégalos al array scope.
Mantenimiento: Si tu token expira, se regenerará automáticamente al ejecutar el script.


npm install googleapis
npm install -g  //Registra scripts (google-sheets-cli) como comando global en el sistema
                //Para listar comandos globales: npm list -g --depth=0

---------------------------------------------

Generar credenciales como tipo aplicacion ESCRITORIO (credentials.json)

----------------------------------------------
-------Nuevo proceso separado:

Start-Process node -ArgumentList "index.js"

Ejecucion:
google-sheets-cli read <spreadsheetId> <range>

----------------------------------------------
-------En el proceso actual:

node index.js  // En terminal visual studio o consola ubicado en carpeta proyecto

Ejecucion: node index.js read/write <spreadsheetId> <range>

node index.js read "1hZV2mx6D0HscMq89nULgcLywrdSJGeEi7E2zzD8VWzw" "Sheet1"

node index.js write curl "http://localhost:3000/sheets?spreadsheetId=1hZV2mx6D0HscMq89nULgcLywrdSJGeEi7E2zzD8VWzw&range=Sheet1"
 Sheet1!A1:B2 '[["dato1", "dato2"], ["dato3", "dato4"]]'