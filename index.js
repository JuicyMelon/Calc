//startup script

let display = "";
let displayText = document.querySelector("#number");
let operations = {
    "1": "C",
    "2": "CE",
    "3": "+",
    "4": "-",
    "5": "*",
    "6": "/",
    "7": "=",
}
let resultObj = {};
let relativeOps = {};
let total;
let counter = 0;
let opCounter = 0;
let skipCount = false;
let container = document.querySelector("#calculator");
let operators = document.querySelector("#operators");

//places digits on screen
for(let i = 1; i <= 10; i++) {
    let temp =  document.createElement('button');
    temp.classList.add('digit');
    temp.setAttribute('id', '' + i);
    
    if(i == 10) {
        temp.setAttribute('id', '0');
    }
    let id = temp.getAttribute('id');
    temp.textContent = id;
    temp.addEventListener('mousedown', () => {
        if(display.toString().length < 10) {
            display += id;
            displayText.textContent = display;
            resultObj[counter + ""] = +display;
        }
        else {
            alert("max string length is 10")
        }

        
    })
    container.appendChild(temp);
}
//keyboard support manager
document.addEventListener('keydown', keyboardFunc)

function keyboardFunc(e) {
    console.log(e.key)
   
    if(e.key == "=" || e.key == "Enter") {
        equalsFunc();
        return false;
    } 
    for(let i = 3; i <= 6; i++) {
        if(operations["" + i] == e.key) {
            opKeyFunc(e);
            return false;
        }
    }
    if(e.key == "Backspace") {
        console.log(e.key)
        backFunc()
        return false;
    }
    if(e.key.toLowerCase() == "c") {
        clearFunc();
        return false;
    }
    for(let i = 0; i <= 9; i++) {
        if(i + "" == e.key) {
            keyFunc(e);
            return false;
        }

    }
    if(e.key == ".") {
        decFunc();
    }
   
}
function keyFunc(e) {
        console.log(e.key)
        if(display.toString().length < 10) {
            display += e.key;
            displayText.textContent = display;
            resultObj[counter + ""] = +display;
        }
        else {
            alert("max string length is 10")
        }

}
//adds clear button
let clear = document.createElement("button");
clear.textContent = "C";
clear.setAttribute('id', "C")
clear.classList.add('digit');
function clearFunc() { 
    display = "";
    resultObj = {}
    relativeOps = {};
    total = undefined;
    counter = 0;
    opCounter = 0;
    skipCount = false;
    displayText.textContent = display;
    console.log(display)
    return 0;
}
clear.addEventListener('mousedown', clearFunc)
operators.appendChild(clear);

//adds backspace button
let back = document.createElement("button");
back.textContent = "DEL";
back.setAttribute('id', "DEL")
back.classList.add('digit');
let backFunc = () => {
    if(display != "") {
        display = display.toString().substring(0, display.toString().length - 1);
    }
    if(total != undefined) {
        total = +display;
    }
    displayText.textContent = display;
    console.log(display)
    resultObj[counter + ""] = +display;
}
back.addEventListener('mousedown', backFunc)

operators.appendChild(back);

//places operators on screen

for(let i = 3; i <= 6; i++) {
    let temp =  document.createElement('button');
    temp.classList.add('digit');
    temp.setAttribute('id', operations[`${i}`]);
    temp.textContent = operations[`${i}`];
    temp.addEventListener('mousedown', () => {
        display = "";
        relativeOps["" + opCounter] = operations[`${i}`];
        if(counter >= 1 && !skipCount) {
            if(total == undefined) {
                total = operate(resultObj["0"], relativeOps["0"], resultObj["1"]);
                console.log(total)
            }
            else {
                total = operate(total, relativeOps[opCounter - 1 + ""], resultObj[counter + ""])            
            }
            if(total == Infinity) {
                alert("you can't do that");
                display = "";
                resultObj = {}
                relativeOps = {};
                total = undefined;
                counter = 0;
                opCounter = 0;
                skipCount = false;
                displayText.textContent = display;
                
            }


        }
        if(skipCount == false) {
            counter++;
        }
        else {
            skipCount = false;
        }
        opCounter++;
        displayText.textContent = total;

        
    })
    
    
    operators.appendChild(temp);
}
function opKeyFunc(e) {
    console.log(e.key)
    display = "";
    relativeOps["" + opCounter] = e.key;
    if(counter >= 1 && !skipCount) {
        if(total == undefined) {
            total = operate(resultObj["0"], relativeOps["0"], resultObj["1"]);
            console.log(total)
        }
        else {
            total = operate(total, relativeOps[opCounter - 1 + ""], resultObj[counter + ""])            
        }
        if(total == Infinity) {
            alert("you can't do that");
            display = "";
            resultObj = {}
            relativeOps = {};
            total = undefined;
            counter = 0;
            opCounter = 0;
            skipCount = false;
            displayText.textContent = display;
            
        }


    }
    if(skipCount == false) {
        counter++;
    }
    else {
        skipCount = false;
    }
    opCounter++;
    displayText.textContent = total;

    
}



let decimal = document.createElement('button');
decimal.classList.add('digit');
decimal.setAttribute('id', '.');
decimal.textContent = '.';
let decFunc = () => {
    if(display.toString().indexOf('.') == -1) {
        display += "."
        displayText.textContent = display;
    }
}
decimal.addEventListener('mousedown', decFunc)
container.appendChild(decimal);


let equals =  document.createElement('button');
equals.classList.add('digit');
equals.setAttribute('id', operations['7']);
equals.textContent = operations['7'];
equals.addEventListener('mousedown', equalsFunc)
function equalsFunc(e) {
    console.table(resultObj);
    console.table(relativeOps);
    if(resultObj["1"] == undefined) {
        alert("you can't do that")
        return false;
    }
    skipCount = true;
    for(let key in resultObj) {
        if(key == "0" || key == "1") {
            total = operate(resultObj["0"], relativeOps["0"], resultObj["1"]);
        }
        else {       
            total = operate(total, relativeOps[+key - 1 + ""], resultObj[key])          
        }

    }
    
    if(total == Infinity) {
        alert("you cant do that")
        display = "";
        resultObj = {}
        relativeOps = {};
        total = undefined;
        counter = 0;
        opCounter = 0;
        skipCount = false;
        displayText.textContent = display;
        
    }
    
    else {
        counter++;
        let i = 10;
        while(total.toString().length > 14) {
            if(total.toString().indexOf(".") != -1) {   
                total = +total;
                total = total.toFixed(i);
                total = total.toString()
                i--;
                console.log(i)
            } 
            else  {
                total = +total;
                total = total.toExponential(9);
                total = total.toString();
                break;
            }
        }
    }
    
        display = "";
        resultObj = {
            "0": total,
        }
        relativeOps = {};
        counter = 0;
        opCounter = 0;
        skipCount = false;
        display = total;
        displayText.textContent = total;
        console.log(total);
    }
    
operators.appendChild(equals);

//basic operator functions:
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, op, b) {
    if(op == "+") {
        return add(a, b);
    }
    else if(op == "-") {
        return subtract(a, b);
    }
    else if(op == "*") {
        return multiply(a, b);
    }
    else if(op == "/") {
        return divide(a, b);
    }
}

//helper functions
function relativeSize() {
    let size = 0;
    for(let key in relativeOps) {
        size++;
    }
    return size;
}


