const gridContainer = document.querySelector('.gridContainer');
const sizeInput = document.querySelector('.sizeSlider')
const sliderTag = document.querySelector('.sliderValue');
const patternInput = document.querySelector('.patternSelect');
const resetButton = document.querySelector('.resetButton');
const gridlineSelect = document.querySelector('input[name=checkbox]');
let gridlinesOn = true;
let allowDraw = false;
let currentPattern = 'black';

let size = sizeInput.value;
sliderTag.textContent = sizeInput.value;
setGrid(size);

sizeInput.addEventListener('input', () => {
    clearGrid();
    size = sizeInput.value
    setGrid(size);
    sliderTag.textContent = size;
});

patternInput.addEventListener('input', (event) => {
    currentPattern = event.target.options[event.target.selectedIndex].value;
});

gridContainer.addEventListener('click', () => {
    if (!allowDraw) {
        allowDraw = true;
    } else {
        allowDraw = false;
    }
});

gridlineSelect.addEventListener('change', (event) => {
    if (gridlinesOn) {
        gridlinesOn = false;
    } else {
        gridlinesOn = true;
    }
    clearGrid();
    setGrid(size);
});

resetButton.addEventListener('click', () => {
    clearGrid();
    setGrid(size);
});

gridContainer.addEventListener('mouseover', (event) => {
    if (!event.target.firstChild && allowDraw == true) {
        switch (currentPattern) {
            case 'black': {
                event.target.style.backgroundColor = 'black'; 
                break;
            }
            case 'grayscale': {
                let currentBgColor = event.target.style.backgroundColor;
                let currentOpacity = parseFloat(currentBgColor.split(',')[3]);
                let currentColor = parseFloat(currentBgColor.split(',')[1]);
                if (isNaN(currentColor)) {
                    event.target.style.backgroundColor = 'rgb(0,0,0,0.2)';
                } else if (currentOpacity < 1) {
                    event.target.style.backgroundColor = 'rgb(0,0,0,'+(currentOpacity+0.2)+')';
                }
                break;
            }
            case 'rainbow': {
                let randR = Math.floor(Math.random()*255);
                let randG = Math.floor(Math.random()*255);
                let randB = Math.floor(Math.random()*255);
                event.target.style.backgroundColor = 'rgb('+randR+','+randG+','+randB+')';
                break;
            }
            default: {
                event.target.style.backgroundColor = 'blue';
            }
        }
        event.stopPropagation;
    }
});

function setGrid(size) {
    for (let i=0; i<size; i++) {
        let column = document.createElement('div');
        column.className = 'column';
        gridContainer.appendChild(column);
        for (let j=0; j<size; j++) {
            let cell = document.createElement('div');
            cell.className = 'cell';
            column.appendChild(cell);
            if (gridlinesOn) {
                cell.style.border = 'solid 1px rgb(100,100,100,0.2)'
            } else {
                cell.style.border = '';
            }
            cell.style.transitionDuration = '0.4s';
        }
    }
}

function clearGrid() {
    console.log('entered');
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
}