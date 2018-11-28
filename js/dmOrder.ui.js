/* DM order Flow Ui */
 /* 필요 인터렉션
        1. 메뉴가 상단에 붙었다 떨어졌다 한다 (windowScroll이벤트 시)
        2. 컨텐트 위치에 따라 메뉴에 불이 들어온다 (windowScroll 이벤트 시)
        3. 메뉴를 누르면 컨텐츠 위치로 이동하고 메뉴에 불이 들어온다 (메뉴click 이벤트)
        4. 포커스를 벗어날 때마다 밸리데이션 체크 하여 해당 컨텐츠에 클래스를 달아준다. (데이터 밸리데이션 체크 필요)
        5. 메뉴의 저장 및 결제(저장, 입력완료버튼)를 누를 경우
        - 모든 밸리데이션 통과 시 (step5번의 내용 - ajax 파싱)
        - 벨리데이션 미 통과 시 비어있는 메뉴 중 가장 먼저의 인덱스의 컨텐츠로 이동 하고 메뉴 불
        6. 히스토리 백을 하면 다시 돌아간다(step1로)
        7. 저장 및 결제 상태에서 메뉴를 누를 경우 화면전환이 이루어진다. ajax로 내용확인 화면 파싱
        //template 작업완료되시면 주석 지워주세요 'ㅅ'
        */
    var dmFlow = {
        init : function(){
            this.menuList = $("#orderMenu");
            this.menu = this.menuList.find("li").not("#saveNpurchase");
            this.step = $(".i_cont");
            this.posTop = this.menuList.offset().top;
            this.saveBtn = $("#orderPush");
            this.saveStep = $("#saveNpurchase");
            this.setting(this.isValid);            
            this.addEvent();
        },
        
        setting : function(isValid){ //각 스텝 포지션 값            
            this.stepPosTop = [];
            var _self = this;
            var _vlen = this.isValid.length;
            this.step.each(function(i, itm){
                _self.stepPosTop.push(Math.ceil($(itm).offset().top - 197));
            })
            this.isValid.map(function(item, idx){
                var _class = (item) ? "completed" : "";
                _self.menu.eq(idx).addClass(_class);
            })
            for(var i = 0; i < _vlen; i++){
                if(!this.isValid[i]){
                    this.menu.eq(i).addClass('active');
                    break;
                }
            }
        },
        addEvent : function(){ //이벤트 바인딩 및 언바인딩
            var _window = $(window);            
            var _self = this;
            var timer;
            _window.on("scroll", function(){
                if(!timer){
                    timer = setTimeout(function(){                        
                        timer = null; 
                        _self.scrolling(_self);
                    }, 200)
                }
            })
            this.menu.on("click", function(e){
                //1-4 step
                e.preventDefault();
                var _idx = $(this).index();                
                _self.jump(_idx);
            })

            this.saveStep.on("click", function(e){                
                e.preventDefault();                
                _self.save();
                
            })
            
            this.saveBtn.on("click", function(){
                _self.save();
            })

        },

        scrolling : function(_self, _wPos){
            var _window = $(window);
            var _wPos = Math.ceil(_window.scrollTop());
            var _isSticky = _self.menuList.is('.sticky');            
            var _posLen = this.stepPosTop.length;

            //메뉴 sticky
            if(_self.posTop <= _wPos && !_isSticky){
                _self.menuList.addClass("sticky");
            }else if(_self.posTop > _wPos && _isSticky){
                _self.menuList.removeClass("sticky")
            }
            
            //메뉴 불켜기
            for(var i = 0; i < _posLen; i++){
                var _bottom = $(document).height() - _window.height();
                
                if(_bottom === _wPos){
                    _self.menu.eq(_posLen-1).addClass("active").siblings("li").removeClass("active");
                    break;
                }

                var _next = (i < _posLen-1) ? _self.stepPosTop[i+1] > _wPos : true;
                if(_self.stepPosTop[i] <= _wPos && _next){                                
                    _self.menu.eq(i).addClass("active").siblings("li").removeClass("active");
                    break;
                }
            }
        },

        jump : function(idx){
            $("html,body").animate({"scrollTop" : this.stepPosTop[idx] }, 400)
        },

        save : function(){
            // 저장 눌렀을때 valid  확인 후 submit 호출
            var _self = this;
            var _allValid = true;
            var _vlen = _self.isValid.length;
            for(var i = 0; i < _vlen; i++){
                if(!_self.isValid[i]){
                    _allValid = false;
                    N(window).alert({
                        msg : "입력이 덜 됐는데요!",
                        onOk : function(){                                
                            _self.jump(i);
                        }
                    }).show();
                    break;
                }
            }
            
            //통과
            if(_allValid){
                $.ajax({ //혹은 라우터 변경 
                    url : '/design/basicDmOrderList.html',
                    dataType : 'html',
                    method : 'get', //check
                    data : {} //전달 data
                }).done(function(data){
                    $("body").html(data);
                    //scroll위치 변경
                    $("html, body").animate({"scrollTop" : 0}, 400)
                }).fail(function(e){
                    console.log(e)
                })
            }
            
        }

    }

