class Person {
    constructor(name, age) {
        this.name = null;
        this.age = null;
        this.type = 'person'
    }
}

class ArtTeacher extends Person {
    constructor(name, age) {
        super();
        this.name = 'person';
        this.age = 'all ages';
    }

}

const me = new ArtTeacher();
