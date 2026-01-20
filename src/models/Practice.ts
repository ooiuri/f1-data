import { format, isValid } from 'date-fns';

class Practice {
  date: Date;

  dateFormatted: string;

  static fromJson(data: any) {
    const practice = new Practice();

    let dateString = data.date + ' ' + data.time;
    if (!isValid(dateString)) {
      dateString = data.date;
    }
    practice.date = new Date(dateString);
    practice.dateFormatted = practice.date
      ? format(practice.date, 'dd/MM/yyyy - hh:mm')
      : '-';

    return practice;
  }
}

export default Practice;
