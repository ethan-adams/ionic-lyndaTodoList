import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';
import { TodoProvider } from "../../providers/todo/todo";
import { ArchivedTodosPage } from "../archived-todos/archived-todos"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public todos = [];
  public reorderIsEnabled = false;
  public archivedTodosPage = ArchivedTodosPage

  constructor(private toastController: ToastController, private todoProvider: TodoProvider, public navCtrl: NavController, private alertController: AlertController) {
    this.todos = this.todoProvider.getTodos();
  }

  toggleReorder() {
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered($event) {
    reorderArray(this.todos, $event);
  }

  goToArchivePage() {
    this.navCtrl.push(ArchivedTodosPage);
  }

  archiveTodo(todoIndex) {
    this.todoProvider.archiveTodo(todoIndex);
  }

  editTodo(todoIndex) {
    let editTodoAlert = this.alertController.create({
      title: "Edit a task",
      message: "Edit your task",
      inputs: [
        {
          type: "text",
          value: this.todos[todoIndex],
          name: "editTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Edit task",
          handler: (inputData)=> {
            let editText;
            editText = inputData.editTodoInput;
            this.todoProvider.editTodo(editText, todoIndex);

            editTodoAlert.onDidDismiss(()=> {
              let addTodoToast = this.toastController.create({
                message: "Task edited",
                duration: 2000
            });
            addTodoToast.present();
          });
          }
        }
      ]
    });
    editTodoAlert.present();
  }

  openTodoAlert() {
    let addTodoAlert = this.alertController.create({
      title: "Add a task",
      message: "Enter your task",
      inputs: [
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add task",
          handler: (inputData)=> {
            let todoText;
            todoText = inputData.addTodoInput;
            this.todoProvider.addTodo(todoText);

            addTodoAlert.onDidDismiss(()=> {
                let addTodoToast = this.toastController.create({
                  message: "Task added",
                  duration: 2000
              });
              addTodoToast.present();
            });
          }
        }
      ]
    });
    addTodoAlert.present();
  }

}
