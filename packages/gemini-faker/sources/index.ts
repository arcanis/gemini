import faker from 'faker';

export function useFaker(seed: number) {
  faker.seed(seed);
  return faker;
}
