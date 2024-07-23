const { Application } = require("pixi.js");

let app;

window.onload = async ()=>{

  app = new Application({
    resizeTo: window,
    background: '#6d597a'
  });

  document.body.appendChild(app.view);
}