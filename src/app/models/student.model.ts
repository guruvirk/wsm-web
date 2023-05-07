import { Class, Section, Session, User, Bus } from '.';
import { Tenant } from '.';
import { Address } from '.';

export class Student {

  id: string;
  rollNo: String;
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
  section: Section;
  class: Class;
  permissions: string[]
  experties: string[]
  address: Address;
  isValidated: boolean;
  createdBy: User;
  bus: Bus;
  createdAt: Date;

  constructor(obj?: any) {
    if (!obj) {
      return;
    }

    this.id = obj.id;
    this.rollNo = obj.rollNo;
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
    this.createdAt = new Date(obj.createdAt)
    this.session = new Session(obj.session);
    this.createdBy = new User(obj.createdBy);
    this.bus = new Bus(obj.bus);
    this.tenant = new Tenant(obj.tenant);
    this.section = new Section(obj.section);
    this.class = new Class(obj.class);
    this.permissions = obj.permissions || []
    this.experties = obj.experties || []
    this.address = new Address(obj.address || {})
  }
}
