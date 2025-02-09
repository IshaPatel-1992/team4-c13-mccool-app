import dataAccess from '../src/databaseAccess/dataAccess';
import IsearchScenario from '../src/interface/IsearchScenario';
import searchScenarioModel from '../src/models/searchScenarioModel';
import QuickSearchService from '../src/services/quickSearchService';


describe('quickSearchService.insertOne', () => {
  const quickSearchService = new QuickSearchService();
  it('Insert record for Search Scenarion in to the database', async () => {
    const data = {
      search_criteria: 'compassionate leadership',
      tags: ['compassionate', 'leadership','compassionate leadership'],
      tips: ['"Listen actively to your team."', 'Show empathy towards challenges.'],
      enterBy: 'Isha',
      enterDt: new Date(),
      modifyBy: 'Isha',
      modifyDt: new Date(),
      isEnabled: true,
    };

    const result = await quickSearchService.insertOne(data);
    expect(result).toHaveProperty('search_criteria', data.search_criteria);
    expect(result.search_criteria).toBe(data.search_criteria);
  })
})

//The test case below used my local database to test the getMany method with filter
//test for getMany with filter
//get all users with email that contain "ne"
//use option "i" for case insensitive
describe.only('dataAccess.getMany', () => {

  const dbInstance = new dataAccess<IsearchScenario>(searchScenarioModel);
  const quickSearchService = new QuickSearchService();
  it('should get all search scenarios as user start typing "companss..." from the database', async () => {
    const result = await dbInstance.getMany({ search_criteria: RegExp("team", "i") });//use option "i" for case insensitive
    expect(result.length).toBeGreaterThan(0);
    result.forEach(searchcriteria => {
      //console.log(searchcriteria.search_criteria);
      expect(searchcriteria.search_criteria).toMatch(/team/i)});
  });
});

/*describe.only('dataAccess.insertOne', () => {
  const dbInstance = new dataAccess<IsearchScenario>(searchScenarioModel);

  it('should insert a search scenario into the database', async () => {
    const data = {
      search_criteria: 'Example criteria',
      tags: ['tag1', 'tag2'],
      tips: ['Tip 1', 'Tip 2'],
      enter_by: 'Isha',
      enter_date: new Date(),
      modified_by: 'Isha',
      modified_date: new Date(),
      isEnabled: true,
    };
    const result = await dbInstance.insertOne(data);
    expect(result).toHaveProperty('search_criteria', data.search_criteria);
    expect(result.search_criteria).toBe(data.search_criteria);
  });
});*/

/*describe('dataAccess.getOne', () => {
  const dbInstance = new dataAccess<IsearchScenario>(searchScenarioModel);

  it('should get a search scenario from the database', async () => {
    const result = await dbInstance.getOne('676a5b4865ddbdb97d15eeaf'); // Replace with a valid ID from your database
    expect(result).toHaveProperty('search_criteria', 'Example criteria');
    expect(result?.isEnabled).toBe(true);
  });
});*/

/*describe('dataAccess.getMany', () => {
  const dbInstance = new dataAccess<IsearchScenario>(searchScenarioModel);

  it('should get all search scenarios from the database', async () => {
    const result = await dbInstance.getMany();
    expect(result.length).toBeGreaterThan(0);
  });
});*/

/*describe('dataAccess.updateOne', () => {
  const dbInstance = new dataAccess<IsearchScenario>(searchScenarioModel);

  it('should update a search scenario in the database', async () => {
    const data = {
      search_criteria: 'Updated criteria',
      tags: ['tag1', 'tag3'],
      tips: ['Updated Tip 1'],
      enter_by: 'UpdatedUser',
      enter_date: new Date(),
      modified_by: 'UpdatedUser',
      modified_date: new Date(),
      isEnabled: false,
    };
    const result = await dbInstance.updateOne('677760c916dc9e3d8a432c21', data); // Replace with a valid ID
    expect(result).toHaveProperty('search_criteria', data.search_criteria);
    expect(result?.isEnabled).toBe(data.isEnabled);
  });
});

describe.only('dataAccess.deleteOne', () => {
  const dbInstance = new dataAccess<IsearchScenario>(searchScenarioModel);

  it('should delete a search scenario from the database', async () => {
    const result = await dbInstance.deleteOne('6767d48178b32b5dd8f113d3'); // Replace with a valid ID
    expect(result).toHaveProperty('search_criteria', 'Example criteria');
    expect(result?.isEnabled).toBe(true);
  });
});*/
