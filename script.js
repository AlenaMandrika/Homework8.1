
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
            console.log(parent);
            var littleBtn = document.createElement('button');
            littleBtn.innerHTML = 'x';
            littleBtn.classList.add('littleBlock');
            parent.insertBefore(littleBtn, null)
        }
    }

    if (elem && elem.className === 'littleBlock') {
        elem.parentNode.remove(elem)
    }
});

var btn = document.querySelector('.newBtn');
blockBtn.addEventListener('mousedown', mDown);
blockBtn.addEventListener('mousedown', mUp);
function mDown (e) {

        var elem = e.target;
        var coor = getCoords(btn); //получаємо координати елемента
        var shiftX = e.pageX - coor.left;
        var shiftY = e.pageY - coor.top;


        btn.style.position = 'absolute';


        function mMove(e) {
            btn.style.left = e.pageX - btn.offsetWidth / 2 + 'px';
            btn.style.top = e.pageY - btn.offsetHeight / 2 + 'px';
        }

        blockBtn.addEventListener('mousemove', function (e) {
            mMove(e);
        });



        btn.addEventListener('mouseup', function () {
            mUp(e)
        });

}

function mUp(e) {
    blockBtn.removeEventListener('mousemove', mMove);
    btn.removeEventListener('mouseup', mUp);
}


btn.ondragstart = function() {
    return false;
};

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

