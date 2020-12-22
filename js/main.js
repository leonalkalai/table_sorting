"use strict";

function getData() {
    fetch('js/employees.json')
    .then(res=>res.json())
    .then(data => { 
        creatTable(data)    
    })
    .then(()=> {$("th").trigger("click");})
    .catch(err=>info.innerHTML = err)
}

let clicked = true;
function changeSorting (data) {
    $("th").on("click", function(){
           document.querySelector("#tbody").innerHTML = "";
           document.querySelector("#thead").innerHTML = "";
           $(this).find('span').remove();
           let sortingKey = $(this).html().slice(4).toLowerCase(); 
        if (clicked) {
            data = data.sort((a,b)=>(a[sortingKey] < b[sortingKey]) ? 1 : -1);   
            creatTable(data) 
            addsortdesc();
            clicked = false;
        }
        else {
            data = data.sort((a,b)=>(a[sortingKey] > b[sortingKey]) ? 1 : -1);   
            creatTable(data)
            addsortasc();
            clicked = false;
            clicked = true;
        }
    });    
}

function createheaders(data){
    let row = document.createElement('tr');
    let AA = document.createElement('th');
    AA.innerText = ("AA");
    row.appendChild(AA);
    for(let key in data[0]){
        let th = document.createElement('th');
        th.style.cursor = "pointer";
        th.classList.add('table-light');
        th.innerHTML = (key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()); 
        row.appendChild(th); 
    }
    document.querySelector('#thead').appendChild(row);
}

function createrows(data){
    let counter = 0;
    for(let employee of data){
        counter++;
        let row = document.createElement('tr');
        let a = document.createElement('td');
        a.innerText = counter;
        row.appendChild(a);
        for (let key in employee){
            let cell = document.createElement('td');
            cell.innerText = employee[key];
            row.appendChild(cell); 
        }
        document.querySelector('#tbody').appendChild(row);
    } 
}

let creatTable = (data) => {
    createheaders(data);
    createrows(data);
    addlight();
    changeSorting(data)
} 

$(document).ready(function() {
    getData();
});

function addsort(){
    $('th').each(function() { 
        $(this).html($(this).html()+'<span>↕️</span>');
    });
}
function addsortasc(){
    $('th').not("#thead > tr > th:nth-child(1)").each(function() { 
       $(this).html("Asc_"+$(this).html()+'<span>↕️</span>');
       $(this).find('span').removeClass().addClass("white");
    });
}
function addsortdesc(){
    $('th').not("#thead > tr > th:nth-child(1)").each(function() { 
        $(this).html("Des_"+$(this).html()+'<span>↕️</span>');
        $(this).find('span').removeClass().addClass("black");
    });  
}

let addlight = () => {
    $('#tbody > tr > td:nth-child(1)').each(function() { 
        $(this).addClass("table-light");
     });
};