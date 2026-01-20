import { format, isValid } from 'date-fns';

class Driver {
  driverId: string;

  permanentNumber: string;

  code: string;

  url: string;

  givenName: string;

  familyName: string;

  nationality: string;
  
  dateOfBirth: Date;

  dateOfBirthFormatted: string;

  static fromJson(data: any) {
    const item = new Driver();

    item.driverId = data.driverId;
    item.permanentNumber = data.permanentNumber;
    item.code = data.code;
    item.url = data.url;
    item.givenName = data.givenName;
    item.familyName = data.familyName;
    item.nationality = data.nationality;
    
    item.dateOfBirth = new Date(data.dateOfBirth);
    item.dateOfBirthFormatted = isValid(item.dateOfBirth)
      ? format(item.dateOfBirth, 'dd/MM/yyyy')
      : '-';

    return item;
  }
}

export default Driver;
