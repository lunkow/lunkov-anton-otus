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


// const inputData = [ ["a", "b"], ["a", "c"], ["d", "e"] ]; // Example 1
// const inputData = [ ["q", "w", 'a'], ["a", "b"], ["a", "c"], ["q", "e"], ["q", "r"], ]; // Example 2
const inputData = [ ["a", "b"], ["a", "c"], ["q", "e"], ["q", "r"], ["q", "w", 'a'], ] // Example 2.1
// const inputData = [ ['e', 'b'], ['a', 'c'], ['d', 'a'], ['e', 'f'] ]; // Example 3 - 2 ассоциации равной длины

console.log('\nМаксимальный список рекомендаций:\n' + maxItemAssociation(inputData) + '\n');

function maxItemAssociation(data) {
    console.log('Исходные данные:');
    console.log(data);
    console.log('\n');

    let associationsList = [];

    if (!data || !Array.isArray(data)) {
        console.log('Incorrect input');
    } else {

        for (buyingNumber in data) {
            let productList = data[buyingNumber];
            console.log(`[${buyingNumber}] Текущий список покупок: ${productList}`);
            fillAssociations(associationsList, productList);
            console.log('-------');
        }

    }

    console.log(`\nИтоговый список ассоциаций`);
    console.log(associationsList);

    return findMaxAssociation(associationsList);

    function fillAssociations(associationsList, productsList) {

        if ( !associationsList.length ) {
            // console.log('Empty assotiations');
            associationsList.push(productsList);
        }
        else {

            for (currentProduct in productsList) {
                mergeMatch(productsList, associationsList); 
                console.log('\tТекущий список ассоциаций:');
                console.log(associationsList);
            }
        }
    }

    function mergeMatch(products, associations) {
        let isNewAssociation = false;
        for (productNumber in products) {
            for (associationNumber in associations) {
                console.log(`\t\tСравниваем ${products} и ${associations[associationNumber]}`);

                if ( associations[associationNumber].indexOf(products[productNumber]) > -1 ) {
                    console.log('\t\tСовпадение найдено!');
                    console.log('\t\tЗАМЕНИТЬ: ' + associations[associationNumber]);
                    console.log('\t\tНА: ' + mergeLists(products, associations[associationNumber]));

                    associations[associationNumber] = mergeLists(products, associations[associationNumber]);
                    return true;
                } else {
                    console.log('\t\tСовпадение не найдено!');
                    console.log('\t\tЭто новая ассоциация!');
                    isNewAssociation = true;
                    continue;
                }

            }
        }
        if (isNewAssociation) {
            associations.push(products);
        }
    }

    function mergeLists (list1, list2) {
        let mergedList = [...new Set([...list1, ...list2])]; // https://vc.ru/dev/89555-javascript-massivy-peresechenie-raznost-i-obedinenie-v-es6
        return mergedList.sort();
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
}