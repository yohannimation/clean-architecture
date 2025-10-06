class FormDefinition {
    constructor(typology) {
        this.fields = ['price', ...typology.dynamicFields]; // champ commun + dynamiques
    }

    generateFormData(inputData) {
        // garde seulement les champs définis dans fields
        const data = {};
        this.fields.forEach(f => {
            if (inputData[f] !== undefined) data[f] = inputData[f];
        });
        return data;
    }
}

module.exports = FormDefinition;
