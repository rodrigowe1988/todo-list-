package com.example.demo.rest;

import com.example.demo.model.Todo;
import com.example.demo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin("http://localhost:4200")
public class TodoController {

    @Autowired
    private TodoRepository repository;

    @PostMapping
    public Todo save(@RequestBody Todo todo) {
        return repository.save(todo);
    }

    @GetMapping
    public List<Todo> getAll() {
        return repository.findAll();
    }

    @GetMapping("{id}")
    public Todo getById(@PathVariable  Long id) {
        return repository
                .findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PutMapping("{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todoDetails) {
        Todo updateTodo = repository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));

        updateTodo.setDescription(todoDetails.getDescription());

        repository.save(updateTodo);

        return ResponseEntity.ok(updateTodo);
    }

}
