import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { ColumnService } from 'src/app/core/services/column/column.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BoardColumn } from 'src/app/core/models/column';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketService } from 'src/app/shared/services/ticket/ticket.service';

@Component({
  selector: 'kanban-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
  public columns: BoardColumn[];
  public allColumns: string[];
  public loggedUser: string;
  public creationActive: boolean;
  public listCreationActive: boolean;
  public columnForm = new FormGroup<any>({
    title: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true
    })
  });
  public form = new FormGroup<any>({
    name: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    description: new FormControl<string>('', {}),
    addedPerson: new FormControl<string[]>([''], {
      validators: [Validators.required],
      nonNullable: true
    }),
    deadline: new FormControl<Date>(new Date(), {
      validators: [Validators.required]
    })
  });

  constructor(
    private columnService: ColumnService,
    private authService: AuthService,
    private ticketService: TicketService
  ) {
    this.columns = [];
    this.allColumns = [];
    this.loggedUser = '';
    this.creationActive = false;
    this.listCreationActive = false;
  }

  ngOnInit(): void {
    this.columns = this.columnService.getColumns();
    this.allColumns = this.columnService.getAllColumns();
    this.loggedUser = this.authService.loggedInUser();
    //Refactor Subscribers
  }

  drop(event: CdkDragDrop<number[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.columnService.modifyColumn(
        event.previousContainer.id,
        event.container.id,
        event.previousContainer.data,
        event.container.data
      );
    }
  }

  public addTicket() {
    if (this.creationActive) {
      this.creationActive = false;
      this.form.reset();
    } else {
      this.creationActive = true;
    }
  }
  public createCard(): void {
    if (!this.form.valid) {
      return;
    } else {
      this.ticketService.createTicket(this.form.getRawValue());
      this.columns = this.columnService.getColumns();
      this.creationActive = false;
    }
  }
  // public deleteCard() {}
  public addList() {
    if (this.listCreationActive) {
      this.listCreationActive = false;
      this.columnForm.reset();
    } else {
      this.listCreationActive = true;
    }
  }
  public createList() {
    if (!this.columnForm.valid) {
      return;
    } else {
      this.columnService.addColumn(this.columnForm.getRawValue());
      this.columns = this.columnService.getColumns();
      this.allColumns = this.columnService.getAllColumns();
      this.addList();
    }
  }
  // public removeList() {}
}
