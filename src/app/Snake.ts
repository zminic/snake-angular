import { Field } from "./Field";

export class Snake {
    parts: Field[] = [];

    // Add initial snake parts (without move logic)
    addPart(f: Field) {
        this.getHead()?.setBody();
        this.parts.push(f);
        f.setHead();
    }

    // move snake (f is the new head)
    move(f: Field) {
        // set previous head to body
        this.getHead().setBody();

        // set new head
        this.parts.push(f);
        f.setHead();

        // remove part of tail
        if (!f.isFood) {
            this.parts[0].setEmpty();
            this.parts.splice(0,1);
        }
    }

    getHead(): Field {
        return this.parts[this.parts.length - 1];
    }
}