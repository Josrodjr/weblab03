/* eslint-env node, browser */

const state = {
  //  estado de carga
  carga: false,
  //  mensajes
  messages: [],
  //  filtro activo
  filtro: 0,
};

const render = (newState) => {
  //  limpiar el rendering anterior
  const root = document.getElementById('root');
  if (root.hasChildNodes()) {
    root.innerHTML = null;
  }

  //  primer div con las opciones de tareas
  const options = document.createElement('div');
  options.className = 'options';

  //  crear los botones de las opciones de tareas
  for (let i = 0; i < 3; i += 1) {
    const opcionestodo = ['ALL', 'COMPLETED', 'ACTIVE'];
    const buttonname = document.createElement('button');
    buttonname.className = `boton ${i}`;
    buttonname.id = `boton${i}`;
    buttonname.innerText = opcionestodo[i];
    options.append(buttonname);
  }

  //  segundo div con los mensajes
  const mensajes = document.createElement('div');
  mensajes.className = 'messages';

  for (let i = 0; i < state.messages.length; i += 1) {
    const coremensaje = document.createElement('button');
    coremensaje.className = `mensajeindiv ${i} ${state.messages[i][1]}`;
    coremensaje.id = `mensajeindiv ${i}`;
    coremensaje.innerHTML = state.messages[i][0];
    if (state.filtro === 1 && state.messages[i][1] === true) {
      mensajes.append(coremensaje);
    }
    if (state.filtro === 2 && state.messages[i][1] === false) {
      mensajes.append(coremensaje);
    } else if (state.filtro === 0) {
      mensajes.append(coremensaje);
    }
  }

  //   tercer div con el ingreso de texto
  const inputbox = document.createElement('div');
  inputbox.className = 'inputbox';

  // text input
  const input = document.createElement('input');
  input.className = 'ingreso';
  input.placeholder = 'Ingrese una nueva tarea';

  const inputbtn = document.createElement('button');
  inputbtn.className = 'btninput';
  inputbtn.innerText = 'INGRESAR';

  inputbox.append(input);
  inputbox.append(inputbtn);

  //  main render
  root.append(options);
  root.append(mensajes);
  root.append(inputbox);

  //  render(newState);
  const boton0 = document.getElementById('boton0');
  boton0.onclick = () => {
    state.filtro = 0;
    render(newState);
  };

  const boton1 = document.getElementById('boton1');
  boton1.onclick = () => {
    state.filtro = 1;
    render(newState);
  };

  const boton2 = document.getElementById('boton2');
  boton2.onclick = () => {
    state.filtro = 2;
    render(newState);
  };

  inputbtn.onclick = () => {
    if (input.value !== '') {
      state.messages.push([input.value, false]);
      render(newState);
    }
  };

  for (let i = 0; i < state.messages.length; i += 1) {
    const selectedtag = document.getElementById(`mensajeindiv ${i}`);
    try {
      selectedtag.onclick = () => {
        if (state.messages[i][1] === true) {
          state.messages[i][1] = false;
        } else { state.messages[i][1] = true; }
        render(newState);
      };
    } catch (error) {
      console.log('no se encotro un boton con ese id');
    }
  }
};

//  no poner el fetch dentro del render
const gettasks = fetch('https://raw.githubusercontent.com/samuelchvez/todos-fake-json-api/master/db.json');

function insertdata(resultadoJSON) {
  for (let i = 0; i < resultadoJSON.length; i += 1) {
    state.messages.push([resultadoJSON[i].title, resultadoJSON[i].isCompleted]);
  }
  render(state);
}

gettasks
  .then(resultado => resultado.json())
  .then(resultadoJSON => insertdata(resultadoJSON))
  .catch(error => console.log('murio la llamada', error));

render(state);
