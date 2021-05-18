import { organizeTeams } from "../index";
import { InvalidInput } from "../errors/invalid-input";

describe("organizeTeams", () => {
  const students: string = "src/files/students.txt";
  const topics: string = "src/files/topics.txt";

  it("Should throw an error if students are repeated", () => {
    const func = organizeTeams;

    try {
      func(students, topics, 3);
    } catch {
      expect(func).toThrow("We can't have repeated students.");
    }
  });

  it("Should throw an error if topics are repeated", () => {
    const func = organizeTeams;

    try {
      func(students, topics, 3);
    } catch {
      expect(func).toThrow("We can't have repeated topics.");
    }
  });
});
