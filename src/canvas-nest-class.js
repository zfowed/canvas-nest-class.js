

const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(func) {
    return window.setTimeout(func, 1000 / 60);
};

class CanvasNext {

    constructor(option) {
        
        // 获取配置
        this.config = this.getConfig(option);

        // 获取 canvas
        this.canvas = this.config.el || this.newCanvas();

        // 获取 canvas 大小
        this.canvas_width = this.canvas.width = this.canvas.clientWidth;
        this.canvas_height = this.canvas.height = this.canvas.clientHeight;

        // 获取 context
        this.context = this.canvas.getContext("2d");

        // 当前点
        this.current_point = {
            x: null,
            y: null,
            max: 20000
        };

        // 随机点
        this.random_points = [];
        
        // 所有点
        this.all_points = [];

        // 事件监听
        window.onresize = this.onResize.bind(this);
        window.onmousemove = this.onMouseMove.bind(this);
        window.onmouseout = this.onMouseOut.bind(this);

        // 生成点
        this.generatePoints();

        // 开始轮询渲染
        this.frame_func(this.draw_canvas);

    }

    /**
     * 获取配置
     * 
     * @memberof CanvasNext
     */
    getConfig(option) {
        return Object.assign({
            opacity: 0.5,
            color: '0,0,0',
            count: 99,
			zIndex: -1
        }, option || {});
    }

    /**
     * 新建一个 canvas
     * 
     * @memberof CanvasNext
     */
    newCanvas() {
        const canvas = document.createElement("canvas");
        canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:" + this.config.zIndex + ";";
        document.getElementsByTagName("body")[0].appendChild(canvas);
        return canvas;
    }

    /**
     * 生成节点
     * 
     * @memberof CanvasNext
     */
    generatePoints() {
        for (let i = 0; i < this.config.count; i++) {
            this.random_points.push({
                x: Math.random() * this.canvas_width,
                y: Math.random() * this.canvas_height,
                xa: 2 * Math.random() - 1,
                ya: 2 * Math.random() - 1,
                max: 6000
            });
        }
        this.all_points = this.random_points.concat([this.current_point]);
    }

    /**
     * 轮询渲染
     * 
     * @memberof CanvasNext
     */
    frame_func(func) {
        return requestAnimationFrame(() => func.call(this));
    }
    
    /**
     * 渲染
     * 
     * @memberof CanvasNext
     */
    draw_canvas() {
        this.context.clearRect(0, 0, this.canvas_width, this.canvas_height);
        for (let i = 0; i < this.random_points.length; i++) {
            const point = this.random_points[i];
            point.x += point.xa;
            point.y += point.ya;
            point.xa *= (point.x > this.canvas_width || point.x < 0) ? -1 : 1;
            point.ya *= (point.y > this.canvas_height || point.y < 0) ? -1 : 1;
            for (let j = i + 1; j < this.all_points.length; j++) {
                const nextPoint = this.all_points[j];
                if (nextPoint.x !== null && nextPoint.y !== null) {
                    const x_dist = point.x - nextPoint.x;
                    const y_dist = point.y - nextPoint.y;
                    const dist = (x_dist * x_dist) + (y_dist * y_dist);
                    if (dist < nextPoint.max) {
                        if (nextPoint === this.current_point && dist >= nextPoint.max / 2) {
                            point.x -= 0.03 * x_dist;
                            point.y -= 0.03 * y_dist;
                        }
                        const d = (nextPoint.max - dist) / nextPoint.max;
                        this.context.beginPath();
                        this.context.lineWidth = d / 2;
                        this.context.strokeStyle = "rgba(" + this.config.color + "," + (d + this.config.opacity) + ")";
                        this.context.moveTo(point.x, point.y);
                        this.context.lineTo(nextPoint.x, nextPoint.y);
                        this.context.stroke();
                    }
                }
            }
        }
        this.frame_func(this.draw_canvas);
    }

    /**
     * 窗口改变处理事件
     * 
     * @memberof CanvasNext
     */
    onResize() {
        this.canvas_width = this.canvas.width = this.canvas.clientWidth;
        this.canvas_height = this.canvas.height = this.canvas.clientHeight;
    }

    /**
     * 鼠标移动处理事件
     * 
     * @memberof CanvasNext
     */
    onMouseMove(event) {
        event = event || window.event;
        this.current_point.x = event.clientX;
        this.current_point.y = event.clientY;
    }
    
    /**
     * 鼠标移出理事件
     * 
     * @memberof CanvasNext
     */
    onMouseOut() {
        this.current_point.x = null;
        this.current_point.y = null;
    }

}


export default CanvasNext;
