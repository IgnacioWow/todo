// src/app/tab1/tab1.page.ts

import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController, ToastController, ModalController } from '@ionic/angular'; // IMPORTANTE: ModalController
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../services/database';
import { EditTaskModalPage } from '../components/edit-task-modal/edit-task-modal.page'; // IMPORTANTE: La página del modal

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [ IonicModule, FormsModule, CommonModule ],
  providers: [ DatabaseService ],
})
export class Tab1Page implements OnInit {

  tasks: any[] = [];
  filteredTasks: any[] = [];
  
  filterCategory: string = 'todas';
  filterPriority: string = 'todas';

  constructor(
    private db: DatabaseService,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController // ASEGÚRATE DE QUE ESTÁ AQUÍ
  ) {}

  ngOnInit() {
    this.db.openDatabase();
  }

  ionViewWillEnter() {
    this.loadTasks();
  }

  async loadTasks() {
    this.tasks = await this.db.getTasks();
    this.applyFilters();
  }

  applyFilters() {
    let tasksToFilter = [...this.tasks];
    if (this.filterCategory !== 'todas') {
      tasksToFilter = tasksToFilter.filter(task => task.category === this.filterCategory);
    }
    if (this.filterPriority !== 'todas') {
      tasksToFilter = tasksToFilter.filter(task => task.priority === this.filterPriority);
    }
    this.filteredTasks = tasksToFilter;
  }

  clearFilters() {
    this.filterCategory = 'todas';
    this.filterPriority = 'todas';
    this.applyFilters();
  }

  async deleteTask(id: number) {
    await this.db.deleteTask(id);
    this.presentToast('Tarea eliminada');
    await this.loadTasks();
  }

  // Lógica para el checkbox (tachar la tarea)
  async toggleTask(task: any) {
    task.completed = task.completed === 1 ? 0 : 1;
    await this.db.updateTask(task);
    this.presentToast('Estado de la tarea actualizado');
    await this.loadTasks();
  }

  // Lógica para editar la tarea USANDO EL MODAL
  async editTask(task: any) {
    const modal = await this.modalController.create({
      component: EditTaskModalPage,
      componentProps: {
        task: task 
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      await this.db.updateTask(data);
      this.presentToast('Tarea actualizada');
      await this.loadTasks();
    }
  }
  
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