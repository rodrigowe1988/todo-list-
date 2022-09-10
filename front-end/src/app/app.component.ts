import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];

  form: FormGroup = new FormGroup({
    description: new FormControl(''),
  });
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {
    this.todoService.listar().subscribe((todoList) => (this.todos = todoList));
  }

  submit() {
    console.log(this.form.value);
    const todo: Todo = { ...this.form.value };
    this.todoService.salvar(todo).subscribe((savedTodo) => {
      this.todos.push(savedTodo);
      this.form.reset();
    });
  }

  delete(todo: Todo) {
    this.todoService.deletar(todo.id!).subscribe({
      next: (response) => this.listarTodos(),
    });
  }

  update(todo: Todo) {
    const teste = this.todoService.atualizar(todo.id!, todo);
    console.log(todo, teste);
  }
}
