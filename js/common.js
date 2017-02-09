var $common = 
{
	page:function(url,showContain,imgType,pageSize)
	{
        var page = 1;
        var innerHeight = window.innerHeight;
        var timer2 = null;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            timeout: '1000',
            cache: 'false',
            success: function (ret) {
                var _data = ret.data,
                    _rows = _data.rows,
                    _len = _rows.length;
                _html = $common.renderHtml(_rows,ret.data.count,pageSize);
                showContain.append(_html);
                if (imgType==undefined) $("img[src2]").Jlazyload({type: "image"});
                var ajax_getting = false;　
                $(window).scroll(function() {
                clearTimeout(timer2);
                  timer2 = setTimeout(function() {
                    var scrollTop = $(document.body).scrollTop();　　
                    var scrollHeight = $('body').height();　　
                    var windowHeight = window.innerHeight;
                    var scrollWhole = Math.max(scrollHeight - scrollTop - windowHeight);
                    if (scrollWhole < 300) {
                      if (ajax_getting) {
                        return false;
                      } else {
                        ajax_getting = true;
                      }
                      $('html,body').scrollTop($(window).height() + $(document).height());
                      page++;
                      $.ajax({
                        url: url+'/page/' + page,
                        type: 'GET',
                        dataType: 'json',
                        success: function (ret) {
                            var _data = ret.data,
                                _rows = _data.rows,
                                _len = _rows.length;
                            if (!_len) {
                                 $(window).unbind('scroll');
                                $('.l_loading').removeClass('l_loading')
                                _noMore = true;return true;
                            }
                            _html = $common.renderHtml(_rows,ret.data.count,pageSize);
                            showContain.append(_html);
                            if (imgType==undefined) $("img[src2]").Jlazyload({type: "image"});
                            ajax_getting = false;
                        }
                      });　　
                    };
                  }, 2);
                });
              },
              error: function (data) {
         
              }
        })
    },
    showBigImg:function(obj){
        obj.parent().next().show();
        var imgList = obj.parent().next().children(".img-list");
        imgList.html(obj.parent().html());

        index = obj.index();
        count = imgList.children().length;
        if(imgList.next().children().length == 0) {
            for(var i = 0; i < count; i++) {
                imgList.next().append("<li></li>");
            }
        }

        imgList.next().css("margin-left", "-" + 0.2 * count + "rem");
        imgList.next().children().removeClass("tip-list-active").eq(index).addClass("tip-list-active");
        imgList.css("left", "-" + 9.6 * index + "rem");

        //Enable swiping...
        imgList.children("div").swipe({
            //Generic swipe handler for all directions
            swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                if(direction == "left" && index < count - 1) {
                    index = $(this).index() + 1;
                    $(this).parent().animate({
                        left: "-=9.6rem"
                    }, 200);
                    $(this).parent().next().children().removeClass("tip-list-active");
                    $(this).parent().next().children().eq(index).addClass("tip-list-active");
                }
                if(direction == "right" && index > 0) {
                    index = $(this).index() - 1;
                    $(this).parent().animate({
                        left: "+=9.6rem"
                    }, 200);
                    $(this).parent().next().children().removeClass("tip-list-active");
                    $(this).parent().next().children().eq(index).addClass("tip-list-active");
                }
                if(direction == "up") {
                    event.preventDefault();
                    console.log(distance);
                    $("body").animate({
                        scrollTop: "+=" + distance * 1.2
                    }, 200);
                }
                if(direction == "down") {
                    event.preventDefault();
                    console.log(distance);
                    $("body").animate({
                        scrollTop: "-=" + distance * 1.2
                    }, 200);
                }

            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            threshold: 0
        });
    }
}