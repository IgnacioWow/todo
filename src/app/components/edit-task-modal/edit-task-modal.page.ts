
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.page.html',
  standalone: true,
  imports: [ IonicModule, FormsModule, CommonModule ],
}) 
export class EditTaskModalPage implements OnInit {

  @Input() task: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

    this.task = { ...this.task };
  }

  
  dismissModal() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

 
  saveChanges() {
    this.modalCtrl.dismiss(this.task, 'confirm');
  }
}