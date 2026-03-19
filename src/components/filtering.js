import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор

const compare = createComparison(defaultRules);

export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }))
        })
    }

    const applyFiltering = (query, state, action) => {
        // код с обработкой очистки поля

        if (action) switch(action.name) {
            case 'clear':
            const inp = document.querySelector(`input[name="${action.dataset.field}"]`)
            inp.value = ''
            state[action.dataset.field] = ''; break;
        }

        // @todo: #4.5 — отфильтровать данные, используя компаратор
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) { // ищем поля ввода в фильтре с непустыми данными
                    filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
                }
            }
        })

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query; // если в фильтре что-то добавилось, применим к запросу
    }

    return {
        updateIndexes,
        applyFiltering
    }
}

/* export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {                        // используйте name как значение и текстовое содержимое
                        const option = document.createElement('option');    // Создаём элемент option
                        option.value = name;                                 // Устанавливаем значение атрибута value
                        option.textContent = name;                          // Устанавливаем текстовое содержимое
                        return option;                                      // Возвращаем созданный элемент
                        })
        )
     })

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля

        if (action) switch(action.name) {
            case 'clear':
            const inp = document.querySelector(`input[name="${action.dataset.field}"]`)
            inp.value = ''
            state[action.dataset.field] = ''; break;
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state)).filter(row => totalFilter (row.total, state.totalFrom, state.totalTo));
    }
}

function totalFilter (total, totalFrom, totalTo) {

    if (total <= totalFrom && totalFrom != ""){
        return false
    }
    if (total >= totalTo && totalTo!= ""){
        return false
    }
    return true
} */