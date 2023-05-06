import { Class } from "./class"

export class Section {
    id: string
    code: string
    name: string
    status: string
    class: Class

    constructor(obj?: any) {
        if (!obj) {
            return;
        }
        this.id = obj.id;
        this.code = obj.code;
        this.name = obj.name;
        this.status = obj.status;
        this.class = new Class(obj.class);
    }
}

