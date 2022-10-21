import { AddRecord } from "../records/add.record";

const defaultObject = {
  description: "test description",
  lat: 30,
  lon: 89,
  name: "Test",
  price: 300,
  url: "http://www.test.com",
};

test("Can build AdRecord", () => {
  const add = new AddRecord(defaultObject);

  expect(add.description).toBe("test description");
  expect(add.lat).toBe(30);
  expect(add.lon).toBe(89);
  expect(add.name).toBe("Test");
  expect(add.price).toBe(300);
  expect(add.url).toBe("http://www.test.com");
});

test("Validates invalid price", () => {
  expect(() => new AddRecord({ ...defaultObject, price: -2 })).toThrow(
    "Ad's price cannot be less than 0 or higher than 9999999."
  );
});
