class InMemoryMediaRepository {
    constructor() {
        this.mediaList = [];
    }

    async save(media) {
        this.mediaList.push(media);
        return media;
    }

    async findAll() {
        return this.mediaList;
    }
}

module.exports = InMemoryMediaRepository;
