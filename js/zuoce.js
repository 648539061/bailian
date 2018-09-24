$(function(){
        //产品展示动画
    $('.nav_move_top li').each(function(index){
        $(this).mouseover(function(){
            $(".nav_move_show li").hide().eq(index).show();
            $(this).mouseout(function(){
                $(".nav_move_show li").hide();
            });
            $(".nav_move_show li").mouseover(function(){
                $(".nav_move_show li").eq(index).show();
                $(".nav_move_show li").mouseout(function(){
                    $(".nav_move_show li").hide();
                });
            });        
        });
    });
});