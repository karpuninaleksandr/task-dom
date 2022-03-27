/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    const withContent = document.body;
    for (let i = 0; i < count; ++i) {
        withContent.insertAdjacentHTML(
            'afterbegin',
            '<' + tag + '>' + content + '</' + tag + '>',
        );
    }
    return withContent;
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    function createTree(Node, ChildrenCount, Level) {
        if (Level === 0) {
            return;
        }
        for (let i = 0; i < ChildrenCount; ++i) {
            Node.insertAdjacentHTML(
                'beforeend',
                '<div class="item_' + (level - Level + 1) + '"></div>',
            );
        }
        if (Level === 1) {
            return;
        }
        let flex = Node.getElementsByTagName('div');
        for (let i = 0; i < ChildrenCount; ++i) {
            createTree(flex[i * (ChildrenCount + 1)], ChildrenCount, Level - 1);
        }
    }
    if (level > 0) {
        document.body.insertAdjacentHTML(
            'beforeend',
            '<div class="item_1"></div>',
        );
        const node = document.body.getElementsByTagName('div')[0];
        createTree(node, childrenCount, level - 1);
    }
    return document.body.firstChild;
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    generateTree(2, 3);
    let arr = document.body.querySelectorAll('.item_2');
    for (let i = 0; i < 2; ++i) {
        let res = document.createElement('section');
        //res = document.getElementsByTagName('section');
        res.innerHTML = arr[i].innerHTML;
        res.className = 'item_2';
        arr[i].replaceWith(res);
    }
    //arr.replaceChildren(res, 'item_2')
    return document.body.firstChild;
}
