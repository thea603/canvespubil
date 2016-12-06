/**
 * Created by Administrator on 2016/12/6.
 */

// 封装jq插件
// 面向对象思想
// 设置一个构造函数
var Beautifuler = function(ele, opt) {
    this.element = ele,
        // 设置默认样式
        this.defaultStyle = {
            arr: [-8,7,6,-5],
            befores: [-8,8,-5,2],
            nows: [-1,4,5,2],
            Xname: ['第一项','第二项','第三项','第四项'],
            line : '21',
            height:'30',
            name:'canvas'
        },

        // 使用extend方法，根据外部是否传入新样式来决定使用哪一套样式表
        this.setting = $.extend({}, this.defaultStyle, opt);

};
var ocanvas = document.getElementById('canvas');
var mycanvas = ocanvas.getContext("2d");
//第一先定义一个画线的函数方法    画两条线
function lines(aX,aY,bX,bY) {//开始和结束的横坐标  开始和结束的纵坐标
    mycanvas.beginPath();
    mycanvas.moveTo(aX,aY);
    mycanvas.lineTo(bX,bY);
    mycanvas.stroke();
}
lines(60,10,60,610);

//第二用for循环 画11条线   利用上面line的画线方法
for(var i=21;i>0;i--){
    lines(900,i*30,60,i*30);
    writes(-(i-11),7,i*30);

}
lines(900,660,94,660);

function circles(){
    mycanvas.beginPath();
    mycanvas.moveTo(60,560);           // 创建开始点
    mycanvas.lineTo(60,620);          // 创建水平线
    mycanvas.arcTo(70,661,90,661,50); // 创建弧
    mycanvas.stroke();
}
circles();
//第三定义一个矩形的函数方法
function rects(X,Y,width,height,color) {
    console.log(1224);
    mycanvas.beginPath();
    mycanvas.fillStyle=color;
    mycanvas.rect(X,Y,width,height);
    mycanvas.fill();
    mycanvas.closePath()
}



//添加字
function writes(start,ox,oy) {
    mycanvas.beginPath();
    mycanvas.font="22px 微软雅黑";
    mycanvas.strokeStyle='0000ff';
    mycanvas.fillStyle='#494949';
    mycanvas.fillText(start,ox,oy+2);
    mycanvas.closePath();
}

// 向原型中挂载方法，在方法中把样式添加进选中的节点
Beautifuler.prototype = {
    Xnames: function() {
        for(var y=0;y<this.setting.Xname.length;y++){
            writes(this.setting.Xname[y],140+y*150+y*30,695);
        }
    },
    beforeB: function() {
        for(var i=0;i<this.setting.arr.length;i++){
            var width=30;
            var height=this.setting.arr[i]*30;
            var X=140+i*150+i*20;
            var Y=330-height;
            rects(X,Y,width,height,'#fff6cc');
            mycanvas.font="3rem Verdana";
            mycanvas.fillStyle='black';
            if(this.setting.arr[i]<0){
                mycanvas.fillText(this.setting.arr[i],X-2,Y+25)
            }else{
                mycanvas.fillText('+'+this.setting.arr[i],X-3,Y-18)
            }
        }
    },
    before: function() {
        for(var i=0;i<this.setting.befores.length;i++){
            var width=30;
            var height=this.setting.befores[i]*30;
            var X=180+i*150+i*20;
            var Y=330-height;
            rects(X,Y,width,height,'#ffe87f');
            mycanvas.font="3rem Verdana";
            mycanvas.fillStyle='black';
            if(this.setting.befores[i]<0){
                mycanvas.fillText(this.setting.befores[i],X,Y+25)
            }else{
                mycanvas.fillText('+'+this.setting.befores[i],X-8,Y-8)
            }
        }
    },
    now: function() {
        for(var i=0;i<this.setting.nows.length;i++){
            var width=30;
            var height=this.setting.nows[i]*30;
            var X=220+i*150+i*20;
            var Y=330-height;
            rects(X,Y,width,height,'#ffcf00');
            mycanvas.font="3rem Verdana";
            mycanvas.fillStyle='black';
            if(this.setting.nows[i]<0){
                mycanvas.fillText(this.setting.nows[i],X-3,Y+25)
            }else{
                mycanvas.fillText('+'+this.setting.nows[i],X,Y-8)
            }
            // write((i+1)+"月",320+i*40+i*10,500)
        }
    }
}
// 把定义出来的对象挂载进jq插件
$.fn.setFont = function(option) {
    // 创建对象实例
    var beautifuler = new Beautifuler(this, option);
    // 调用对象方法，让字体样式发生改变
    beautifuler.Xnames();
    beautifuler.beforeB();
    beautifuler.before();
    beautifuler.now();
}
