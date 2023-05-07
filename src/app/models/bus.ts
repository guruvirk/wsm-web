export class Bus {

    id: string;
    number: string;
    pic: string;
    model: string;
    capacity: number;
    driverName: string;
    driverLicense: string;
    caretakerName: string;
    caretakerAadhar: string;
    driverPhone: number;
    caretakerPhone: number;
    code: number;
    status: string;

    constructor(obj?: any) {
        if (!obj) {
            return;
        }

        this.id = obj.id;
        this.code = obj.code;
        this.number = obj.number;
        this.pic = obj.pic;
        this.model = obj.model;
        this.capacity = obj.capacity;
        this.driverName = obj.driverName;
        this.driverLicense = obj.driverLicense;
        this.caretakerName = obj.caretakerName;
        this.caretakerAadhar = obj.caretakerAadhar;
        this.driverPhone = obj.driverPhone;
        this.caretakerPhone = obj.caretakerPhone;
        this.status = obj.status;
    }
}

