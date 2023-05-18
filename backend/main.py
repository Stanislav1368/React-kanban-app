from flask import Flask, jsonify, request

app = Flask(__name__)


tasks = [{"id": 1, "title": "Составление таблицы рисков проекта 'Мир покупок'", "description": "Необходимо проанализировать потенциальные риски и заполнить таблицу", "status": "Сделать", "responser": "Аналитик"},
         {"id": 2, "title": "Утверждение ТЗ с заказчиком по проекту 'Мир покупок'", "description": "Необходимо обсудить детали проекта с заказчиком и утвердить ТЗ", "status": "В процессе", "responser": "Менеджер проекта"},
         {"id": 3, "title": "Проведение пресейла проекта 'Вкусно и запятая'", "description": "Необходимо подготовить информацию, презентацию и провести пресейл", "status": "Тестирование", "responser": "Директор по продажам"},
         {"id": 4, "title": "Закрытие вакансии 'Маркетолог'", "description": "Необходимо подобрать соответствующего кандидата на вакансию", "status": "Готово", "responser": "HR-специалист"},
         {"id": 5, "title": "Создание адаптивной страницы company.php проекта 'Альянc'", "description": "Необходимо адаптировать страницу для различных устройств", "status": "Сделать", "responser": "Frontend-разработчик"},
         {"id": 6, "title": "Создание формы обратной связи проекта 'Альянс'", "description": "Необходимо создать форму для обратной связи пользователей с сайтом", "status": "Сделать", "responser": "Backend-разработчик"},
         {"id": 7, "title": "Создание компонента Битрикса вывода одного товара на экран проекта 'Альянс'", "description": "Необходимо создать компонент для вывода информации о товаре", "status": "В процессе", "responser": "Backend-разработчик"},
         {"id": 8, "title": "Отрисовка дизайна макета главной страницы проекта 'Миа'", "description": "Необходимо разработать визуальный дизайн для главной страницы", "status": "Сделать", "responser": "Дизайнер"},
         {"id": 9, "title": "Отрисовка логотипа для проекта 'Альянс'", "description": "Необходимо разработать уникальный логотип для проекта", "status": "Готово", "responser": "Дизайнер"},
         {"id": 10, "title": "Согласование дополнительного соглашения в связи с изменениями функционала интернет-магазина 'Тор'", "description": "Необходимо обговорить и принять изменения в функционале магазина с заказчиком", "status": "В процессе", "responser": "Менеджер проекта"},
         {"id": 11, "title": "Создание анимации для кнопки входа в личный магазин проекта 'Top'", "description": "Необходимо создать анимированную кнопку для входа в личный магазин", "status": "Сделать", "responser": "Frontend-разработчик"},
         {"id": 12, "title": "Создание слайдера на главной странице проекта 'Top'", "description": "Необходимо разработать слайдер для отображения акций и новостей проекта", "status": "Сделать", "responser": "Frontend-разработчик"},
         {"id": 13, "title": "Реализация запросов к базе данных, в которых выводится вся информация о клиентах проекта 'Альянс'", "description": "Необходимо написать запросы для вывода информации о клиентах из базы данных", "status": "В процессе", "responser": "Backend-разработчик"},
         {"id": 14, "title": "Исправление ошибки ввода данных с формы регистрации проекта 'Альянс'", "description": "Необходимо исправить ошибку при сохранении логинов в базе данных", "status": "Сделать", "responser": "Backend-разработчик"},
         {"id": 15, "title": "Отрисовка макета главной страницы проекта 'Мир покупок'", "description": "Необходимо разработать визуальный дизайн для главной страницы проекта", "status": "Тестирование", "responser": "Дизайнер"},
         {"id": 16, "title": "Проведение анализа данных компаний 'Вкусно и запятая'", "description": "Необходимо проанализировать данные компаний-конкурентов", "status": "Сделать", "responser": "Аналитик"},
         {"id": 17, "title": "Описание use cases проекта 'Вкусно и запятая'", "description": "Необходимо описать случаи использования проекта для разных категорий пользователей", "status": "В процессе", "responser": "Менеджер проекта"}]


@app.route('/tasks/<int:task_id>/status', methods=['PUT'])
def update_task_status(task_id):
    print(tasks)
    data = request.json
    new_status = data.get('status')
    print(data)
    print(new_status)
    for task in tasks:
        if task['id'] == task_id:
            task['status'] = new_status
            print(task)
            return jsonify({'message': 'Task status updated'})

    return jsonify({'message': 'Task not found'}), 404


@app.route('/tasks', methods=["GET", "POST"])
def handle_tasks():
    if request.method == "POST":
        task_data = request.json
        task_data["id"] = max(task["id"] for task in tasks) + 1
        task_data["status"] = 'Сделать'
        tasks.append(task_data)
        return jsonify(task_data), 201
    elif request.method == "GET":
        return jsonify(tasks), 200


@app.route('/tasks/<int:task_id>', methods=["DELETE"])
def delete_task(task_id):
    for i in range(len(tasks)):
        if tasks[i]["id"] == task_id:
            tasks.pop(i)
            return "", 204
    return "Task not found", 404


if __name__ == '__main__':
    app.run(debug=True)
