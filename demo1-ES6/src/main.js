class Ui {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    coding() {
        return `${this.name} is coding`;
    }
}

let ui= new Ui('hqz','18');

document.getElementById('app').innerText=ui.coding();