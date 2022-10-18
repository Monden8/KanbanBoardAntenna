import { NgModule } from '@angular/core';
import { TicketComponent } from './components/ticket/ticket.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TicketComponent],
  exports: [
    TicketComponent,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    DragDropModule,
    MatDatepickerModule
  ],
  imports: [
    MatTooltipModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    DragDropModule,
    MatDatepickerModule
  ]
})
export class SharedModule {}
