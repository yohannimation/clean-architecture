class Typology {
    constructor({ name, dynamicFields = [] }) {
        this.name = name;
        this.dynamicFields = dynamicFields; // ['size','color','material']
    }
}