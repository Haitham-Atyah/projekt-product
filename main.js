// Get elements
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let Total = document.getElementById('Total');
let count = document.getElementById('count');
let category = document.getElementById('category');

let submit = document.getElementById('submit');

let mod = 'create';
let tmp; // لحفظ رقم العنصر أثناء التعديل

// حساب التوتال
function getTotal() {
    if (price.value !== '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        Total.innerHTML = result;
        Total.style.background = '#040';
        Total.style.color = '#fff';
    } else {
        Total.innerHTML = '';
        Total.style.background = '#a00';
    }
}

// تخزين البيانات
let datapro = [];
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
}

// عند الضغط على زر الإنشاء أو التعديل
submit.onclick = function () {
    let newPro = {
        title: title.value.trim().toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: Total.innerHTML,
        count: count.value,
        category: category.value.trim().toLowerCase(),
    };

    // شرط أساسي لتجنب الفراغات
    if (newPro.title !== '' && newPro.price !== '' && newPro.category !== '') {
        if (mod === 'create') {
            datapro.push(newPro); // دائماً إدخال منتج واحد فقط
        } else {
            datapro[tmp] = newPro;
            mod = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }

        localStorage.setItem('product', JSON.stringify(datapro));
        clearData();
        showData();
    }
}

// تفريغ الحقول
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    Total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// عرض البيانات
function showData() {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})">Update</button></td>
                <td><button onclick="deleteData(${i})">Delete</button></td>
            </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if (datapro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${datapro.length})</button>`;
    } else {
        btnDelete.innerHTML = '';
    }
}

// حذف منتج واحد
function deleteData(i) {
    datapro.splice(i, 1);
    localStorage.setItem('product', JSON.stringify(datapro));
    showData();
}

// حذف كل المنتجات
function deleteAll() {
    datapro = [];
    localStorage.removeItem('product');
    showData();
}

// تحديث منتج
function updateData(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal();
    category.value = datapro[i].category;

    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mod = 'update';
    tmp = i;
}

// البحث
let searchMood = 'title';
function SearchMood(id) {
    let search = document.getElementById('search');
    if (id === 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.placeholder = 'Search by ' + searchMood;
    search.focus();
}

function searchData(value) {
    let table = '';
    value = value.toLowerCase();
    if (searchMood === 'title') {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].title.includes(value)) {
                table += renderRow(i);
            }
        }
    } else if (searchMood === 'category') {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].category.includes(value)) {
                table += renderRow(i);
            }
        }
    }

    document.getElementById('tbody').innerHTML = table;
}

// دالة ترجع صف جاهز
function renderRow(i) {
    return `
        <tr>
            <td>${i + 1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updateData(${i})">Update</button></td>
            <td><button onclick="deleteData(${i})">Delete</button></td>
        </tr>
    `;
}

// عرض البيانات عند تحميل الصفحة
showData();
