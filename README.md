# ToDo App - Proyecto de Taller AIEP 📝

![Ionic](https://img.shields.io/badge/Ionic-%233880FF.svg?style=for-the-badge&logo=ionic&logoColor=white) ![Angular](https://img.shields.io/badge/Angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white) ![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white) ![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

Aplicación móvil para la gestión de tareas diarias, desarrollada como parte de la evaluación para la asignatura de Taller de aplicaciones móviles en AIEP. La app permite a los usuarios crear, visualizar, editar y eliminar tareas de manera eficiente, con persistencia de datos local.

---

## 📋 Características Principales

* **CRUD Completo de Tareas:**
    * **Crear:** Añadir nuevas tareas con título, descripción, categoría y prioridad.
    * **Leer:** Visualizar todas las tareas en una lista clara y organizada.
    * **Actualizar:** Editar cualquier campo de una tarea existente a través de un modal dedicado.
    * **Eliminar:** Borrar tareas de forma individual.
* **Gestión de Estado:** Marcar tareas como "completadas" con un efecto visual de tachado para un seguimiento claro del progreso.
* **Filtrado Dinámico:** Filtrar la lista de tareas por categoría (trabajo, estudios, hogar, etc.) y/o por nivel de prioridad (baja, media, alta).
* **Persistencia Local:** Todos los datos se almacenan en el dispositivo utilizando una base de datos **SQLite**, asegurando que la información se mantenga incluso después de cerrar la aplicación.
* **Interfaz Personalizada:**
    * Ícono de aplicación y Splash Screen (pantalla de carga) personalizados.
    * Navegación intuitiva mediante pestañas.
    * Página de créditos con el logo de la institución.

---

## 🛠️ Tecnologías Utilizadas

* **Ionic Framework (v7+)**: Para la construcción de la interfaz de usuario con componentes web optimizados para móviles.
* **Angular (v17+)**: Como framework principal para la lógica y la estructura de la aplicación.
* **Capacitor**: Para compilar la aplicación web en un proyecto nativo de Android y acceder a funcionalidades del dispositivo.
* **SQLite**: A través del plugin `@awesome-cordova-plugins/sqlite` para la gestión de la base de datos local.
* **TypeScript**: Para todo el desarrollo de la lógica de la aplicación.

---

## 🚀 Instalación y Puesta en Marcha

Para ejecutar este proyecto en un entorno de desarrollo, sigue estos pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/IgnacioWow/todo
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Añadir la plataforma Android:**
    ```bash
    ionic cap add android
    ```

4.  **Sincronizar el proyecto:**
    ```bash
    ionic cap sync android
    ```

5.  **Abrir en Android Studio:**
    ```bash
    ionic cap open android
    ```

6.  Desde Android Studio, compilar y ejecutar la aplicación en un emulador o en un dispositivo físico.

---

## ✨ Créditos

Este proyecto fue desarrollado por:

* **Autor:** Ignacio Williams
* **Institución:** AIEP
* **Asignatura:** Taller de aplicaciones móviles
* **Fecha:** Octubre, 2025
