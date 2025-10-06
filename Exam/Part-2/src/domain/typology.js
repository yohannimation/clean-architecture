class Typology {
    constructor({ name, fields }) {
        this.name = name;
        this.fields = fields; // ex: ['size', 'color', 'material']
    }

    addField(fieldName) {
        if (!this.fields.includes(fieldName)) this.fields.push(fieldName);
    }
}

module.exports = Typology;
