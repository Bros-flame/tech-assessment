import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../config/constants';
import { ManageTaskService } from '../service/manage-task-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../service/helper';

@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.css']
})
export class ManageTaskComponent {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  taskForm!: FormGroup;
  isEditMode: boolean = false;
  selectedTask: Task | null = null;
  isModalVisible: boolean = false;
  searchTerm: string = '';
  selectedStatus: string = 'All'; 

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private service: ManageTaskService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getTasks();
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      completed: [false]
    });

    this.service.RefreshRequired.subscribe(() => {
      this.getTasks();
    });
  }

  logout(): void {
    this.helper.clean();
    window.location.reload();
  }

  openModal(task: Task | null = null): void {
    this.isModalVisible = true;
    this.isEditMode = task !== null;
    if (task) {
      this.selectedTask = task;
      this.taskForm.patchValue({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        completed: task.completed
      });
    } else {
      this.taskForm.reset();
    }
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      if (this.isEditMode && this.selectedTask) {
        const updatedTask = { ...this.selectedTask, ...this.taskForm.value };
        this.updateTask(updatedTask.id, updatedTask);
      } else {
        const newTask = { ...this.taskForm.value };
        this.storeTask(newTask);
      }
      this.closeModal();
    }
  }

  private storeTask(task: Task): void {
    this.spinner.show();
    this.service.createTask(task).subscribe({
      next: () => {
        this.spinner.hide();
        alert('Task Created');
      },
      error: (error: any) => {
        this.spinner.hide();
        console.error(error);
      }
    });
  }

  private updateTask(taskId: any, task: Task): void {
    this.spinner.show();
    this.service.updateTask(taskId, task).subscribe({
      next: () => {
        this.spinner.hide();
        alert('Task Updated');
      },
      error: (error: any) => {
        this.spinner.hide();
        console.error(error);
      }
    });
  }

  deleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.deleteTask1(taskId);
    }
  }

  private deleteTask1(taskId: any): void {
    this.spinner.show();
    this.service.deleteTask(taskId).subscribe({
      next: () => {
        this.spinner.hide();
        alert('Task Deleted');
      },
      error: (error: any) => {
        this.spinner.hide();
        console.error(error);
      }
    });
  }

  closeModal(): void {
    this.selectedTask = null;
    this.isEditMode = false;
    this.isModalVisible = false;
  }

  private getTasks(): void {
    this.service.getTasks().subscribe({
      next: (res: any) => {
        this.tasks = res;
        this.sortTasksByCompletion();
        this.filterByStatus();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  sortTasksByCompletion(): void {
    this.tasks.sort((a, b) => {
      if (a.completed === b.completed) {
        return 0;
      }
      return a.completed ? 1 : -1;
    });
  }

  filterTasks(): void {
    let filtered = this.tasks;

    // Apply search term filter
    if (this.searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (this.selectedStatus !== 'All') {
      const isCompleted = this.selectedStatus === 'Completed';
      filtered = filtered.filter(task => task.completed === isCompleted);
    }

    this.filteredTasks = filtered;
  }

  filterByStatus(): void {
    this.filterTasks();
  }
}
