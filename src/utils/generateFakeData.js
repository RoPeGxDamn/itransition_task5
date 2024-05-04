import { allFakers } from "@faker-js/faker";

export function* generateFakeData(count, region, currentPage, seedValue) {
    const customFaker = allFakers[region];
    customFaker.seed(seedValue + currentPage);

    const { person, string, location, phone } = customFaker;
    for (let i = 0; i < count; i++) {
      yield {
        id: string.uuid(),
        fullname: person.fullName(),
        address: location.streetAddress(),
        phoneNumber: phone.number(),
      };
    }
  }