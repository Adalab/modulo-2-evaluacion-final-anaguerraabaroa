![Adalab](https://beta.adalab.es/resources/images/adalab-logo-155x61-bg-white.png)

### **MÓDULO 2: EJERCICIO DE EVALUACIÓN FINAL**

Este es el ejercicio de evaluación final del módulo 2 del curso de Programación Frontend de Adalab Digital.

#### **OBJETIVO**

- Aplicación web de búsqueda de series.
- Seleccionar series favoritas y agregar/eliminar a listado de favoritos.
- Guardar datos en LocalStorage.

#### **REQUISITOS**

- Maquetación sencilla.
- Diseño sencillo.
- Aplicar Javascript: constantes, variables, condicionales, arrays, objetos, eventos, funciones y métodos.

#### **DESARROLLO**

##### **HTML**

- Estructura básica de la aplicación en HTML aplicando semántica, BEM y clases:

  - Header
  - Aside: formulario + sección favoritos
  - Section: resultados de búsqueda
  - Footer

##### **CSS**

- Aplicación de estilos para obtener un diseño sencillo.

##### **JAVASCRIPT**

##### **1.- Búsqueda**

- Función para obtener los datos del servidor: **_getData()_**

  - Petición fetch: petición de datos al API de Tvmaze sumando el input value de la búsqueda del usuario al endpoint de base.
  - Promesa: el servidor devuelve una respuesta con un archivo JSON.
  - Promesa: se recoge la respuesta y se utilizan los datos para conformar el array "shows".

- Función para pintar los datos de búsqueda: **_paintData()_**

  - Se declara una variable vacía y se recorre el array con un bucle for clásico para rellenarla con los elementos que se quiere pintar en el HTML.
  - Se accede a las propiedades del array que interesa utilizar de forma dinámica y se interpolan en los elementos.
  - Finalmente se pinta la información en el HTML utilizando un método innerHTML sobre el elemento contenedor.
  - Una vez que el usuario ha seleccionado un favorito también se utiliza esta función para recorrer con un bucle for clásico anidado el array "favShows". Si el índice del elemento seleccionado coincide con el índice del elemento de la búsqueda se añade una clase para marcar el elemento como favorito.

- Listener botón de búsqueda: **_btnElement.addEventListener("click", getData)_**

  - Para que ambas funciones se desencadenen primero se escucha un evento "click" sobre el botón de búsqueda.

##### **2.- Favoritos**

- Función para seleccionar favoritos: **_favouriteShows(event)_**

  - Se declara un nuevo array "favShows" vacío para rellenarlo con los elementos favoritos de los usuarios.
  - Para trabajar de manera más eficiente se crea un nuevo objeto únicamento con los datos del array que interesa almacenar (name, image e id).
  - Para incluir la información de cada objeto dentro del array se utiliza el método indexOf. Como este método sólo admite trabajar con índices declaramos un nuevo array únicamente con los índices de cada elemento.
  - Con un condicional se comparan los índices de cada elemento con el elemento seleccionado por el usuario y si el método indexOf no lo encuentra lo incluye dentro del array "favShows" con un método push y si lo encuentra lo elimina con un método splice.

- Función para pintar favoritos: **_paintFavShows()_**

  - Se declara una variable vacía y se recorre el array con un bucle for clásico para rellenarla con los elementos que se quiere pintar en el HTML.
  - Se accede a las propiedades del array que interesa utilizar de forma dinámica y se interpolan en los elementos.
  - Finalmente se pinta la información en el HTML utilizando un método innerHTML sobre el elemento contenedor.

- Listener lista de resultados de búsqueda: **_show.addEventListener("click", favouriteShows)_**

  - Para que ambas funciones se desencadenen primero se escucha un evento "click" sobre cada uno de los resultados de búsqueda con un método querySelectorAll.

##### **3.- LocalStorage**

- Función para guardar los datos del array "favShows" en LocalStorage: **_setLocalStorage()_**

  - Se guardan los datos del array "favShows" con un método localStorage.setItem convirtiéndolo en una cadena de caracteres con el método JSON.stringify.

- Función para recoger los datos del array "favShows" del LocalStorage y que aparezcan pintados en la aplicación al cargarla: **_getLocalStorage()_**

  - Se recogen los datos guardados en LocalStorage con un método localStorage.getItem, parseando la cadena de caracteres para convertirla de nuevo en un array con el método JSON.parse.
  - Con un condicional se establece que si la respuesta del LocalStorage devuelve datos, estos se deben incluir en el array "favShows".

##### **4.- Bonus**

- Función para borrar la lista completa de favoritos: **_handleReset()_**

  - Se vacía el array de "favShows", se vacía el input value de la búsqueda del usuario y los datos almacenados en LocalStorage.

- Listener botón de reset: **_resetBtn.addEventListener("click", handleReset)_**

  - Para que la función se desencadene primero se escucha un evento "click" sobre el botón de reset.

##### **RESULTADO**

- URL: http://beta.adalab.es/modulo-2-evaluacion-final-anaguerraabaroa/
