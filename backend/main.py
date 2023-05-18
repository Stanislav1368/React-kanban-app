from flask import Flask, jsonify, request

app = Flask(__name__)


tasks = [{"id": 1, "title": 'Task 1', "description": "someone desc", "status": 'Сделать', "responser": "Jacky"},
         {"id": 2, "title": 'Task 2', "description": "someone desc", "status": 'В процессе', "responser": "Sam"},
         {"id": 3, "title": 'Task 3', "description": "someone desc", "status": 'Тестирование', "responser": "Knyaz"},
         {"id": 4, "title": 'Task 4', "description": "someone desc", "status": 'Готово', "responser": "Artem"},
         {"id": 5, "title": 'Task 5', "description": "someone desc", "status": 'Сделать', "responser": "Meljnik"}]


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
