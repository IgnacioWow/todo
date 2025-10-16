
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  db: SQLiteObject | null = null;

  constructor(private sqlite: SQLite) { }

  async openDatabase() {
    try {
      this.db = await this.sqlite.create({
        name: 'todo.db',
        location: 'default'
      });
      // 1. ACTUALIZAR LA ESTRUCTURA DE LA TABLA
      await this.db.executeSql(`
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT,
          category TEXT,
          priority TEXT,
          completed INTEGER DEFAULT 0
        )
      `, []);
    } catch (error) {
      console.error('Error al abrir la base de datos', error);
    }
  }

  // 2. ACTUALIZAR EL MÉTODO PARA AÑADIR TAREAS
  async addTask(task: { title: string, description: string, category: string, priority: string }) {
    if (!this.db) { return; }
    const sql = 'INSERT INTO tasks (title, description, category, priority) VALUES (?, ?, ?, ?)';
    return this.db.executeSql(sql, [task.title, task.description, task.category, task.priority]);
  }

  // (getTasks y deleteTask no necesitan cambios en sus parámetros)
  async getTasks() {
    if (!this.db) {
      await this.openDatabase();
    }
    if (!this.db) { return []; }
    const sql = 'SELECT * FROM tasks ORDER BY id DESC';
    const res = await this.db.executeSql(sql, []);
    let tasks = [];
    for (let i = 0; i < res.rows.length; i++) {
      tasks.push(res.rows.item(i));
    }
    return tasks;
  }

  // 3. ACTUALIZAR EL MÉTODO DE ACTUALIZACIÓN
  async updateTask(task: any) {
    if (!this.db) { return; }
    const sql = `UPDATE tasks
                 SET title = ?, description = ?, category = ?, priority = ?, completed = ?
                 WHERE id = ?`;
    return this.db.executeSql(sql, [
      task.title,
      task.description,
      task.category,
      task.priority,
      task.completed ? 1 : 0,
      task.id
    ]);
  }

  async deleteTask(id: number) {
    if (!this.db) { return; }
    const sql = 'DELETE FROM tasks WHERE id = ?';
    return this.db.executeSql(sql, [id]);
  }
}