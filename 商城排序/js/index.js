let header = document.getElementById('header'),
    linkList = header.getElementsByTagName('a'),
    list = document.getElementById('list'),
    li = list.getElementsByTagName('li');


let data = null;
let xhr = new XMLHttpRequest();
xhr.open('get', 'json/product.json', false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && 200) {
        data = JSON.parse(xhr.responseText)
    }

}
xhr.send();


function giveHTML(data) {
    var str = '';
    for (let i = 0; i < data.length; i++) {
        let {
            time,
            price,
            title,
            hot,
            img
        } = data[i];
        str += `<li price='${price}' time='${time}' hot='${hot}'><a href="javascript:;" >
        <img src="${img}" alt="">
        <p>${title}</p>
        <span>￥${price}</span>
    </a></li>`
    }
    list.innerHTML = str;

}
giveHTML(data);

function sortList(product) {
    var ary = [].slice.call(li)
    let {
        index,
        flag
    } = product;
    ary.sort(function (a, b) {
        let ary2 = ['time', 'price', 'hot'];
        a = a.getAttribute(ary2[index]);
        b = b.getAttribute(ary2[index]);
        if (index === 0) {
            a = a.replace(/-/g, '');
            b = b.replace(/-/g, '')
        }
        return (a - b) * flag
    })
    var frag = document.createDocumentFragment();
    ary.forEach(element => {
        frag.appendChild(element)
    });
    list.appendChild(frag);
    frag = null
}

for (let i = 0; i < linkList.length; i++) {
    var cur = linkList[i];
    cur.index = i;
    cur.flag = -1;
    cur.onclick = function () {
        for (let j = 0; j < linkList.length; j++) {
            if (!(linkList[j] === this)) {
                linkList[j].flag = -1
            }
        }
        this.flag *= -1;
        sortList(this)
    }
}