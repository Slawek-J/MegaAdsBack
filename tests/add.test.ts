import { AddRecord } from "../records/add.record";

test("AddRecord returns data from database for one entry", async () => {
  const ad = await AddRecord.getOne("abc");
  console.log(ad);
  expect(ad).toBeDefined();
  expect(ad?.id).toBe("abc");
  expect(ad?.name).toBe("Test");
});

test("AddRecord returns null from database for unexisting entry", async () => {
  const ad = await AddRecord.getOne("---");
  expect(ad).toBeNull();
});
