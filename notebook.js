let days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
];
const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
    "Июля", "Aвгуста", "Сентября", "Октября", "Ноября", "Деккабря"
];
const notebook = JSON.parse(goodsList);
let goods = notebook.filter(function( obj ) {
    return obj.categories == "notebook";
});
let content = document.querySelector('.main-content');
let pagination = document.querySelector('#pagination');
let notesOnPage = 4;
let countOfItems = Math.ceil(goods.length / notesOnPage);
let showPage = (function() {
    let active;
    return function(item) {
        if (active) {
            active.classList.remove('active');
        }
        active = item;
        item.classList.add('active');
        let pageNum = +item.innerHTML;
        let start = (pageNum - 1) * notesOnPage;
        let end = start + notesOnPage;
        let notes = goods.slice(start, end);
        content.innerHTML = '';
        for (let note of notes) {
            let div = document.createElement("div");
            div.className = "goodClass";
            content.appendChild(div);
            let img = document.createElement("img");
            img.src = note.link;
            div.appendChild(img);
            let div_info = document.createElement("div");
            div_info.className = "main-content-info";
            div_info.innerHTML=note.title;
            div.appendChild(div_info);
            let price = document.createElement("div");
            price.className = "main-content-price";
            price.innerHTML= "ЦЕНА" + ' ' + note.price;
            div.appendChild(price);
            createCell(note.date, div);
            let button = document.createElement('button');
            button.className = "main-content-button";
            button.textContent = 'Купить';
            button.setAttribute('type', 'button');
            button.setAttribute('onclick', 'openForm()')
            div.appendChild(button);
        }
    };
}());
let items = [];
for (let i = 1; i <= countOfItems; i++) {
    let li = document.createElement('li');
    li.innerHTML = i;
    pagination.appendChild(li);
    items.push(li);
}
showPage(items[0]);
for (let item of items) {
    item.addEventListener('click', function() {
        showPage(this);
    });
}
function createCell(text, div) {
    let div_date = document.createElement("div");
    div_date.className = "main-content-date";
    let  json_date = text;
    let div_data = json_date.split('-');
    let date_format = new Date(div_data[0], div_data[1] - 1, div_data[2]);
    let n = date_format.getDay();
    function weekAndDay(date) {
        return [Math.floor(date.getDate() / 7)] ;
    }
    last_week=weekAndDay(date_format);
    let month = monthNames[date_format.getMonth()];
    console.log(month);
    let year = date_format.getFullYear();
    console.log(year);
    div_date.innerHTML ="Дата добавления на сайт" + ' ' + days[n] + ' ' + last_week + ' ' +  "неделя" + ' '  + month + ' ' + ' ' +  year + ' ' + "года";
    div.appendChild(div_date);
}
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
document.querySelector('.btn').addEventListener('click', buyGoods )
function buyGoogs(){
    alert ("Покупка совершена");
}
function checkbox(){
    let checkbox = document.getElementById('background');
    let body = document.getElementsByTagName('body')[0];
    if(checkbox.checked === true){
        body.style.backgroundColor = "#87CEFA";
        body.style.color = "black";
    }else{
        body.style.backgroundColor = "#00008B";
        body.style.color = "white";
    }
}