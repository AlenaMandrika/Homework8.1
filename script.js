
var blockBtn = document.getElementById('blockBtn');
blockBtn.addEventListener('click', function (e) {
    var elem = e.target;
    if (elem && elem.id === 'blockBtn') {

        var newDiv = document.createElement('div');
        newDiv.classList.add('block');

        var newBtn = document.createElement('button');
        newBtn.innerHTML = 'lorem';
        newBtn.classList.add('loremBtn');
        newDiv.appendChild(newBtn);
        blockBtn.appendChild(newDiv)

    }

    if (elem && elem.className === 'loremBtn') {
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
        elem.parentNode.remove(elem)
    }

}, false);


blockBtn.addEventListener('mousedown', function (e) {
    var elem = e.target;
    dragableElem = true;
    var coorNewDiv = elem.getBoundingClientRect();
    console.log(coorNewDiv);

    elem.style.top = coorNewDiv.top+'px';//початкові координати
    elem.style.left = coorNewDiv.left+'px';




}, false);

blockBtn.addEventListener('mouseup', function (e) {
    dragableElem = false;

});

blockBtn.addEventListener('mousemove', function (e) {
    var elem = e.target;

    var x = e.clientX; //координата відносно вікна
    var y = e.clientY;

    //var maxWinX = document.getElementById('blockBtn').offsetWidth; //ширина контейнера
    //var maxWinY = document.getElementById('blockBtn').offsetHeight;

    var osx = e.offsetX;//зміщення по х курсора миші
    var osy = e.offsetY;

    elem.style.left = x - osx +'px';
    elem.style.top = y - osy +'px';


}, false);




