class Ui {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    coding() {
        return "I'm coding";
    }
}

let ui= new Ui('hqz','18');

document.getElementById('app').innerText=coding();