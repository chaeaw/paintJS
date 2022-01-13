const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const ctx = canvas.getContext("2d");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath(); //  마우스를 클릭하지 않은 채로 움직이면 path 시작점을 고정.
        ctx.moveTo(x,y); //path를 이동. 
    } else {
        ctx.lineTo(x,y); // 마우스를 클릭하면 path전 위치에서 현재 위치까찌 path(not stroke)가 만들어짐
        ctx.stroke(); // 현재의 서브패스를 현재의 스트로크 스타일로 그음.

        // 이 함수들은 mouseMove라서 마우스가 클릭하던지 말던지, 캔버스 안에서 마우스가 움직이는 한 작동하고있음.
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
     const size = event.target.value;
     ctx.lineWidth = size;
}

function handleModeClick(event){
    if(filling === true){ // filling이 true일때(fill 모드일 때) click하면 발생하는 부분(우리가 click 이벤트에 쓸 함수를 만든거기 때문에 click조건이 들어감.)
        filling = false;
        mode.innerText = "Fill";
        
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(event){ // filling = true 일 때 = mode를 클릭해서 fill mode일 때, 캔버스를 클릭하면 채워진다.
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleRightClick(event){
    event.preventDefault();
}

function handleSaveClick(event){
    const image = canvas.toDataURL("image/png")
    const link = document.createElement("a");
    link.href = image;
    link.click();
}
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleRightClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
//Aray.from(object) object로부터 array를 만드는 함수

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}