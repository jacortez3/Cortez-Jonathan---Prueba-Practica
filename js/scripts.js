/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


// Ejercicio 1: Creación de Componente Simple

class SaludoComponent extends HTMLElement {
    constructor() {
      super();

      const shadowRoot = this.attachShadow({ mode: 'open' });
      const p = document.createElement('p');
      p.textContent = '¡Hola, Mundo!';
      shadowRoot.appendChild(p);
    }
  }

  customElements.define('saludo-component', SaludoComponent);


// Ejercicio 2: Comunicación entre Componentes

class EmisorComponent extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });

      const button = document.createElement('button');
      button.textContent = 'Enviar Mensaje';

      button.addEventListener('click', () => {
        const evento = new CustomEvent('mensajeEnviado', { detail: '¡Hola Mundo!' });
        document.dispatchEvent(evento);
      });
      shadowRoot.appendChild(button);
    }
  }

  customElements.define('emisor-component', EmisorComponent);

  class ReceptorComponent extends HTMLElement {
    constructor() {
      super();

      const shadowRoot = this.attachShadow({ mode: 'open' });

      const mensajeParrafo = document.createElement('p');

      shadowRoot.appendChild(mensajeParrafo);

      document.addEventListener('mensajeEnviado', (event) => {
        mensajeParrafo.textContent = `Mensaje: ${event.detail}`;
      });
    }
  }

  customElements.define('receptor-component', ReceptorComponent);


// Ejercicio 3: Uso de Slots

  class ContenedorComponent extends HTMLElement {
    constructor() {
      super();

      const shadowRoot = this.attachShadow({ mode: 'open' });
      const container = document.createElement('div');

      container.innerHTML = `
        <div>
          <slot name="encabezado"></slot>
        </div>
        <div>
          <slot name="cuerpo"></slot>
        </div>

         <style>
          h1 {
            color: #14C8E8; 
            font-family: 'Arial', sans-serif; 
          }

        </style>
      `;

      container.style.border = '3px solid #ccc';
      container.style.padding = '10px';
      container.style.color = '#0F841B';

      shadowRoot.appendChild(container);
    }
  }

  customElements.define('contenedor-component', ContenedorComponent);


// Ejercicio 4: Integración con API Externa

class UserListComponent extends HTMLElement {
    constructor() {
      super();

      const shadowRoot = this.attachShadow({ mode: 'open' });
      const container = document.createElement('div');
      this.loadUserList(container);

      shadowRoot.appendChild(container);
    }

    async loadUserList(container) {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        const userTable = document.createElement('table');
        const headerRow = document.createElement('tr');
        const headers = ['ID', 'Nombre', 'Email'];

        headers.forEach(headerText => {
          const th = document.createElement('th');
          th.textContent = headerText;
          headerRow.appendChild(th);
        });

        userTable.appendChild(headerRow);

        users.forEach(user => {
          const row = document.createElement('tr');
          const columns = [user.id,user.name, user.email];

          columns.forEach(columnText => {
            const td = document.createElement('td');
            td.textContent = columnText;
            row.appendChild(td);
          });

          userTable.appendChild(row);
        });

        container.appendChild(userTable);
      } catch (error) {
        console.error('Error al cargar la lista de usuarios:', error);
        container.textContent = 'Error al cargar la lista de usuarios.';
      }
    }
  }

  customElements.define('user-list-component', UserListComponent);

  //Ejercicio 5: Gestión de Estado

  class ContadorComponent extends HTMLElement {
    constructor() {
      super();

      const shadowRoot = this.attachShadow({ mode: 'open' });

      this._contador = 0;
      const container = document.createElement('div');
      this._contadorParrafo = document.createElement('p');
      this._actualizarContador();
      const botonIncrementar = document.createElement('button');
      botonIncrementar.textContent = 'Incrementar';
      botonIncrementar.addEventListener('click', () => this._incrementarContador());

      const botonDisminuir = document.createElement('button');
      botonDisminuir.textContent = 'Disminuir';
      botonDisminuir.addEventListener('click', () => this._disminuirContador());

      container.appendChild(this._contadorParrafo);
      container.appendChild(botonIncrementar);
      container.appendChild(botonDisminuir);

      shadowRoot.appendChild(container);
    }

    _incrementarContador() {
      this._contador++;
      this._actualizarContador();
    }

    _disminuirContador() {
      this._contador--;
      this._actualizarContador();
    }

    _actualizarContador() {
      this._contadorParrafo.textContent = `Contador: ${this._contador}`;
    }
  }

  customElements.define('contador-component', ContadorComponent);