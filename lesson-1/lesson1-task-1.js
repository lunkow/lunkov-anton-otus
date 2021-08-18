/**
 ** Задача про список рекомендаций maxItemAssociation
 * Цель:
 * Написать алгоритм для нахождения максимального списка рекомендаций.
 * Это задание является достаточно сложным, однако может быть интересно тем, кто хочет попробовать свои силы с реальными примерами из реальных собеседований.
 * Если вы хотите попробовать решить менее сложную задачу, внизу можно найти задание 2. Решение любого из заданий достаточно для зачета этого ДЗ.
 * 
 * Задание 1.
 * Написать функцию maxItemAssociation(), получающую исторические данные покупок пользователей и возвращающую максимальный список рекомендаций.
 * Входные данные - массив исторических покупок пользователей [["a", "b"], ["a", "c"], ["d", "e"]]. То есть пользователь 1 купил "a" и "b".
 * Пользователь 2 купил продукты "a", "c". Пользователь 3 купил продукты "d", "e". Надо найти максимальную группу рекомендаций.
 * Группа рекомендаций - это продукты, которые был куплены другими пользователями при условии, если они пересекаются с исходным списком.
 * Если количество рекомендаций в группах одинаковое - вернуть первую группу, из отсортированных в лексикографическом порядке.
 * 
 * Решение: Группа рекомендаций 1 - ["a", "b", "c"]. Покупка "a" содержится в списке 2, поэтому весь список 2 может быть добавлен в рекомендации. Группа рекомендаций 2 - ["d", "e"].
 * Ответ: ["a", "b", "c"].
 * 
 * Пример 2:
 * Входные данные: [ ["q", "w", 'a'], ["a", "b"], ["a", "c"], ["q", "e"], ["q", "r"], ]
 * Ответ ["a", "b", "c", "e", "q", "r", "w"] - это максимальная по пересечениям группа. Можно видеть, что первый массив пересекается со всеми остальными, и потому результат является всем множеством значений.
*/ 


const inputData = [ ["a", "b"], ["a", "c"], ["d", "e"] ]; // Example 1
// const inputData = [ ["a", "b"], ["a", "c"], ["d", "e"], ["a", "d"] ]; // Example 1.1
// const inputData = [ ["q", "w", 'a'], ["a", "b"], ["a", "c"], ["q", "e"], ["q", "r"], ]; // Example 2
// const inputData = [ ["a", "b"], ["a", "c"], ["q", "e"], ["q", "r"], ["q", "w", 'a'], ] // Example 2.1
// const inputData = [ ["a", "b"], ["a", "c"], ["q", "e"], ["q", "r"], ] // Example 2.2
// const inputData = [ ['e', 'b'], ['a', 'c'], ['d', 'a'], ['e', 'f'] ]; // Example 3 - 2 ассоциации равной длины
// const inputData = [ ['e', 'b'], ['k', 'g'], ['a', 'c'], ['d', 'a'], ['e', 'f'], ['m', 'c'] ]; // Example 4 - 3 ассоциации



console.log( maxItemAssociation(inputData.slice()) );


function maxItemAssociation(data) {
    let associations = [];
    associations.push(data[0]);

    for (let k = 0; k < associations.length; k++) {
        // проверить, возможно, текущая ассоциация была добавлена на предыдущем шаге и, возможно она входит в одну из ассоциаций,
        // которые уже были уточнены ( в processAssociation() )
        if (checkOnCopyAndDelete(k, associations) == -1) {
            //deleted
            k--;
        } else {
            // ok
        }
        
        let assotiation = associations[k];
        associations[k] =  processAssoсiation(data, assotiation, associations);
    }

    return findMaxAssociation(associations);


    function processAssoсiation(data, associationCurrent, associationsAll) {
        
        for (let i = 0; i < data.length; i++) {

            dataItem = data[i];
            // элемент из ДАТА и ассоциация
            // если есть пересечения = дополняем ассоциацию
            let intersection = dataItem.filter(x => associationCurrent.includes(x));
    
            if (intersection.length > 0 && dataItem.toString() != associationCurrent.toString()) {
                // если пересечение есть и чек не равен ассоциации полностью - дополняем текущую ассоциацию
                let associationAndDataItem = [...new Set([...associationCurrent, ...dataItem])];
                
                if (associationCurrent.toString() == associationAndDataItem.toString()) {
                    // если текущий чек(dataItem) - является подмножеством ассоциации (содержит уже известные товары) -- идём дальше
                } else {
                    // иначе (если множества не совпадают, т.е. имеются новые элементы) дополняем текущую ассоциацию и заново идём по чекам с новой ассоциацией
                    associationCurrent = mergeLists(dataItem, associationCurrent);
                    i = -1; // т.к. ассоциация измениласть - заново проходимся по DATA (в конце блока цикл сделает ++)
                }
            } else if (intersection.toString() == associationCurrent.toString()) {
                // если пересечение ассоциации-и-чека с текущей ассоциацией полностью совпадают -- идём дальше
            } else {
                // если пересечения нет - возможно, это новая ассоциация
                if ( checkOnNewAssociation(dataItem, associationsAll) ) {
                    // проверим, входят ли все товары из чека в какую-нибудь ассоциацию вместе
                    associationsAll.push(dataItem);
                } else {
                    // не новая ассоциация
                }
            }
        }
        //
        return associationCurrent;
    }
}



function mergeLists(list1, list2) {
    let mergedList = [...new Set([...list1, ...list2])]; // https://vc.ru/dev/89555-javascript-massivy-peresechenie-raznost-i-obedinenie-v-es6
    return mergedList.sort();
}

function checkOnCopyAndDelete( currentAssociationIndex,  associationsList) {
    let currentAssociation = associationsList[currentAssociationIndex];
    let isSomethingWasDeleted = 1;
    for (let i = 0; i < associationsList.length; i++) {

        let newItemsAndAssociation = [...new Set([...currentAssociation, ...associationsList[i]])];

        if ( associationsList[i].length == newItemsAndAssociation.length ) {
            // элементы полностью есть в текущей ассоциации - это не новая ассоциация.
            // delete current association from associationList
            if (i != currentAssociationIndex) {
                associationsList.splice(currentAssociationIndex, 1);
                isSomethingWasDeleted = -1;
            } else {
                // не удалять текущий экземпляр
            }
        } else {
            //ok
        }
    }
    return isSomethingWasDeleted;
}

function checkOnNewAssociation( newItems, associationsList) {
    // true - новая ассоциация
    // false - не новая ассоциация

    for (let i = 0; i < associationsList.length; i++) {

        let newItemsAndAssociation = [...new Set([...newItems, ...associationsList[i]])];

        if ( associationsList[i].length == newItemsAndAssociation.length ) {
            // элементы полностью есть в текущей ассоциации - это не новая ассоциация. Возвращаем false
            return false;

        } else if (newItemsAndAssociation.length > associationsList[i].length) {
            // newItemsAndAssociation не может быть меньше текущей ассоциации - только больше - значит идём к следующей ассоциации'
            //ok
        }
    }
    // если, пройдясь по всем ассоциациям - newItems полностью не входят ни в одну - значит это новая ассоциация
    return true;
}


function findMaxAssociation(associationsList) {

    if (!associationsList && !Array.isArray(associationsList)) {
        return false;
    } else {
        let maxAssociation = associationsList[0];

        for( associationNumber in associationsList) {
            if (associationsList[associationNumber].length > maxAssociation.length) {
                maxAssociation = associationsList[associationNumber];
            } else if (associationsList[associationNumber].length == maxAssociation.length) {
                // если рекомендации равной длины - выбираем за максимальную ту, у которой первый элемент раньше по алфавиту
                if (associationsList[associationNumber][0] < maxAssociation[0]) {
                    maxAssociation = associationsList[associationNumber];
                }
            }
        }
        return maxAssociation;
    }
}