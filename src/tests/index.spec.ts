import { organizeTeams } from "../index";

import fs from "fs";

describe("organizeTeams", () => {
  const students: string = "src/files/students.txt";
  const topics: string = "src/files/topics.txt";

  it("Should throw an error if students are repeated", async () => {
    const func = organizeTeams;

    try {
      await func(students, topics, 3);
    } catch {
      expect(func).toThrow("We can't have repeated students.");
    }
  });

  it("Should throw an error if topics are repeated", async () => {
    const func = organizeTeams;

    try {
      await func(students, topics, 3);
    } catch {
      expect(func).toThrow("We can't have repeated topics.");
    }
  });

  it("Should throw an error if the number of students is less than the number of topics", async () => {
    const func = organizeTeams;

    await func(students, topics, 2).catch(() => {
      expect(func).toThrow(
        "The number of students can't be less than the number of topics."
      );
    });
    //
  });

  it("Should throw an error if the number of students is less than the number of the groups", async () => {
    const func = organizeTeams;

    const studentsFile: string = await fs.promises.readFile(students, "utf-8");
    const studentsList: Array<string> = studentsFile.split(/\r?\n/);
    const teamCount = 40;

    if (studentsList.length < teamCount) {
      await func(students, topics, teamCount).catch(() => {
        expect(func).toThrow(
          "The number of students can't be less than the number of the groups."
        );
      });
    }
  });

  it("The first two arguments must be strings", async () => {
    const func: any = organizeTeams;

    try {
      await func(3, 2, 2);
    } catch {
      expect(func).toThrow("The students and topics must be strings.");
    }
  });

  it("The last argument must be a number", async () => {
    const func: any = organizeTeams;

    try {
      await func(students, topics, []);
    } catch {
      expect(func).toThrow("The number of teams must be a numeric value.");
    }
  });
});
