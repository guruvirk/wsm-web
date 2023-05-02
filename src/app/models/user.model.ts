import { Session } from '.';
import { Tenant } from '.';
import { Address } from '.';

export class User {

  id: string;
  code: String;
  type: string;
  firstName: string;
  lastName: string;
  dob: Date;
  age: Number;
  bloodGroup: any;
  gender: any;
  phone: string;
  email: string;
  status: string;
  timeStamp: Date;
  session: Session;
  tenant: Tenant;
  permissions: string[]
  experties: string[]
  address: Address;
  isValidated: boolean;

  constructor(obj?: any) {
    if (!obj) {
      return;
    }

    this.id = obj.id;
    this.code = obj.code;
    this.type = obj.type;
    this.email = obj.email;
    this.phone = obj.phone;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.status = obj.status;
    this.dob = obj.dob;
    this.age = obj.age;
    this.age = obj.age;
    this.bloodGroup = obj.bloodGroup;
    this.gender = obj.gender;
    this.session = new Session(obj.session);
    this.tenant = new Tenant(obj.tenant);
    this.permissions = obj.permissions || []
    this.experties = obj.experties || []
    this.address = new Address(obj.address || {})
  }
}
