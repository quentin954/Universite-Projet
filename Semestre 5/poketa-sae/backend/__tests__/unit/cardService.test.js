const cardService = require('../../src/services/cardService');
const cardModel = require('../../src/models/cardModel');

jest.mock('../../src/models/cardModel');

describe('cardService Unit Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllBlocksAndExtensions', () => {
        it('should return blocks with extensions excluding cards', async () => {
            const mockBlocks = [
                {
                    name: 'Écarlate et Violet',
                    extensions: [
                        {
                            Code: 'SSP',
                            name: 'Étincelles Déferlantes',
                            cards: [{ name: 'Noeunoeuf' }],
                        },
                    ],
                },
                {
                    name: 'Épée et Bouclier',
                    extensions: [
                        {
                            Code: 'CRZ',
                            name: 'Zénith Suprême',
                             cards: [{ name: 'Mystherbe' }],
                        },
                    ],
                },
            ];
            cardModel.getAllBlocksAndExtensions.mockResolvedValue(mockBlocks);
            const expected = [
                {
                    name: 'Écarlate et Violet',
                    extensions: [
                        {
                            Code: 'SSP',
                            name: 'Étincelles Déferlantes',
                        },
                    ],
                },
                {
                    name: 'Épée et Bouclier',
                    extensions: [
                        {
                            Code: 'CRZ',
                            name: 'Zénith Suprême',
                        },
                    ],
                },
            ];
            const blocks = await cardService.getAllBlocksAndExtensions();
            expect(blocks).toEqual(expected);
            expect(cardModel.getAllBlocksAndExtensions).toHaveBeenCalled();
        });

        it('should throw an error if fetching blocks fails', async () => {
            cardModel.getAllBlocksAndExtensions.mockRejectedValue(new Error('Database error'));
            await expect(cardService.getAllBlocksAndExtensions()).rejects.toThrow('Error fetching blocks and extensions: Database error');
        });
    });


    describe('getExtensionByCode', () => {
        it('should return extension by code successfully', async () => {
            const mockBlock = {
                name: 'Écarlate et Violet',
                extensions: [
                    {
                        Code: 'SSP',
                        name: 'Étincelles Déferlantes',
                        cards: [{ name: 'Noeunoeuf' }],
                    },
                ],
            };
           cardModel.findBlockByExtensionCode.mockResolvedValue(mockBlock);

            const extension = await cardService.getExtensionByCode('SSP');

            expect(extension).toEqual(mockBlock.extensions[0])
           expect(cardModel.findBlockByExtensionCode).toHaveBeenCalledWith('SSP');
        });
      it('should return null if no block found', async () => {
        cardModel.findBlockByExtensionCode.mockResolvedValue(null);

          const extension = await cardService.getExtensionByCode('SSP');
            expect(extension).toBeNull();
          expect(cardModel.findBlockByExtensionCode).toHaveBeenCalledWith('SSP');
      });

      it('should return null if no extension found', async () => {
          const mockBlock = {
            name: 'Écarlate et Violet',
              extensions: [
                  {
                      Code: 'CRZ',
                      name: 'Zénith Suprême',
                       cards: [{ name: 'Mystherbe' }],
                  },
              ],
          };
        cardModel.findBlockByExtensionCode.mockResolvedValue(mockBlock);

          const extension = await cardService.getExtensionByCode('SSP');
          expect(extension).toBeNull();
        expect(cardModel.findBlockByExtensionCode).toHaveBeenCalledWith('SSP');
        });

      it('should throw an error if find block by extension fails', async () => {
        cardModel.findBlockByExtensionCode.mockRejectedValue(new Error('Database error'));

          await expect(cardService.getExtensionByCode('SSP')).rejects.toThrow('Error fetching extension by code: Database error');
        });
    });

  describe('searchCards', () => {
        it('should return search results successfully', async () => {
            const mockCards = [{ name: 'Pikachu', type: ['pokemon'] }, { name: 'Raichu', type: ['pokemon'] }]
            cardModel.searchCards.mockResolvedValue(mockCards);
          const results = await cardService.searchCards('Pika');
          expect(results).toEqual(mockCards);
            expect(cardModel.searchCards).toHaveBeenCalledWith('Pika');
        });
      it('should throw an error if search fails', async () => {
          cardModel.searchCards.mockRejectedValue(new Error('Database error'))
          await expect(cardService.searchCards('Pika')).rejects.toThrow('Erreur dans le service de recherche : Database error');
      });
    });

  describe('searchComplete', () => {
      it('should return complete search results successfully', async () => {
          const mockResults = [{
                name: 'Écarlate et Violet',
                extensions: [
                    {
                        Code: 'SSP',
                        name: 'Étincelles Déferlantes',
                       cards: [{ name: 'Noeunoeuf' }],
                    },
                ],
            }]
          cardModel.searchComplete.mockResolvedValue(mockResults);
           const results = await cardService.searchComplete('SSP');
          expect(results).toEqual(mockResults)
          expect(cardModel.searchComplete).toHaveBeenCalledWith('SSP');
        });
      it('should throw an error if complete search fails', async () => {
          cardModel.searchComplete.mockRejectedValue(new Error('Database error'))
           await expect(cardService.searchComplete('SSP')).rejects.toThrow('Erreur dans le service de recherche : Database error');
      });
    });
});