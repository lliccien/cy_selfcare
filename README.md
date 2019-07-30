# Pruebas de aceptación con Cypress en selfcare.dev.co

## Introducción

Para comprender y utilizar de forma correcta esta documentación se deben tener conocimientos básicos de Cypress por lo cual es necesario que a la par de esta información se consulte la [Documentación de Cypress](https://docs.cypress.io/).


Adicionalmente en este repositorio existe un ejemplo completo y real el cual le puede servir de guía y de base. este ejemplo esta fuera del proyecto selfcare.dev.co.


## Instalación

Para inicializar el entorno de deben instalar los siguientes paquetes como dependencias de desarrollo:

    `npm i -D cypress, cypress-cucumber-preprocessor, mocha, mochawesome, mochawesome-merge`

*Nota:* La ubicación de la instalación puede ser fuera del proyecto o dentro de este.


Lo siguiente es ejecutar en la consola el comando `npx cypress open` esto crear la estructura de Cypress y abrirá la aplicación de Cypress que esta creada en Electron.

## Configuración

Se debe editar el archivo `package.json` y agregarle los siguientes scripts:

```
  "scripts": {
    "cy:run": "npx cypress run",
    "cy:open": "npx cypress open",
    "cleanup": "rm -fr docs",
    "merge_reports": "npx mochawesome-merge --reportDir docs > docs/index.json",
    "generate_mochawesome_report": "npx marge --charts --code=false -o=docs  docs/index.json",
    "cy:report": "npm run cleanup; npm run cy:run; npm run merge_reports; npm run generate_mochawesome_report"
  },
```
Esto define los comandos de npm a utilizar.

* En la raíz del proyecto se debe ubicar el archivo `cypress.json` al cual se debe agregar lo siguiente:

```
{
    "baseUrl": "http://selfcare.dev.co",
    "ignoreTestFiles": "*.js",
    "viewportHeight": 768,
    "viewportWidth": 1024,
    "reporter": "mochawesome",
    "reporterOptions": {
      "reportDir": "./docs",
      "reportName": "Pruebas de Aceptación de Nuevo satck Mi Cuenta Tigo",
      "reportTitle": "Pruebas de Aceptación de Nuevo satck Mi Cuenta Tigo",
      "overwrite": false,
      "html": false,
      "json": true
    },
    "chromeWebSecurity": false
}
```

Esto define la configuración Cypress para el proyecto.

* En la carpeta `cypress/plugins` se encuentra un archivo `index.js` el cual hay que editar colocando este código luego de los comentarios:

```
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('file:preprocessor', cucumber());
}
```

Con esto se activa el plugins de Cucumber.

* En la carpeta `cypress/support` se encuentra el archivo `index.js` el cual hay que editar y agregar los siguiente:

```
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
```
Esto evita que Excepcions detengan la ejecución de las pruebas.

* •	Se debe elimina la carpeta `example` y su contenido que se encuentran en la carpeta `cypress/integration`.

## Definición de Features

Las features de deben crear en la carpeta `cypress/integration` con un archivo con el nombre de la historia o las siglas de control mas la numeración con la extensión `.feature` y se de crear una carpeta con el mismo nombre de la feature sin la extensión donde se colocarán los archivos `spec.js` en los cuales se realizan las pruebas según lo que dicta la feature. ejemplo:

```
cypress
    >integration
        nsmt8.feature
        >msmt8
            1_mostrar_radio.spec.js
            2_pagar.spec.js
```

En el caso de los archivos `.spec.js` se debe crear uno por cada escenario definido en la feature.

Los comandos que se utilizan para realizar las pruebas en los archivos `.spec.js` se especifican en detalle en la  [documentación](https://docs.cypress.io/api/api/table-of-contents.html) en el apartado `Commands`
asi como las aserciones en el apartado `Assertions`


## Ejecutar pruebas en desarrollo

Para la ejecución de las pruebas en desarrollo se debe ejecutar en la consola el comando `npm run cy:open` el cual nos abrirá la aplicación de Cypress creada en Electron.

## Ejecución en CI/CD

Para ejecutar las pruebas en CI/CD se deben realizar los siguientes pasos:

1.- En le ambiente de CI/CD se debe realizar la instalación de los paquetes con el comando `npm ci` para garantizar que se instalen bien los binarios de Cypress. Más [información](https://docs.npmjs.com/cli/ci).

2.- Se debe ejecutar el comando `npm run cy:run` el cual ejecutara todas las pruebas en modo headlessly (sin cabeza) lo cual no ejecutara ni la aplicación de desarrollo de Cypress ni un navegador

Al finalizar el proceso se genera un reporte el cual se creará en la carpeta indicada en el archivo `cypress.json` en el siguiente apartado:

```
    "reporterOptions": {
      "reportDir": "./docs",
```

También es importante mencionar que se generan screenshots y videos que por defecto se guardan en la carpeta `cypress` bajo directorios separados con los nombres de `screenshots` y `videos` y que esa ubicación se puede cambiar en la configuración. Más [información](https://docs.cypress.io/guides/guides/screenshots-and-videos.html#Screenshots)