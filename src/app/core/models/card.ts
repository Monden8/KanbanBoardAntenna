export interface Card extends CardCreate{
  id: number;
  createdBy: string;
  createdTime: Date;
}

export interface CardCreate{
  name: string;
  description?: string;
  addedPerson: string[];
  deadLine: Date;
}
