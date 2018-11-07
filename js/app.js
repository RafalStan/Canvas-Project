
if (document.querySelector('#draw').getContext) {

  const canvas = document.querySelector('#draw');
  const ctx = canvas.getContext('2d');

  ctx.strokeStyle = '#BADA55';
  ctx.lineJoin = 'round';

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;

  let resize = false;
  let color_change = true;
  let direction = true;
  let shadow = false;

  //background
  ctx.fillStyle = "rgb(38,38,38)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  EventListeners();

  function EventListeners() {

    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
      menuOption();
    });

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);


    //clear button
    const clearbutton = document.querySelector('.clear');
    clearbutton.addEventListener('click', function () {
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    })
  }

  function draw(e) {
    if (isDrawing == false) return;
    
    // line color
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    if (color_change == true) {
      hue++;
      if (hue >= 360) {
        hue = 0;
      }
    }

    // resize of line
    if (resize == true) {
      if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
      }
      if (direction == true) {
        ctx.lineWidth++
      } else {
        ctx.lineWidth--;
      }
    }

    //shadow line
    if (shadow == true) {
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgb(0, 0, 0)';
    } else {
      ctx.shadowBlur = 0;
    }

      
    //line
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

  }

  function menuOption(e) {

    //size of line
    ctx.lineWidth = document.querySelector('.line-size').value;

    //resize of line
    const checkbox_resize = document.querySelector('#resize');
    if (checkbox_resize.checked == true) resize = true;
    else resize = false;

    //color of line
    hue = document.querySelector('.line-color').value;

    //change of color
    const checkbox_color_change = document.querySelector('#color-change');
    if (checkbox_color_change.checked == true) color_change = true;
    else color_change = false;

    //shape of line
    const select_shape = document.getElementById('shape').value;
    ctx.lineCap = select_shape;

    //shadow of line
    const checkbox_shadow = document.querySelector('#shadow');
    if (checkbox_shadow.checked == true) shadow = true;
    else shadow = false;

    //effects of line
    const select_effect = document.getElementById('effects').value;
    ctx.globalCompositeOperation = select_effect;
  }

} else {
  document.getElementById('#draw').innerHTML = "Not supported in your bowser";
}
