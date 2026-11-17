import { ConfigurableFocusTrap } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { todoArr } from 'src/app/const/todo';
import { Itodo } from 'src/app/module/interfacetodo';
import { UuidService } from 'src/app/service/uuid.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todosArr=todoArr
  @ViewChild('todoItemRef')
  todoItemRef! : ElementRef<HTMLInputElement>
  @ViewChild('isCompletedRef')
  isCompletedRef!:ElementRef<HTMLInputElement>
  isInEditMode :boolean =false;
  private editId  !: string
  constructor(private _uuidService : UuidService,
              private _snackbar : SnackbarService) {
    
   }

  ngOnInit(): void {
  }
//create
  onTodoAdd(){
    let todo : Itodo={
      todoItem:this.todoItemRef.nativeElement.value,
      todoId:this._uuidService.getUuid(),
      isCompleted:this.isCompletedRef.nativeElement.value === 'yes' ? true :false
    }
    this.todoItemRef.nativeElement.value=''
    this.todosArr.unshift(todo)
    this._snackbar.openSnackbar(`The new todo is added successfully with id ${todo.todoId}`)
  }

//delete
  onTodoRemove(todoId:string){
    let getConformation = confirm(`Are you sure you want to delete this todo item with id ${todoId}`)
    if(getConformation){
      let getIndex = this.todosArr.findIndex(t => t.todoId === todoId)
      this.todosArr.splice(getIndex ,1 )
      this._snackbar.openSnackbar(`The todo item with id ${todoId} is removed successfully`)
    }
  }

  //edit
  onTodoEdit(todo:Itodo){
    this.todoItemRef.nativeElement.value = todo.todoItem;
    this.isCompletedRef.nativeElement.value = todo.isCompleted ? 'yes' :'no';
    this.editId = todo.todoId
    this.isInEditMode = true;
  }
//update
  onTodoUpdate(){
    let updateTodo : Itodo = {
      todoItem:this.todoItemRef.nativeElement.value,
      isCompleted:this.isCompletedRef.nativeElement.value == 'yes' ? true:false,
      todoId:this.editId
    }
    let getIndex = this.todosArr.findIndex(t => t.todoId === this.editId)
    this.todosArr[getIndex]=updateTodo

    this.isInEditMode=false,
    this.todoItemRef.nativeElement.value =''
    this._snackbar.openSnackbar(`The todo with id ${this.editId} is updated successfully. `)
  }
  onChangeCheck(todo : Itodo){
    todo.isCompleted = !todo.isCompleted

    let getIndex = this.todosArr.findIndex(e => e.todoId === todo.todoId)
    this.todosArr[getIndex] = todo
  }
}

