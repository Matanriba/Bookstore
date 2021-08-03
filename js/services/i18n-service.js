'use strict'

var gCurrLang = 'en';

var gTrans = {
    header: {
        en: 'Welcome to my Book Shop',
        he: 'ברוכים הבאים לחנות הספרים שלי'
    },
    'add-book': {
        en: 'Add book',
        he: 'הוספת ספר'
    },
    title: {
        en: 'Title',
        he: 'כותרת'
    },
    price: {
        en: 'Price',
        he: 'מחיר'
    },
    actions: {
        en: 'Actions',
        he: 'פעולות'
    },
    'read-btn': {
        en: 'Read',
        he: 'קרא'
    },
    'update-btn': {
        en: 'Update',
        he: 'עדכן'
    },
    'delete-btn': {
        en: 'Delete',
        he: 'מחק'
    },
    'modal-title': {
        en: 'Book Title',
        he: 'כותרת'
    },
    'modal-price': {
        en: 'Book Price',
        he: 'מחיר'
    },
    'modal-add-btn': {
        en: 'Add',
        he: 'הוסף'
    },
    'modal-close-btn': {
        en: 'Close',
        he: 'סגור'
    },
    'modal-update-btn': {
        en: 'Update',
        he: 'עדכן'
    },
    'modal-update': {
        en: 'Update Price',
        he: 'עדכן מחיר'
    },
    'modal-details': {
        en: 'Book Details',
        he: 'פרטים נוספים'
    },
    'modal-rating': {
        en: 'Book Rating',
        he: 'דירוג'
    },


}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'

    // Get transTxt according to the key translated and current language
    var transTxt = keyTrans[gCurrLang]

    // Use english as default if no translation is found in key map
    if (!transTxt) transTxt = keyTrans['en']

    return transTxt;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')

    els.forEach(function (el) {
        var txt = getTrans(el.dataset.trans)
        if (el.nodeName === 'INPUT') el.setAttribute('placeholder', txt)
        else el.innerText = txt;
    })
}



function setLang(lang) {
    gCurrLang = lang;
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}