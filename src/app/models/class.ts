export class Year {
    id: string
    name: string

    constructor(obj?: any) {
        if (!obj) {
            return;
        }
        this.id = obj.id;
        this.name = obj.name;
    }
}

export class ClassEntity {
    id: string
    name: string
    status: string

    constructor(obj?: any) {
        if (!obj) {
            return;
        }
        this.id = obj.id;
        this.name = obj.name;
    }
}

export class Class {
    id: string
    code: string
    name: string
    status: string
    year: Year
    classEntity: ClassEntity

    constructor(obj?: any) {
        if (!obj) {
            return;
        }
        this.id = obj.id;
        this.code = obj.code;
        this.name = obj.name;
        this.status = obj.status;
        this.year = new Year(obj.year);
        this.classEntity = new ClassEntity(obj.classEntity);
    }
}

