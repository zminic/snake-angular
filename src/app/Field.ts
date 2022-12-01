export class Field {

    constructor(public pos: number) {}

    isEmpty = true;
    isHead = false;
    isFood = false;

    setFood() {
        this.isEmpty = false;
        this.isFood = true;
    }

    setHead() {
        this.isEmpty = false;
        this.isHead = true;
    }

    setEmpty() {
        this.isEmpty = true;
        this.isHead = false;
        this.isFood = false;
    }

    setBody() {
        this.isEmpty = false;
        this.isHead = false;
        this.isFood = false;
    }
}