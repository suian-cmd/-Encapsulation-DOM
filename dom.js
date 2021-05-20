//window.dom 是我们提供的全局变量
window.dom = {
//增：
//dom.create('<div>hi</div>')  用于创建节点，并返回创建的节点
    create(string) {
        const container = document.createElement('template')
        container.innerHTML = string.trim()
        return container.content.firstChild
    },
//dom.after(node,node2)  在node节点后添加node2节点
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling)   //在node的下一个节点前插入node2
    },
//dom.before(node, node2)  在node节点前添加node2节点
    before(node, node2){
        node.parentNode.insertBefore(node2, node)
    },
//dom.append(parent, child)  在parent内添加孩子节点，在最后追加
    append(parent, child){
        parent.appendChild(child)
    },
//dom.wrap(node, parent)   用parent节点包裹node节点
    wrap(node, parent){
        dom.before(node, parent)   //在node节点前插入parent节点
        dom.append(parent, node)   //将node节点（原node 节点转移）插入parent节点内
    },
//删：
//dom.remove(node)  用于删除node节点，并返回node
    remove(node){
        node.parentNode.removeChild(node)
        return node
    },
//dom.empty(node)  清空node内所有节点，并返回一个由被清除节点组成的数组
    empty(node){
        const array = []
        let x = node.firstChild
        while(x){
            array.push(dom.remove(node.firstChild))
            x = node.firstChild    // HTML树实时更新，删除firstChild节点后，原本第二个节点就成了firstChild节点
        }
        return array
    },
//改：
//dom.attr(node, 'title', ?) 用于读写属性
    attr(node, name, value){
        if(arguments.length === 3){
            node.setAttribute(name, value)
        }else if(arguments.length === 2){
            return node.getAttribute(name)
        }
    },
//dom.text(node, ?)  用于读写文本内容
    text(node, string){
        if(arguments.length === 2){
            if('innerText' in node){
                node.innerText = string   //某些浏览器不兼容innerText
            }else{
                node.textContent = string
            }
        }else if(arguments.length === 1){
            if('innerText' in node){
                return node.innerText
            }else{
                return node.textContent
            }
        }
    },
//dom.html(node, ?)  用于读写HTML内容
    html(node, string){
        if(arguments.length === 2){
            node.innerHTML = string
        }else if(arguments === 1){
            return node.innerHTML
        }
    },
//dom.style(node, {color: 'red'})  用于读写style
    style(node, name, value){
        if(arguments.length === 3){
            //dom.style(div, 'color', 'red') 用于设置style某一个属性
            node.style[name] = value
        }else if(arguments.length === 2){
            if(typeof name === 'string'){
                // dom.style(div, 'color')  用于获取style 的某一个属性
                return node.style[name]
            }else if(name instanceof Object){
                //dom.style(div, {width : 100px, height : 100px})
                for(let key in name){
                    node.style[key] = name[key]
                }
            }
        }
    },
//dom.class.add(node, 'red') 用于添加class属性值
    class: {
        add(node, className){
            node.classList.add(className)
        },
//dom.class.remove(node, 'red') 用于删除class属性值
        remove(node, className){
            node.classList.remove(className)
        },
//dom.class.has(node, 'red')   查看class内是否包含 red 
        has(node, className){
            return node.classList.contains(className)
        }
    },
//dom.on(node, 'click', fn) 用于添加事件监听
    on(node, eventName, fn){
        node.addEventListener(eventName, fn)
    },
//dom.off(node, 'click', fn) 用于删除事件监听
    off(node, eventName, fn){
        node.removeEventListener(eventName, fn)
    },
//查：
//dom.find('选择器',scope)  用于获取scope区域内符合条件的标签，若不存scope则默认是从document查询符合条件的标签
    find(selector, scope){
        return (scope || document).querySelectorAll(selector)
    },
//dom.parent(node)  用于获取父元素
    parent(node){
        return node.parentNode
    },
//dom.children(node)  用于获取子元素
    children(node){
        return node.children
    },
//dom.siblings(node)  用于获取兄弟姐妹元素
    siblings(node){
        //node.parentNode.children返回的是伪数组，Array.from()转为数组，使用filter函数
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },
//dom.next(node)  用于获取该节点的下一节点
    next(node){
        let x = node.nextSibling
        while(x && x.nodeType === 3){   //文本节点nodeType为3，标签节点为1
            x = x.nextSibling
        }
        return x
    },
//dom.previous(node)  用于获取该节点的上一节点
    previous(node){
        let x = node.previousSibling
        while(x && x.nodeType === 3){
            x = x.previousSibling
        }
        return x
    },
//dom.each(nodes, fn) 用于遍历所有节点
    each(nodeList, fn){
        for(let i = 0; i < nodeList; i++){
            fn.call(null, nodeList[i])
        }
    },
//dom.index(node)  用于获取该节点在父节点内的排行第几
    index(node){
        const list = dom.children(node.parentNode)  //获取node节点的父节点内的所有孩子节点
        let i ;
        for(i = 0; i < list.length; i++){
            if(list[i] === node){
                break
            }
        }
        return i
    }
};