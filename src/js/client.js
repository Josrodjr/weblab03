/* eslint-env node, browser */

const state = {
  //  estado de carga
  carga: false,
  //  mensajes
  messages: [['hola', true], ['hola2', false]],
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
    mensajes.append(coremensaje);
  }

  //   tercer div con el ingreso de texto
  const inputbox = document.createElement('div');
  inputbox.className = 'inputbox';

  // text input
  const input = document.createElement('input');
  input.className = 'ingreso';

  const inputbtn = document.createElement('button');
  inputbtn.className = 'btninput';

  inputbox.append(input);
  inputbox.append(inputbtn);

  //  main render
  root.append(options);
  root.append(mensajes);
  root.append(inputbox);

  //  render(newState);
  const boton1 = document.getElementById('boton1');
  boton1.onclick = () => {
    console.log('fuinciona');
    state.messages.push(['hoola', false]);
    render(newState);
  };

  inputbtn.onclick = () => {
    state.messages.push([input.value, false]);
    render(newState);
  };
};

//  no poner el fetch dentro del render

render(state);
