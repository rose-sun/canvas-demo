/*********/ //1. 控制画布，自动设置画布尺寸
var canvas = document.getElementById('xxx');
var context = canvas.getContext('2d');
var lineWidth = 3
autoSetCanvasSize(canvas)

/*********/  //2. 监听鼠标事件
listenToUser(canvas)

/********/ //3. 控制橡皮擦开关
var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    brush.classList.remove('active')   //此消彼长
}
brush.onclick = function () {
    eraserEnabled = false
    brush.classList.add('active')
    eraser.classList.remove('active')
}
clear.onclick = function(){
    context.clearRect(0, 0, canvas.width, canvas.height)
}

download.onclick = function(){
    var url = canvas.toDataURL("image/png")  // 拿到地址
    var a = document.createElement('a')
    document.body.appendChild(a)   //把a标签放进页面
    a.href = url
    a.download = '我的画作'
    a.target = '_blank'
    a.click()   //必不可少
}

black.onclick = function(){
    context.strokeStyle = 'red'
    black.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    green.classList.remove('active')
}

red.onclick = function(){
    context.strokeStyle = 'red'
    black.classList.remove('active')
    red.classList.add('active')
    blue.classList.remove('active')
    green.classList.remove('active')
}

green.onclick = function(){
    context.strokeStyle = 'green'
    black.classList.remove('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    green.classList.add('active')
}

blue.onclick = function(){
    context.strokeStyle = 'blue'
    black.classList.remove('active')
    red.classList.remove('active')
    blue.classList.add('active')
    green.classList.remove('active')
}

thin.onclick = function(){
    lineWidth = 3
    thick.classList.remove('active')
    thin.classList.add('active')
}

thick.onclick = function(){
    lineWidth = 6
    thin.classList.remove('active')
    thick.classList.add('active')
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
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill(); //结束
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.lineWidth = lineWidth  //取当前的画笔宽度即可
    context.stroke()
    context.closePath()
}

function listenToUser(canvas) {
    var using = false;  //不仅是painting,橡皮擦也用这个
    var lastPoint = { x: undefined, y: undefined }
    //特性检测
    if (document.body.ontouchstart !== undefined) {  //触屏设备
        canvas.ontouchstart = function (aaa) {
            using = true;   //按下鼠标就是在用，不管用什么
            var x = aaa.touches[0].clientX;
            var y = aaa.touches[0].clientY;   //多点触控时取第一个点
            if (eraserEnabled) {   //用橡皮
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {             //用画笔
                lastPoint = { x: x, y: y }
            }
        }

        canvas.ontouchmove = function (aaa) {
            if (using) {
                var x = aaa.touches[0].clientX;
                var y = aaa.touches[0].clientY;
                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    var newPoint = { x: x, y: y }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint  //实时更新很关键
                }
            }
        }

        canvas.ontouchend = function (aaa) {
            using = false
        }


    } else {   //非触屏设备
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

}
