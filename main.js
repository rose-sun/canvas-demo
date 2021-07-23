/*********/ //1. 控制画布，自动设置画布尺寸
var canvas = document.getElementById('xxx');
var context = canvas.getContext('2d');
autoSetCanvasSize(canvas)

/*********/  //2. 监听鼠标事件
listenToUser(canvas)

/********/ //3. 控制橡皮擦开关
var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true
    actions.className = 'actions x'
}
brush.onclick = function () {
    eraserEnabled = false
    actions.className = 'actions'
}

function autoSetCanvasSize(canvas) {  //要传一个canvas参数进来才行
    setCanvasSize()

    window.onresize = function () {
        setCanvasSize()
    }

function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawCircle(x, y, radius) {
    context.beginPath();  //开始画了
    context.strokeStyle = 'black'
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill(); //结束
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.strokeStyle = 'black'
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.lineWidth = 5
    context.stroke()
    context.closePath()
}

function listenToUser(canvas) {
    var using = false;  //不仅是painting,橡皮擦也用这个
    var lastPoint = { x: undefined, y: undefined }
    canvas.onmousedown = function (aaa) {
        using = true;   //按下鼠标就是在用，不管用什么
        var x = aaa.clientX;
        var y = aaa.clientY;
        if (eraserEnabled) {   //用橡皮
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {             //用画笔
            lastPoint = { x: x, y: y }
        }
    };

    canvas.onmousemove = function (aaa) {
        if (using) {
            var x = aaa.clientX;
            var y = aaa.clientY;
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = { x: x, y: y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint  //实时更新很关键
            }
        }
    };

    canvas.onmouseup = function (aaa) {
        using = false;
    };
}