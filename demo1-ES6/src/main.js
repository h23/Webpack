class Ui {
    constructor(name, age) {
        this.name = name;
    }

    coding() {
        return `${this.name} is coding`;
    }
}

let ui= new Ui('hqz');

document.getElementById('app').innerText=ui.coding();