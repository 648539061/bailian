//主入口js
//config.js-----
    requirejs.config({
        paths : {
        	//新名字：旧名字
             "jquery": "jquery-1.10.1.min",
             "jquery2",'jquery.min',
             "index":"index",
             "zuoce":"zuoce",
             "opacity":"opacity"
        }
    });
    
 //main.js-----
    requirejs(['jquery',"jquery2","index","zuoce","opacity"],function($){
        //这里的代码等common，moduleA，moduleB，moduleC模块都加载完成后执行
        //但不保证以上模块的加载顺序
        // $('body').css('background','yellow');
        
    });