 
import Vue from 'vue';
import store from '@/store/index'
 
// v-permission: 功能权限指令
Vue.directive('permission', {
    inserted(el, binding, vnode, oldVnode) {
        const { value } = binding
        const limits = store.getters && store.getters.limits
        if (value) {
            const permissionRoles = value
            const hasPermission = limits.some(limit => {
                return permissionRoles==limit
            })
            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        } else {
            throw new Error(`need limits! Like v-permission="'test'"`)
        } 
    }
})
 

// v-dialogDrag: 弹窗拖拽 <el-dialog v-dialogDrag></el-dialog>
Vue.directive('dialogDrag', {
    bind(el, binding, vnode, oldVnode) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector('.el-dialog');
        dialogHeaderEl.style.cursor = 'move';
 
        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
        
        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft;
            const disY = e.clientY - dialogHeaderEl.offsetTop;
            
            // 获取到的值带px 正则匹配替换
            let styL, styT;
 
            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if(sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
            }else {
                styL = +sty.left.replace(/\px/g, '');
                styT = +sty.top.replace(/\px/g, '');
            };
            
            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离 
                const l = e.clientX - disX;
                const t = e.clientY - disY;
 
                // 移动当前元素  
                dragDom.style.left = `${l + styL}px`;
                dragDom.style.top = `${t + styT}px`;
 
                //将此时的位置传出去
                //binding.value({x:e.pageX,y:e.pageY})
            };
 
            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }  
    }
})
 
// v-dialogDragWidth: 弹窗宽度拖大 拖小
Vue.directive('dialogDragWidth', {
    bind(el, binding, vnode, oldVnode) {
        const dragDom = binding.value.$el.querySelector('.el-dialog');
 
        el.onmousedown = (e) => {
            
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - el.offsetLeft;
            
            document.onmousemove = function (e) {
                e.preventDefault(); // 移动时禁用默认事件
 
                // 通过事件委托，计算移动的距离 
                const l = e.clientX - disX;
                dragDom.style.width = `${l}px`;
            };
 
            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }  
    }
})


//滚动插件的包
import PerfectScrollbar from 'perfect-scrollbar';
//对应的css
import "perfect-scrollbar/css/perfect-scrollbar.css";
/**
 * @description 
 * 自动判断该更新PerfectScrollbar还是创建它
 * 全局添加
 * .el-table--scrollable-x .el-table__body-wrapper{
        overflow: hidden !important;
    }
    .el-table__body-wrapper:hover > .ps__rail-x,
    .el-table__body-wrapper:hover > .ps__rail-y {
    opacity: 0.6;
    }
    .el-table--scrollable-x .el-table__body-wrapper > .ps__rail-x,
    .el-table--scrollable-y .el-table__body-wrapper > .ps__rail-y {
        display: block !important;
        background-color: transparent !important;
    }
 * @param {HTMLElement} el - 必填。dom元素
 */
const el_scrollBar = (el) => {
    //在元素上加点私货，名字随便取，确保不会和已有属性重复即可，我取名叫做_ps_
    if (el._ps_ instanceof PerfectScrollbar) {
        el._ps_.update();
    } else {
        //el上挂一份属性
        el._ps_ = new PerfectScrollbar(el, { suppressScrollX: false }); //suppressScrollX: false 不禁用x轴滚动
    }
};
//接着，自定义Vue指令,指令名你自己随便编一个，我们假定它叫scrollBar
Vue.directive("scrollBar", {
    //使用inserted钩子函数（初次创建dom）获取使用自定义指令处的dom
    inserted(el, binding, vnode) {
        vnode.context.$nextTick(
            () => {
                const { value } = binding;
                if(value === "table"){
                    el = el.querySelector(".el-table__body-wrapper");
                    if(!el){
                        return console.warn("未发现className为el-table__body-wrapper的dom");
                    }else{
                        el.classList.add("ps");
                    }
                    
                }
                console.log(el)
                //判断其样式是否存在position 并且position为"fixed", "absolute"或"relative"
                //如果不符合条件，抛个错误。当然你也可以抛个警告然顺便给其position自动加上"relative"
                //为什么要这么做呢，因为PerfectScrollbar实现原理就是对dom注入两个div，一个是x轴一个是y轴，他们两的position都是absolute。
                //对css稍有常识的人都知道，absolute是相对于所有父节点里设置了position属性的最近的一个节点来定位的，为了能够正确定位，我们要给其设置position属性
                const rules = ["fixed", "absolute", "relative"];
                if (!rules.includes(window.getComputedStyle(el, null).position)) {
                    el.style.position="relative";
                    console.log(el)
                // console.error(`perfect-scrollbar所在的容器的position属性必须是以下之一：${rules.join("、")}`)
                }
                el_scrollBar(el);//el上挂一份属性
            }
        )
    },
    //更新dom的时候
    componentUpdated(el, binding, vnode) {
        const { value } = binding;
        if (value === "table") {
            el = el.querySelector(".el-table__body-wrapper");
            if(!el){
                return console.warn("未发现className为el-table__body-wrapper的dom");
            }else{
                el.classList.add("ps");
            }
        }
        vnode.context.$nextTick(
            () => {
                try {
                    el_scrollBar(el);
                } catch (error) {
                    console.error(error);
                }
            }
        )
    },
})