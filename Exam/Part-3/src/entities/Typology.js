// Typology.js
class Typology {
    constructor({ name, dynamicFields = [] }) {
        this.name = name;
        this.dynamicFields = dynamicFields;
    }
}

module.exports = Typology; // <-- utiliser directement Typology
