# Vida Digital
Repositorio para el backend del PAP Vida Digital ITESO O2020. Este backend cuenta con servicios para obtener información de Nodos que tiene la universidad ITESO para el monitoreo del bosque de la primavera.

## Documentación de la API
La documentación de la API se encuentra generada en swagger, en el archivo [`config/swagger.nodos.json`](config/swagger.nodos.json).

## Contribuidores
* Carlos Soto Pérez [CarlosSoPe6](https://github.com/CarlosSoPe6/)
* Héctor Antonio Chávez Morales [HectorChavez97](https://github.com/HectorChavez97)


Documentación del código
========================

La documentación del código está hecha con JSDocs, y esta toma los
comentarios de las funciones. Es similar a la sintaxis Javadoc en Java,
pero en este caso es para JS.

JSDocs genera un HTML en donde se puede visualizar de forma amigable.

Para volver a generar la documentación es necesario tener el proyecto
descargado y ejecutar el script "gen-docs" el cual generará una carpeta
en donde se encontrará el archivo HTML.

"foto pendiente porque da muchos errores" :c

Diseño del código
=================

Nos apegamos al patrón de diseño MVC (Modelo-Vista-Controlador), pero
haciendo una omisión al componente de Vista, dado que no existe
interacción con el usuario.

El código además esta divido en más carpetas para poder diferenciar de
manera clara la funcionalidad. El código está dividido principalmente en
los siguientes paquetes

-   **Config:** Aquí existen todos los archivos de configuración como la
    obtención de credenciales y la conexión a la base de datos, el
    archivo de definición JSON para Swagger y la encriptación de datos.

-   **Controllers:** Aquí, como su nombre lo indica van todos los
    controladores y por lo tanto las validaciones son llevadas a cabo
    aquí. Además, las pruebas también se encuentran en este paquete y
    estas van sobre su respectivo controlador

-   **Db:** Este paquete es el equivalente al "modelo" del patrón de
    diseño, aquí es en donde se hace la consulta a la base de datos
    necesaria.

-   **Loggers:** Para poder mantener un registro de fácil visualización
    fue necesario crear este paquete y aquí se definen los archivos que
    escriben en los archivos que se dividen en los logs de errores y en
    los logs de lecturas

-   **Middleware:** En este paquete van los middlewares, al momento
    solamente existen 2 que son, 'Auth' y 'Verify'. El primero se
    encarga de verificar que se tenga un JWT en los endpoints que
    necesitan una autentificación. El segundo se encarga es utilizado en
    los endpoints más sensibles en donde solamente lo usan usuarios
    autentificados y que sean administradores

-   **Routes:** Para hacer más fácil el mantenimiento del código se
    decidió a y utilizamos este middleware de Express para manejar de
    manera separada cada ruta.

-   **Validators:** Para poder hacer las validaciones y poder
    reutilizarlas, se pusieron en esta carpeta.

Validaciones por esquema
========================

Es necesario hacer validaciones en métodos de inserción o de
actualización de datos (POST, PUT, PATCH) o incluso con otros métodos,
la forma en que nosotros decidimos realizar la validación de tipos fue
ayudarnos con los modelos ya hechos en Swagger.

Estas validaciones se encuentran en la carpeta validators y se podrán
diferenciar porque llevan el nombre de "validarEsquema" y la forma para
poder validar los recibidos se hace la comparación atributo a atributo
contra el modelo de swagger.

Swagger
=======

Para poder documentar la API decidimos utilizar Swagger, que es una
herramienta que permite entre otras cosas documentar y utilizar
servicios web REST.

Toda la información proviene de un archivo JSON en donde se define las
propiedades de cada elemento y a partir de ese documento se genera una
interfaz que puede ser accesada desde un endpoint definido previamente
en donde se podrá visualizar de manera.

Aquí esta las rutas están agrupadas de acuerdo con el controlador que
pertenece cada una, y dentro se encuentran listadas cada uno de los
endpoints que dispone la aplicación, además dentro de cada petición se
encuentra los elementos que espera recibir y los códigos de respuestas y
la información que regresa la petición.

![](./docs/media/image1.png){width="5.491666666666666in"
height="2.573092738407699in"}

Contexto de ejecución
=====================

Uno de los problemas que se presentaron al momento de la implementación
del código fue el manejo del pool de conexiones. En ingeniería de
software, un pool de conexiones es una cache de conexiones a una base de
datos para que estas sean mantenidas en futuras peticiones a la base de
datos, de esta forma se mejora el rendimiento al ejecutar consultas en
una base de datos ya que los recursos son adquiridos una sola vez en el
ciclo de vida de la aplicación.

Esta solución tiene como desventaja que se tiene un número limitado de
conexiones simultaneas a la base de datos que se deben de manejar
adecuadamente para mantener los recursos disponibles para todos. Para la
librería utilizada para las conexiones a la base de datos, estas se
tienen que cerrar explícitamente, para facilitar la implementación y
evitar tener código repetido y aumentar la posibilidad de error, se
llegó a una solución que fue llamada "ExecutionContext" la cual usa el
patón de diseño Adapter y Context.

Esta implementación recibe una promesa, preferiblemente dentro de un
closure, y retorna otra promesa.

![Imagen que contiene Texto Descripción generada
automáticamente](./docs/media/image2.png){width="5.635415573053368in"
height="2.40625in"}

Ilustración 1. Diagrama para contexto de ejecución.

Con este contexto de ejecución se logra una comunicación entre las
diferentes capas de la aplicación y con el Adapter se modifica el
comportamiento de" ExecutionContext\", logrando así, antes de cada
ejecución de PoolContextCallback se adquiera una conexión y esa se pase
dentro del contexto, al terminar la ejecución de PoolContextCallback se
libera la conexión para ser utilizada en otra petición.

Para mantener un buen diseño y buenas prácticas se obliga a encapsular
la lógica de una consulta en una función, para poder acceder a la
conexión existente en el contexto de ejecución, esta se debe de pasar
como el primer parámetro de la función seguido por los relevantes para
la función. Esta llamada debe de retornar una promesa.

![Imagen que contiene Icono Descripción generada
automáticamente](./docs/media/image3.png){width="5.260415573053368in"
height="0.8125in"}

Ilustración 2. Diagrama para función modelo

Un ejemplo de uso toma la función getVariables del controlador
variables. Podemos observar que tanto la función del modelo, la interfaz
PoolContextCallback y el ExectionContext retornan una promesa. Se obliga
a retornar promesas en todos los casos.

```js
async function getVariables(req, res) {
  try {
    await executionContext(async (context) => {
      const { connection } = context;
      const result = await variablesModel.getVariables(connection);
      res.json(result);
    });
  } catch (e) {
    errorLog(e.message);
    res.status(500).send(\'Internal server error\'');
  }
}
```

Se obliga al desarrollador a seguir este patrón para evitar posibles
errores y no cerrar una conexión antes de tiempo o nunca ser cerrada.
Esta solución sigue los pasos

1.  Adquisición de recursos

2.  Utilización de recursos

3.  Limpieza o liberación de recursos.

Pruebas
=======

Integración continua
====================

Phusion Passenger
=================

Phusion Passenger es un servidor web gratuito que brinda soporte para
Ruby, Python y NodeJS. Está diseñado para ser integrado con Apache o
Nginx. Está pensado para tener alto rendimiento y eficiencia. Este
servidor empezó a causar problemas al detener el servicio de NodeJS de
forma inesperada con el siguiente error: Checking whether to disconnect
long-running connections for process 21039, application
/home/papvida1/O2020 (production)

![](./docs/media/image4.png){width="6.1375in"
height="1.1458333333333333in"}

Ilustración 3. Captura del error de Passenger

Ese problema se encuentra documentado en el siguiente
[Issue](Documentado%20en%20este%20Issue%20en%20GitHub%20https:/github.com/phusion/passenger/issues/1865)
en GitHub

Esa salida no indica ningún problema, como indica la documentación de
Phusion Passenger, este es un comportamiento esperado después que la
aplicación pasa una cantidad predeterminada de segundos sin actividad,
este termina la aplicación para que no esté utilizando recursos, cuando
se vuelve a necesitar Passenger lo vuelve a levantar.

Para lograr que la aplicación se levante de manera automática no se
encontró una metodología de despliegue adecuada, la única observación
que se tiene es, al momento de subir código nuevo, se requiere detener e
iniciar la aplicación en lugar de solo reiniciar. Esta diferencia puede
ser un problema de CPanel y no de Passenger

![Interfaz de usuario gráfica, Aplicación, Sitio web Descripción
generada
automáticamente](./docs/media/image5.png){width="5.947915573053368in"
height="2.1979166666666665in"}

Ilustración 4. Diagrama sobre el manejo de peticiones por Apache

Contribuciones y código de conducta
===================================
