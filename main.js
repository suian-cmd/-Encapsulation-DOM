const div = dom.create('<div>newDiv</div>')
console.log(div)

dom.after(test, div);

const div3 = dom.create('<div id="parent"></div>')
dom.wrap(test, div3)

const nodes = dom.empty(window.empty)   // window.id可以直接获取该标签
console.log(nodes)

dom.attr(test, 'title', 'Hello World')
const title = dom.attr(test, 'title')
console.log(`title : ${title}`)

dom.text(test, '你好 hello world')
console.log(dom.text(test))

dom.style(test, {border: '1px solid red', color: 'blue'})
console.log(dom.style(test, 'border'))
dom.style(test, 'color', 'red')

dom.class.add(test2, 'red')
dom.class.add(test2, 'blue')
dom.class.remove(test2, 'blue')
console.log(dom.class.has(test2,'blue'))

const fn = () => {
    console.log('点击了')
}
dom.on(test, 'click', fn)
dom.off(test, 'click', fn)

const testDiv = dom.find('#test')[0]
console.log(testDiv)
const test2Div = dom.find('#test2')[0]
console.log(dom.find('.red', test2Div)[0])
console.log(dom.find('#test2>.red')[0])

console.log(dom.parent(test))

const s2 = dom.find('#s2')[0]
console.log(dom.siblings(s2))
console.log(dom.next(s2))
console.log(dom.previous(s2))

const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'blue'))

console.log(dom.index(s2))

