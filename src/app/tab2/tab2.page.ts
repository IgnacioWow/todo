
// src/app/tab2/tab2.page.ts

import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../services/database';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [ IonicModule, FormsModule, CommonModule ],
  providers: [ DatabaseService ],
})
export class Tab2Page implements OnInit {

  tasks: any[] = [];
  // Ahora newTask es un objeto
  newTask = {
    title: '',
    description: '',
    category: 'trabajo', // Valor por defecto
    priority: 'media'     // Valor por defecto
  };

  constructor(
    private db: DatabaseService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.db.openDatabase().then(() => this.loadTasks());
  }

  ionViewWillEnter() {
    this.loadTasks();
  }

  async loadTasks() {
    this.tasks = await this.db.getTasks();
  }

  // CREATE: Agregar una nueva tarea
  async addTask() {
    if (this.newTask.title.trim().length === 0) {
      this.presentToast('El título es obligatorio');
      return;
    }
    await this.db.addTask(this.newTask);
    this.resetNewTask(); // Limpiar el formulario
    this.presentToast('Tarea agregada');
    this.loadTasks();
  }

  // DELETE: Borrar una tarea
  async deleteTask(id: number) {
    await this.db.deleteTask(id);
    this.presentToast('Tarea eliminada');
    this.loadTasks();
  }

  // UPDATE: Marcar tarea como completada/pendiente
  async toggleTask(task: any) {
    task.completed = !task.completed;
    await this.db.updateTask(task);
    this.loadTasks();
  }

  // UPDATE: Editar una tarea (usando un Alert)
  async editTask(task: any) {
    const alert = await this.alertController.create({
      header: 'Editar Tarea',
      inputs: [
        { name: 'title', type: 'text', value: task.title, placeholder: 'Título' },
        { name: 'description', type: 'textarea', value: task.description, placeholder: 'Descripción' },
        { name: 'category', type: 'text', value: task.category, placeholder: 'Categoría' },
        { name: 'priority', type: 'text', value: task.priority, placeholder: 'Prioridad (baja, media, alta)' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: async (data) => {
            const updatedTask = { ...task, ...data };
            await this.db.updateTask(updatedTask);
            this.presentToast('Tarea actualizada');
            this.loadTasks();
          }
        }
      ]
    });
    await alert.present();
  }
  
  // Función de utilidad para limpiar el formulario
  resetNewTask() {
    this.newTask = {
      title: '',
      description: '',
      category: 'trabajo',
      priority: 'media'
    };
  }
  
  // Función para dar color a la prioridad
  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'alta': return 'danger';
      case 'media': return 'warning';
      case 'baja': return 'success';
      default: return 'medium';
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'secondary'
    });
    toast.present();
  }
}