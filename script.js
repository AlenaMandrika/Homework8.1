// e.clientX, e.clientY координати курсора в момент кліка відносно вікна
// elem.getBoundingClientRect() вертає розмір елемента і позицію відносно вікна
// e.offsetX, e.offsetY зміщення по х курсора миші відносно початку координат елемента
// clientTop товщина верхньої границі елемента в пікселях
// clientHeight,clientWidth внутрішня висота/ширина елемента в пікселях
// offsetTop, offsetLeft границі блока елемента відносно offsetParent

var elem = false;
var blockBtn = document.getElementById('blockBtn');

blockBtn.addEventListener('mousedown', function (e) {
  elem = e.target;

  function posEl (tagEl) {
    var topEl;
    var leftEl;

    if (e.clientY - 30 < blockBtn.offsetTop) {
      topEl = blockBtn.offsetTop + 5;

    } else if (e.clientY + 30 > blockBtn.offsetTop + blockBtn.clientHeight) {
      topEl = blockBtn.offsetTop + blockBtn.clientHeight - 35

    } else {
      topEl = e.clientY - blockBtn.offsetTop - 15;
    }
    if (e.clientX - 30 < blockBtn.offsetLeft) {
      leftEl = 5;

    } else if (e.clientX + 20 > blockBtn.offsetLeft + blockBtn.clientWidth) {
      leftEl = blockBtn.clientWidth - 65;
      tagEl.classList.add('left');

    } else {
      leftEl = e.clientX  - blockBtn.offsetLeft - 40;
    }
    var position = {
      left: leftEl,
      top: topEl
    }

    tagEl.style.left = position.left + 'px'
    tagEl.style.top = position.top + 'px'

  }


  if (elem && elem.id === 'blockBtn') {

    var newDiv = document.createElement('div');
    newDiv.classList.add('block');

    // newDiv.style.left = position.left + 'px';
    // newDiv.style.top = position.top + 'px';

    var coorNewDiv = newDiv.getBoundingClientRect();

    var newBtn = document.createElement('button');
    newBtn.innerHTML = 'lorem';
    newBtn.classList.add('loremBtn');
    newDiv.appendChild(newBtn);
    blockBtn.appendChild(newDiv)

    posEl(newDiv)

  }

  if (elem && elem.className === 'loremBtn') {

    event.preventDefault();

    var activeClass = elem.classList.contains('active');
    if (!activeClass) {
      elem.classList.add('active');
      var parent = elem.parentNode;
      var littleBtn = document.createElement('button');
      littleBtn.innerHTML = 'x';
      littleBtn.classList.add('littleBlock');
      parent.insertBefore(littleBtn, null)


    }
  }

  if (elem && elem.className === 'littleBlock') {
    elem.parentNode.remove(elem);
    elem = false;
  }

  if (newDiv) {
    newDiv.addEventListener('mousedown', function (e) {
      event.preventDefault();
      elem = true;

      e.offsetX = newDiv.offsetLeft - e.clientX;
      e.offsetY = newDiv.offsetTop - e.clientY;

      newDiv.addEventListener('mousemove', mMove, false);

      newDiv.addEventListener('mouseup', function () {
        elem = false;
      }, false);


      newDiv.addEventListener('touchstart', function(e) {

        elem = true;

        e.offsetX = newDiv.offsetLeft - e.touches[0].clientX;
        e.offsetY = newDiv.offsetTop - e.touches[0].clientY;
        console.log('touches');

        newDiv.addEventListener('touchmove', mMove, false);

        newDiv.addEventListener('touchend', function () {
          elem = false;
        }, false);

      }, false);

    }, false);


    function mMove (e) {

      var coorBlockBtn = blockBtn.getBoundingClientRect();
      blockBtn.style.top = coorNewDiv.top + blockBtn.clientTop + 'px';
      blockBtn.style.left = coorNewDiv.left + blockBtn.clientLeft + 'px';

      if (e.type === 'touchmove') {
        var newCoordNewDiv = {
          top: e.changedTouches[0].clientY - coorBlockBtn.top - newDiv.clientHeight / 2,
          left: e.changedTouches[0].clientX - coorBlockBtn.left - newDiv.clientWidth / 2
        };

      } else {
        newCoordNewDiv = {
          top: e.clientY - coorBlockBtn.top - newDiv.clientHeight / 2,
          left: e.clientX - coorBlockBtn.left - newDiv.clientWidth / 2
        };
      }

      if (elem) {
        if (newCoordNewDiv.top < 0) { //верх
          newCoordNewDiv.top = 0;
        }
        if (newCoordNewDiv.left < 0) { //лівий
          newCoordNewDiv.left = 0;

          newDiv.children[1].style.float = 'right'
        }
        if (newCoordNewDiv.left + newDiv.clientWidth > blockBtn.clientWidth) { // правий
          newCoordNewDiv.left = blockBtn.clientWidth - newDiv.clientWidth;

          newDiv.children[1].style.float = 'left'
        }
        if (newCoordNewDiv.top + newDiv.clientHeight > blockBtn.clientHeight) { //низ
          newCoordNewDiv.top = blockBtn.clientHeight - newDiv.clientHeight;
        }

        newDiv.style.left = newCoordNewDiv.left + 'px'; //нові координати
        newDiv.style.top = newCoordNewDiv.top + 'px';
      }
    }
  }

}, false);


