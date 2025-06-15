const collectionService = require('../../src/services/collectionService');
const collectionModel = require('../../src/models/collectionModel');

jest.mock('../../src/models/collectionModel');

describe('collectionService Unit Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getUserCollection', () => {
        it('should fetch user collection successfully', async () => {
            const mockCollection = { users: 'mockId', cards: [] };
            collectionModel.findCollectionByUserId.mockResolvedValue(mockCollection);
            const collection = await collectionService.getUserCollection('mockId');
            expect(collection).toEqual(mockCollection);
            expect(collectionModel.findCollectionByUserId).toHaveBeenCalledWith('mockId');
        });

        it('should throw an error if fetching collection fails', async () => {
           collectionModel.findCollectionByUserId.mockRejectedValue(new Error('Database error'));
           await expect(collectionService.getUserCollection('mockId')).rejects.toThrow('Error fetching collection: Database error');
        });
    });

    describe('addCardToCollection', () => {
        it('should add a card to the collection successfully', async () => {
            const mockCard = { name: 'Pikachu', extension: 'BS', bloc: 'base set', rarity: 'common', type: ['pokemon'] };
            const mockCollection = { users: 'mockId', cards: [] };
            collectionModel.findCollectionByUserId.mockResolvedValue(mockCollection);
            collectionModel.updateCollection.mockResolvedValue();
          const collection = await collectionService.addCardToCollection('mockId', mockCard);

            const expectedCollection = {
                users: 'mockId',
              cards: [{ card: mockCard, quantity: 1 }]
            }
           expect(collection).toEqual(expectedCollection);
           expect(collectionModel.findCollectionByUserId).toHaveBeenCalledWith('mockId');
          expect(collectionModel.updateCollection).toHaveBeenCalledWith('mockId', expectedCollection.cards);

        });

        it('should create a new collection if no collection exist for the user', async () => {
              const mockCard = { name: 'Pikachu', extension: 'BS', bloc: 'base set', rarity: 'common', type: ['pokemon'] };
            const mockCollection = { users: 'mockId', cards: [] };
           collectionModel.findCollectionByUserId.mockResolvedValue(null);
          collectionModel.createCollectionForUser.mockResolvedValue(mockCollection);
            collectionModel.updateCollection.mockResolvedValue();

          const collection = await collectionService.addCardToCollection('mockId', mockCard);
            const expectedCollection = {
              users: 'mockId',
              cards: [{ card: mockCard, quantity: 1 }]
          }
         expect(collection).toEqual(expectedCollection);
         expect(collectionModel.findCollectionByUserId).toHaveBeenCalledWith('mockId');
         expect(collectionModel.createCollectionForUser).toHaveBeenCalledWith('mockId');
          expect(collectionModel.updateCollection).toHaveBeenCalledWith('mockId', expectedCollection.cards);
      });
        it('should throw an error if card already exists', async () => {
            const mockCard = { name: 'Pikachu', extension: 'BS', bloc: 'base set', rarity: 'common', type: ['pokemon'] };
           const mockCollection = { users: 'mockId', cards: [{ card: mockCard, quantity: 1 }] };
            collectionModel.findCollectionByUserId.mockResolvedValue(mockCollection);
          await expect(collectionService.addCardToCollection('mockId', mockCard)).rejects.toThrow('This card is already in your collection');
        });

         it('should throw an error if update collection fails', async () => {
              const mockCard = { name: 'Pikachu', extension: 'BS', bloc: 'base set', rarity: 'common', type: ['pokemon'] };
            const mockCollection = { users: 'mockId', cards: [] };
              collectionModel.findCollectionByUserId.mockResolvedValue(mockCollection);
           collectionModel.updateCollection.mockRejectedValue(new Error('Database error'));
           await expect(collectionService.addCardToCollection('mockId', mockCard)).rejects.toThrow('Error adding card to collection: Database error');
        });
    });

  describe('updateCardQuantity', () => {
    it('should update the quantity of a card successfully', async () => {
          const mockCard = { name: 'Pikachu', extension: 'BS', bloc: 'base set', rarity: 'common', type: ['pokemon'] };
          const mockCollection = { users: 'mockId', cards: [{card: mockCard, quantity: 1}] };
          collectionModel.findCollectionByUserId.mockResolvedValue(mockCollection);
            collectionModel.updateCollection.mockResolvedValue();
          const collection = await collectionService.updateCardQuantity('mockId', 0, 3);
          const expectedCollection = { users: 'mockId', cards: [{ card: mockCard, quantity: 3 }] };
           expect(collection).toEqual(expectedCollection);
        expect(collectionModel.findCollectionByUserId).toHaveBeenCalledWith('mockId')
        expect(collectionModel.updateCollection).toHaveBeenCalledWith('mockId', expectedCollection.cards);

      });
       it('should throw an error if card position is invalid', async () => {
            const mockCard = { name: 'Pikachu', extension: 'BS', bloc: 'base set', rarity: 'common', type: ['pokemon'] };
            const mockCollection = { users: 'mockId', cards: [{ card: mockCard, quantity: 1 }] };
            collectionModel.findCollectionByUserId.mockResolvedValue(mockCollection);

          await expect(collectionService.updateCardQuantity('mockId', 2, 3)).rejects.toThrow('Invalid card position in collection');
        });

        it('should throw an error if updating card quantity fails', async () => {
             const mockCard = { name: 'Pikachu', extension: 'BS', bloc: 'base set', rarity: 'common', type: ['pokemon'] };
            const mockCollection = { users: 'mockId', cards: [{ card: mockCard, quantity: 1 }] };
            collectionModel.findCollectionByUserId.mockResolvedValue(mockCollection);
            collectionModel.updateCollection.mockRejectedValue(new Error('Database error'));
         await expect(collectionService.updateCardQuantity('mockId', 0, 3)).rejects.toThrow('Error updating card quantity: Database error');
        });
  });

  describe('deleteCardFromCollection', () => {
        it('should delete a card from the collection successfully', async () => {
             const mockCard = { name: 'Pikachu', extension: 'BS', bloc: 'base set', rarity: 'common', type: ['pokemon'] };
            const mockCollection = { users: 'mockId', cards: [{card: mockCard, quantity: 1}] };
             collectionModel.findCollectionByUserId.mockResolvedValue(mockCollection);
             collectionModel.updateCollection.mockResolvedValue();

            const response = await collectionService.deleteCardFromCollection('mockId', 0);
            const expectedCollection = { users: 'mockId', cards: [] }
            expect(response).toEqual({ message: 'Card deleted from collection.' });
            expect(collectionModel.findCollectionByUserId).toHaveBeenCalledWith('mockId');
          expect(collectionModel.updateCollection).toHaveBeenCalledWith('mockId', expectedCollection.cards);
        });
        it('should throw an error if card position is invalid', async () => {
            const mockCard = { name: 'Pikachu', extension: 'BS', bloc: 'base set', rarity: 'common', type: ['pokemon'] };
          const mockCollection = { users: 'mockId', cards: [{card: mockCard, quantity: 1}] };
          collectionModel.findCollectionByUserId.mockResolvedValue(mockCollection);
          await expect(collectionService.deleteCardFromCollection('mockId', 2)).rejects.toThrow('Invalid card position in collection');
      });
      it('should throw an error if deleting card fails', async () => {
           const mockCard = { name: 'Pikachu', extension: 'BS', bloc: 'base set', rarity: 'common', type: ['pokemon'] };
          const mockCollection = { users: 'mockId', cards: [{ card: mockCard, quantity: 1 }] };
           collectionModel.findCollectionByUserId.mockResolvedValue(mockCollection);
            collectionModel.updateCollection.mockRejectedValue(new Error('Database error'));
          await expect(collectionService.deleteCardFromCollection('mockId', 0)).rejects.toThrow('Error deleting card from collection: Database error');
      })
    });
});