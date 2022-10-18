import { Injectable } from '@angular/core';
import { BoardColumn } from '../../models/column';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {
  public mockColumns: BoardColumn[] = [
    { title: 'Temporary', cardID: [], user: ['Sándor','István','József'] },
    { title: 'WillDo', cardID: [], user: ['József'] },
    { title: 'WontDo', cardID: [1, 2], user: ['István', 'Sándor'] }
  ];

  constructor(private authService: AuthService) {}

  public updateColumns(): BoardColumn[] {
    let stringColumns = localStorage.getItem('columns');
    return stringColumns
      ? (this.mockColumns = JSON.parse(stringColumns))
      : null;
  }

  public getColumns(): BoardColumn[] {
    if (this.updateColumns()) {
      this.mockColumns = this.updateColumns();
    }
    return this.mockColumns.filter((user) =>
      user.user.includes(this.authService.loggedInUser())
    );
  }

  public addToTemporary(id: number): void {
    let column = this.getColumns();
    let addToColumn = column.find((title) => title.title == 'Temporary');
    addToColumn ? addToColumn.cardID.push(id) : '';
    localStorage.removeItem('columns');
    localStorage.setItem('columns', JSON.stringify(column));
  }

  public getAllColumns(): string[] {
    let allColumns: string[] = [];
    let userConnectedColumns: BoardColumn[] = this.getColumns();

    for (let i = 0; i < userConnectedColumns.length; i++) {
      allColumns.push(userConnectedColumns[i].title);
    }

    return allColumns;
  }

  public addColumn(data: any): void {
    let column = this.getColumns();
    column.push({
      title: data.title,
      cardID: [],
      user: [`${this.authService.loggedInUser()}`]
    });
    localStorage.removeItem('columns');
    localStorage.setItem('columns', JSON.stringify(column));
  }

  public modifyColumn(
    previousTitle: string,
    inputTitle: string,
    prevCardID: number[],
    cardID: number[]
  ): void {
    let column = this.getColumns();
    let prevColumn = column.find((title) => title.title == previousTitle);
    prevColumn ? (prevColumn.cardID = prevCardID) : '';
    let filteredColumn = column.find((title) => title.title == inputTitle);
    filteredColumn ? (filteredColumn.cardID = cardID) : '';
    localStorage.removeItem('columns');
    localStorage.setItem('columns', JSON.stringify(column));
  }

  public removeColumn(): any {
    localStorage.removeItem('columns');
    //
    localStorage.setItem('columns', JSON.stringify(this.mockColumns));
  }
}
