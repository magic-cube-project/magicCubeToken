class NavigationDrawerActivity extends JActivity {
    constructor(newActivityAction) {
        super(newActivityAction);
        var point = this;

        this.TabDel = function(nav, context, side) {
            var action = point.config.name + '_nav';
            var model = [];
            var currentModel = null;
            var navArr = J(nav).domAll('li');
            // var navArr = J(nav).domAll('*[data-action="' + action + '"]');

            for (var i = 0; navArr.length > i; i++) {
                if (!navArr[i].dataset.action) navArr[i].dataset.action = "";
                navArr[i].dataset.action += " " + action;
            }
            this.addEvent("click", action, function(dom) {
                for (var k = 0; navArr.length > k; k++) {
                    var one = navArr[k];
                    J(one).removeClass('active');
                }

                side.close(() => {
                    currentModel.sleep();
                    J(dom).addClass('active');
                    model[dom.dataset.target].activite();
                    currentModel = model[dom.dataset.target];
                });
            });

            var fn = {
                add: function(config) {
                    var name = config.name;
                    model[name] = point.loadActivity(name, name, context).init();

                    return fn;
                },
                init: function(name) {
                    model[name].activite();
                    currentModel = model[name];
                    J(nav).domFirst('*[data-target="' + name + '"]').className = "active";
                    return fn;
                }
            };
            return fn;
        };
    }
}

class SideNav {
    constructor(dom) {
        this.speed = .25; //默认的展开速度

        this.mask = dom.getElementsByClassName("mask-bg")[0];
        this.slide = dom.getElementsByClassName("side-nav-list")[0];
        this.slideTran = new Transition(this.slide);
        this.maskTran = new Transition(this.mask);
        this.slideTran.setDuration(this.speed);
        this.maskTran.setDuration(this.speed);
        J(this.mask).click(() => {
            this.close();
        });

    }
    display() {
        this.maskTran.setOpacity(0).getDisplay().setOpacity(1);
        this.slideTran.set3dCoordinate({
            x: "-" + J(this.slide).getcss('width')
        }).getDisplay().set3dCoordinate({
            x: 0
        });
    }
    close(fn) {
        this.maskTran.setOpacity(0);
        this.slideTran.set3dCoordinate({
            x: "-" + J(this.slide).getcss('width')
        }).then(() => {
            J(this.mask).setcss('display', 'none');
            J(this.slide).setcss('display', 'none');
            if (typeof fn == "function") {
                fn();
            }
        });
    }
}

app.css(` .mask-bg {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(80, 80, 80, 0.5);
    top: 0;
    display: none;
}

.side-nav-list {
    position: absolute;
    width: 300px;
    height: 100%;
    background-color: #f6f6f6;
    top: 0;
    display: none;
    overflow: scroll;
}`);

app.css(`.slideout {
    -webkit-animation-duration: .3s;
    -webkit-animation-fill-mode: forwards;
}

.slidein {
    -webkit-animation-duration: .3s;
    -webkit-animation-fill-mode: forwards;
}


@-webkit-keyframes slidein {
    from {
        -webkit-transform: translate3d( 0,100%, 0);
      
    }
    to {
        -webkit-transform: translate3d(0, 0, 0);
      
    }
}

@-webkit-keyframes slideout {
    from {
        -webkit-transform: translate3d(0, 0, 0);
       
    }
    to {
        -webkit-transform: translate3d( 0, 100%, 0);
        
    }
}`
);

class SubActivity extends JActivity {
    constructor(con) {
        super(con);
        // 设置返回的监听事件
        this.addEvent("click", "back", function () {
            SubActivity.slideout(this);
        });
    }
    static init(){
        if (!SubActivity.fnArr) {
            SubActivity.fnArr = {};
            document.addEventListener("animationend", function (ev) {
                ev.target.style["-webkit-animation-name"] = null;
                J(ev.target).removeClass(ev.target.dataset.amfn);
                if (SubActivity.fnArr[ev.target.dataset.amfn]) {
                    SubActivity.fnArr[ev.target.dataset.amfn].call(ev.target);
                    delete SubActivity.fnArr[ev.target.dataset.amfn];
                }
            }.bind(SubActivity));
        }
    }
    static ctr (dom, con, fn) {
        SubActivity.init();
        J(dom).addClass(con);
        dom.dataset.amfn = con;
        dom.style["-webkit-animation-name"] = con;
        SubActivity.fnArr[con] = fn;
    }
    static slidein(pactivity, oactivity) {
        oactivity.activite();
        oactivity.parent = pactivity;
        SubActivity.ctr(oactivity.getContext(), "slidein", function () {
            pactivity.sleep();
            // 如果动画完成调用,动画完成时候的函数
            if(oactivity.amFinished){
                oactivity.amFinished();
            }
        });
    }
    static slideout(activity) {
        activity.parent.activite();
        SubActivity.ctr(activity.getContext(), "slideout", function () {
            activity.destroy();
        });
    }
}
