/* barodm ui.js */

//email_set
var email_set = {
    init : function(){
        var target = $(".email_set");
        this.emailSelect = target.find("select");
        this.emailInput = target.find(".email_company");
        this.addEvent();
    },
    addEvent : function(){
        var _self = this;
        this.emailSelect.change(function(){
            var flag = !(this.value === "");
            _self.emailInput.val(this.value);
            _self.emailInput.prop("readonly", flag);
        })
    }
}

//input_file_set
var input_file_set = {
    init : function(){
        var target = $(".input_file_set");
        this.inputFile = target.find("input[type='file']");
        this.findBtn = target.find("label");
        this.addEvent();
    },
    addEvent : function(){
        var _self = this;
        this.inputFile.change(function(){
            $(this).prev("input[type='text']").val(this.value);
        })
    }
}

//family_site
var family_site = {
    init : function(){
        var target = $(".family_site");
        this.toggleBtn = target.children("a");
        this.familyList = target.find("#familySite");
        this.addEvent(target);
    },
    addEvent : function(cont){
        var _self = this;
        this.toggleBtn.click(function(e){
            _self.familyList.stop().slideToggle(200);
        })
        cont.mouseleave(function(){
            _self.familyList.slideUp(200)
        })
        // $("body").click(function(e){
        //     if($(e.target).parents().is(".family_site")) return;
        //     _self.familyList.slideUp(200)
        // })
    }
}

//gnb
var gnb = {
    init : function(){
        var target = $("#gnb");
        this.menu = target.find(".gnb").children("li");
        this.header = target.closest("#header");
        this.bg = target.find(".nav_bg");
        this.active = this.menu.filter(".on");
        if(this.active.length){
            this.bg.addClass("on");
        }
        this.addEvent();
    },
    addEvent : function(){
        var _self = this;
        this.menu.mouseenter(function(){
            _self.open(this);
        })
        this.menu.mouseleave(function(){
            _self.close();
        })
        this.header.mouseleave(function(){
            if(!_self.active.length) return;
            _self.open(_self.active);
        })
    },
    open : function(target){
        this.bg.stop().slideDown(250,function(){
            $(target).addClass("on")
        })
    },
    close : function(){
        this.menu.removeClass("on");
        this.bg.stop().slideUp(200);
    }
}

//imgViewer
var imgViewer = {
    init : function(){
        var target = $(".imgPreview");
        this.thumbList = target.find(".preview_list").find("li");
        this.moreBtn = target.find(".btn_img_more");
        this.imgViewer = target.find(".img_viewer");
        this.addEvent();

    },
    addEvent : function(){
        var _self = this;
        this.thumbList.find("img").on("click", function(){
            _self.thumbnail.attr("src", $(this).attr("src"));
        })
        this.moreBtn.on("click", function(){
            _self.resize();
            var _parent = $(this).closest(".preview_box");
            _parent.next(".img_viewer").find("img").attr("src", _parent.find("img").attr("src"));
            _parent.next(".img_viewer").show();
        })
        this.imgViewer.find(".btn_closing").on("click", function(){
            _self.imgViewer.hide();
        })
    },
    resize : function(){
        var _mh = 840;
        var _wh = $(window).height();
        var _h = (_wh >= _mh) ? _mh : (_wh - 10);
        this.imgViewer.find("img").height(_h);
    }
}

//topbtn
var topBtn = {
    init : function(){
        this.target = $(".btn_top_sec");
        this.moving(); 
        this.addEvent();
    },
    addEvent : function(){
        var _self = this;
        var timer;
        $(window).on("scroll", function(){
            if(!timer){
                timer = setTimeout(function(){                        
                    timer = null; 
                    _self.moving();
                }, 100)
            }
        });
    },
    moving : function(){        
        var _window = $(window);
        var _ws = _window.scrollTop();
        var _bottom = $(document).height() - _window.height() - 220;
        if(_ws > 0 && _ws < _bottom ){
            this.target.addClass("fixed");
        }else{
            this.target.removeClass("fixed");
        }
    }
}

//Cookie , cookiePop 
var Cookie = {
    setCookie : function( name, value, expiredays ){
        var todayDate = new Date();
        todayDate.setDate( todayDate.getDate() + expiredays );
        document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
    },
    getCookie : function(name){
        name += "=";
        var arr = decodeURIComponent(document.cookie).split(';');
        for (var i = 0; i < arr.length; i++) {
            var c = arr[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }
}

var cookiePop = { // 사이트 공지쿠키팝업
    init : function(noShow, data){
        this.data = data;
        this.noShow = noShow;
        this.showList = [];
        this.generator();
        this.position();
        this.addEvent();
    },
    position : function(){//위치잡기
        var target = $(".cookie_pop");
        var _left = 50; //초기 위치
        $(window).load(function(){//모든렌더(이미지) 끝난 후             
            target.each(function(i, e){
                $(e).css("left", _left);
                _left += $(e).width() + 40; //간격40
            })
        })
    },
    generator : function(){//팝업그리기
        var _self = this;
        var _el = "";
        this.data.forEach(function(e , i){ //보여줄 리스트 추출
            if(!_self.noShow.includes(e.id)){
                _self.showList.push(e)
            }
        })
        this.showList.forEach(function(e, i){
            var _name = e.id + new Date().getMilliseconds();
            _el += '<div class="cookie_pop" id="' +  e.id + '" >'
                + '<div class="cont_sec">'
                + e.content
                + '</div>'
                + '<div class="btn_sec">'
                + '<div class="today">'
                + '<div class="input_set" data-type="checkbox">'     
                + '<input type="checkbox" id="' + _name + '"  />'
                + '<label for="' + _name + '">'
                + '<span class="text">오늘하루 열지 않기</span>'
                + '</label>'
                + '</div>'
                + '</div>'
                + '<button type="button" class="close">닫기</button>'
                + '</div>'
                + '</div>'
        })
        $("body").append(_el);
    },

    addEvent : function(){ // 이벤트 바인딩
        var _self = this;
        var target = $(".cookie_pop");
        var closeBtn = target.find(".close");
        closeBtn.on("click", function(){ // 닫기           
            var _today = $(this).siblings().find("input[type='checkbox']");
            var _id = $(this).closest(".cookie_pop").attr("id");
            if(_today.prop("checked")){ // 더 안볼꺼면 쿠키굽기
                Cookie.setCookie(_id,"Y",1)
            }
            _self.close(_id);
        })
    },
    close : function(id){
        $("#" + id).remove();
    }
}

$(function(){
    $("#gnb").length && gnb.init();
    $(".family_site").length && family_site.init();
    $(".btn_top_sec").length && topBtn.init();
})


