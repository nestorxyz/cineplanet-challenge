Transcripción del Reto Frontend Developer - 2026
Hola Postulante! Reto Ecommerce Cineplanet
+1

El día de hoy tenemos un reto para que nos demuestres tu pasión por React JS. El objetivo de este reto es que nos ayudes a medir tus conocimientos en proyectos con React JS, uso de librerías, manejo de versionamiento de código, consumo de servicios REST y algunos otros puntos que te detallamos a continuación:
+1

Tecnologías a utilizar:

React JS

Librerías (las necesarias)

Servicios REST

Google Sign-In (opcional)

Firebase (opcional)

Git

Descripción

Se solicita crear una aplicación web con el lenguaje de programación React JS para el ecommerce de una cadena de cines que contemple las siguientes pantallas:

1. Home

Es la primera pantalla del flujo de compra.

El servicio premieres retornará un listado de imágenes y textos.

Se mostrará el listado de imágenes a la izquierda y el texto a la derecha de la pantalla.

Al pulsar cualquiera de las imágenes te llevará a la pantalla de Login.

2. Login

Permite iniciar sesión con su cuenta de Google (Google Sign-In) (opcional) o puede elegir la opción de ingresar como Invitado.

Para el login con Google, se solicitará al usuario su correo y clave.

Los datos correo y nombre se deben utilizar en la pantalla de Pago.

Se mostrará un pop-up de bienvenida con el nombre del cliente, si el cliente decidió iniciar sesión.

El pop-up contendrá un botón de "Aceptar" para continuar a la pantalla de Dulcería.

Debe existir un botón "Invitado" que te llevará a la pantalla de Dulcería, en el caso que el cliente no inicie sesión.

3. Dulcería

Se debe utilizar el servicio candystore para obtener los datos nombre, descripción y precio.

Se debe mostrar el listado de los productos de dulcería con su nombre, descripción y precio.

Se debe poder elegir uno o más productos del mismo o diferentes tipos.

Se debe mostrar un totalizado de lo que se pagará.

Se debe tener un botón "Continuar" que te llevará a la pantalla de Pago.

4. Pago

Se mostrará un formulario que te pedirá:

Número de tarjeta de 16 dígitos.

Fecha de expiración.

CVV.

Correo electrónico.

Nombre.

Tipo de documento y número de documento.

Estos datos deben ser enviados a través del servicio de pruebas del proveedor de pagos PayU (https://developers.payulatam.com/latam/es/docs/integrations/api-integration/payments-api-peru.html).
+2

Luego de la confirmación del servicio de PayU, se debe utilizar el servicio complete para terminar la transacción, enviando los siguientes datos:

Correo electrónico.

Nombres.

Número de DNI.

operationDate (valor en la respuesta del servicio de PayU).

transactionId (valor en la respuesta del servicio de PayU).

El servicio complete retornará un código de respuesta "0". Finalmente, se debe mostrar un pop-up de "compra correcta" o una pantalla que muestre un mensaje de compra exitosa.
+1

Navegación y Estructura

La aplicación tendrá un menú superior con las opciones:

Home

Dulcería

Login

Consideraciones Finales

Repositorio: El proyecto debe subirse a un repositorio Git con la estructura: https://github.com/<github_user>/retoFrontendCP.

Diseño: Queda a criterio del postulante.

Login: De no optar por Google Sign-In, se puede simular el login o usar tecnología similar.

Validaciones: Se tomarán en cuenta las validaciones en el ingreso de datos.

Pagos: De no usar PayU, se podrá simular el pago de la transacción.

Backend: No se requiere integración con un backend real; se pueden usar APIs públicas, mocks o servicios simulados.

La resolución del reto es totalmente libre, todo lo que hagas de más va a sumar en tu proceso de selección.
