import { calculateAge } from './dateHelper';

describe('helpers suite', () => {
  it('calculate age should turn dates into age', () => {
    expect(calculateAge('1988-12-19')).toBe(30);
  });
})