let gol;
let play = false;

function main() { 
    let gol = initializeArray();
    initializeArrayWithFigure(gol);
    CreateTable(gol);
}

function next() {
    nextGen();
    refreshTable();
}

function loop() {
    if (!play) return
    next();
    setTimeout(loop, 250)
}

function Ex1(){
    if (play) return
    restart()
    gol[3][4] = 1;
    gol[4][4] = 1;
    gol[5][4] = 1;
    gol[4][3] = 1;
    gol[5][3] = 1;
    gol[4][5] = 1;
    gol[5][5] = 1;
    refreshTable();
}

function Ex2(){
    if (play) return
    restart()
    gol[0][7] = 1;
    gol[1][7] = 1;
    gol[2][7] = 1;
    gol[3][7] = 1;
    gol[4][7] = 1;
    gol[5][7] = 1;
    gol[6][7] = 1;
    gol[7][7] = 1;
    gol[8][7] = 1;
    refreshTable();
}

function Ex3(){
    if (play) return
    restart()
    gol[3][4] = 1;
    gol[5][4] = 1;
    gol[5][3] = 1;
    gol[5][5] = 1;
    refreshTable();
}

function Ex4(){
    if (play) return
    restart()
    gol[3][4] = 1;
    gol[4][4] = 1;
    gol[5][4] = 1;
    gol[4][3] = 1;
    gol[4][5] = 1;
    refreshTable();
}

function Ex5(){
    if (play) return
    restart()
    gol[0][0] = 1;
    gol[0][1] = 1;
    gol[0][2] = 1;
    gol[0][3] = 1;
    gol[0][4] = 1;
    gol[0][5] = 1;
    gol[0][6] = 1;
    gol[0][7] = 1;
    gol[0][8] = 1;
    refreshTable();
}

function changeLoopState(value) {
    if (play === value) return
    play = value;
    
    //if (play) {
    //    document.getElementById("b1").innerText = "⏸️"
    //} else {
    //    document.getElementById("b1").innerText = "▶️"
    //}
    
    document.getElementById("b1").innerText = play ? "⏸️" : "▶️";
    loop();
}

function restart() {
    for (let i = 0; i < gol.length; i++) {
        for (let j = 0; j < gol[i].length; j++) {
            gol[i][j] = 0;
        }
    }
    copyArray(gol);
    refreshTable();
}

function initializeArray() {
    let arr = new Array(9);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(9);

        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}

function chooseFigure(i, j) {
    if (!play) {
        gol[i][j] = 1 - gol[i][j];
        refreshTable();
    }
}

function initializeArrayWithFigure() {
    gol = initializeArray();
}

function refreshTable() {
    for (i = 0; i < gol.length; i++) {
        for (j = 0; j < gol[i].length; j++) {
            td = document.getElementById("td" + i + "_" + j);
            if (gol[i][j] == 1) {
                td.className = "white";
            }
            else {
                td.className = "black";
            }
        }
    }
}

function changeColor(i, j) {
    data.className = "white";
}

function CreateTable() {
    const t = document.createElement("table")
    for (i = 0; i < gol.length; i++) {
        row = document.createElement("tr");
        for (j = 0; j < gol[i].length; j++) {
            data = document.createElement("td");
            data.setAttribute("onclick", "chooseFigure(" + i + "," + j + ")");
            data.setAttribute("id", "td" + i + "_" + j);
            row.appendChild(data);
            data.className = "black";
        }
        t.appendChild(row);
    }

    document.getElementById("ph1").appendChild(t);
}

function countNeighbours(row, col) {
    let nrNeighbours = 0;
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            nrNeighbours += gol[(i + gol.length) % gol.length][(j + gol[0].length) % gol[0].length];
        }
    }
    nrNeighbours -= gol[row][col];
    return nrNeighbours; 
}

function nextGen() {
    let newGen;
    newGen = initializeArray();
    for (let i = 0; i < gol.length; i++) {
        for (let j = 0; j < gol[i].length; j++) {
            if (gol[i][j] == 0) {
                if ((countNeighbours(i, j) == 3)) {
                    newGen[i][j] = 1;
                }
            } else if (gol[i][j] == 1) {
                if ((countNeighbours(i, j) == 3) || (countNeighbours(i, j) == 2)) {
                    newGen[i][j] = 1;
                } else {
                    newGen[i][j] = 0;
                }
            }
        }
    }
    gol = newGen;
}

function copyArray(newGen) {
    console.log(newGen);
    for (let i = 0; i < newGen.length; i++) {
        for (let j = 0; j < newGen[i].length; j++) {
            gol[i][j] = newGen[i][j];
        }
    }
}

