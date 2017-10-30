import * as fileHelpers from './fileHelpers';
jest.mock('file-saver');

const testData = [{ test: 'test' }];


describe('fileHelpers testing', () => {
  it('testing JSON', () => {
    expect(fileHelpers.exportToJSON('test', testData)).toBeUndefined();
  });
});
