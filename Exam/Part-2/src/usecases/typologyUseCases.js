class TypologyUseCases {
    constructor(typologyRepository) {
        this.typologyRepository = typologyRepository;
    }

    async createTypology(name, fields = []) {
        const typology = { name, fields };
        return this.typologyRepository.save(typology);
    }

    async addFieldToTypology(name, fieldName) {
        const typology = await this.typologyRepository.findByName(name);
        if (!typology) throw new Error('Typology not found');
        if (!typology.fields.includes(fieldName)) typology.fields.push(fieldName);
        return this.typologyRepository.save(typology);
    }

    async getTypology(name) {
        return this.typologyRepository.findByName(name);
    }
}

module.exports = TypologyUseCases;
