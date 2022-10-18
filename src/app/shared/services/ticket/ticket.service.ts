import { Injectable } from '@angular/core';
import { Card } from 'src/app/core/models/card';
import { AuthService } from 'src/app/core/services/auth.service';
import { ColumnService } from 'src/app/core/services/column/column.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  public mockCards: Card[] = [
    {
      id: 1,
      name: 'test1',
      addedPerson: ['test', 'test2'],
      createdBy: 'Sándor',
      createdTime: new Date(),
      deadLine: new Date(),
      description: 'string'
    },
    {
      id: 2,
      name: 'test2',
      addedPerson: ['test'],
      createdBy: 'Sándor',
      createdTime: new Date(),
      deadLine: new Date()
    }
  ];
  public allTickets:Card[]= [];

  constructor(private authService: AuthService, private columnService: ColumnService) {
  }

  public getTicket(id: number): Card | null {
    let cards = localStorage.getItem('cards');
    cards ? this.allTickets = JSON.parse(cards) : this.allTickets = this.mockCards;
    let card = this.allTickets.find((o) => o.id === id);
    if (card) {
      return card;
    } else {
      return null;
    }
  }

  public createId(): number {
    // let idArr :number[] = [];
    // this.mockCards.forEach(card=>{
    //   idArr.push(card.id)
    // })
    // if(idArr.includes(Date.now())){
    // }
    return Date.now();
  }

  public createTicket(data: any) {
    let id = this.createId()
    this.columnService.addToTemporary(id)
    this.mockCards.push({
      id: id,
      name: data.name,
      addedPerson: [data.addedPerson],
      createdBy: this.authService.loggedInUser(),
      createdTime: new Date(),
      deadLine: data.deadline,
      description: data?.description
    });
    localStorage.removeItem('cards');
    localStorage.setItem('cards', JSON.stringify(this.mockCards));
  }
  public deleteTicket() {}
}
