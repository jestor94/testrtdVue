# Studio Ghibli

## Descripción

* El objetivo del proyecto es consumir una API informativa y mostrar una lista de objetos en la pantalla, permitiendo que exista la opción de buscar algún elemento, mediante un campo de texto; con la capacidad de soportar el autocompletado.


* Siguiendo los principios de Vue, el desarrollo se encuentra bajo la arquitectura Flux.


* Al utilizar un framework que se considera de programación reactiva, para una aplicación pequeña, complica demostrar que la arquitectura usada se cumple... Con más tiempo podría haber construido o adecuado otras funcionalidades como "Lista de favoritos" para dar más context de esta arquitectura. Además de ello, hubiese desglosado las API referenciadas en las propiedades de cada película (Por ejemplo el reparto de cada película con el path /people).


* Considero que mi parte favorita es el componente completo [Films](./src/pages/Films.vue) al utilizar todas las funciones nativas de vue, sin meter tanto html o javascript.


## Proyecto en producción

[Firebase](https://testrtd-353b6.web.app/)

El login consume un servicio de autenticación con las siguientes credenciales
* email: eve.holt@reqres.in
* password: pistol

### Configuración del proyecto
* El primer paso es descargar el cliente de Vue.

   [Aquí la documentación oficial](https://vuejs.org/v2/guide/installation.html)

* Después de realizar la instalación del cliente de Vue, y clonar el proyecto, en la carpeta raíz instalamos las librerías del proyecto:
```

npm install
```


### Compilación para desarrollo
```
npm run serve
```

### Compilación y generación de archivos para producción
```
npm run build
```

