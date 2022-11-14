import { HistoryManager } from "util/historyManager";

test("test historyManager", () => {
  const historyManager = new HistoryManager();
  historyManager.add(1);
  historyManager.add(2);
  historyManager.add(3);
  expect(historyManager.next()).toEqual(null);
  expect(historyManager.last()).toEqual(2);
  expect(historyManager.next()).toEqual(3);
  expect(historyManager.last()).toEqual(2);
  expect(historyManager.last()).toEqual(1);
  expect(historyManager.last()).toEqual(null);
  historyManager.add(4);
  expect(historyManager.last()).toEqual(1);
  expect(historyManager.next()).toEqual(4);
  expect(historyManager.next()).toEqual(null);

  const limitHistory = new HistoryManager(3);
  [1, 2, 3, 4, 5].forEach((i) => limitHistory.add(i));
  expect(limitHistory.next()).toEqual(null);
  expect(limitHistory.last()).toEqual(4);
  expect(limitHistory.last()).toEqual(3);
  expect(limitHistory.last()).toEqual(null);
});
