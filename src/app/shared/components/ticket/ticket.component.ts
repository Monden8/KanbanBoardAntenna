import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/core/models/card';
import { TicketService } from '../../services/ticket/ticket.service';

@Component({
  selector: 'kanban-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  @Input() ticketID!: number;
  public ticket!: Card | null;
  public tooltipText!: string;
  public error: boolean = false;

  constructor(private tckService: TicketService) {}

  ngOnInit(): void {
    this.ticket = this.tckService.getTicket(this.ticketID);
    if (this.ticket) {
      this.tooltipText = `CreatedBy: ${this.ticket?.createdBy} at
      ${new Date(this.ticket?.createdTime).toDateString()}.
      `;
    } else {
      this.error = true;
    }
  }
}
