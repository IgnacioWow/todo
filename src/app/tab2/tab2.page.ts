
// src/app/tab2/tab2.page.ts

import { Component } from '@angular/core';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
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
export class Tab2Page {

  newTask = {
    title: '',
    description: '',
    category: 'trabajo',
    priority: 'media'
  };

  constructor(
    private db: DatabaseService,
    private toastController: ToastController,
    private navCtrl: NavController // Para navegar a Tab1
  ) {}

  async addTask() {
    if (this.newTask.title.trim().length === 0) {
      this.presentToast('El título es obligatorio');
      return;
    }
    
    // Abre la BD por si es la primera vez que se usa la app
    await this.db.openDatabase();
    
    await this.db.addTask(this.newTask);
    this.presentToast('Tarea agregada exitosamente');
    this.resetNewTask();
    
    // Navega a la pestaña 1 para ver la nueva tarea
    this.navCtrl.navigateRoot('/tabs/tab1');
  }
  
  resetNewTask() {
    this.newTask = {
      title: '',
      description: '',
      category: 'trabajo',
      priority: 'media'
    };
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