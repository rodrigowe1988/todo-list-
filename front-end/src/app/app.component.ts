import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private todoService: TodoService) {}

  form: FormGroup = new FormGroup({
    description: new FormControl(''),
  });

  submit() {
    console.log(this.form.value);
    const todo: Todo = { ...this.form.value };
    this.todoService
      .salvar(todo)
      .subscribe((savedTodo) => console.log(savedTodo));
  }
}
