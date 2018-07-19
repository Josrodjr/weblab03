/* eslint-env node, browser */

const state = {
  //  estado de carga
  //  mensajes
  //  filtro activo
};

const render = (newState) => {
  const options = document.createElement('div');
  options.className = 'options';

  for (let i = 0; i < 3; i += 1) {
    const buttonname = document.createElement('button');
    buttonname.id = `button ${i}`;
    options.append(buttonname);
  }


  //  main render
  const root = document.getElementById('root');
  root.append(options);

  // render(newState);
};
//  no poner el fetch dentro del render

render(state);
