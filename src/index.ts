import fs from "fs";
import { InvalidInput } from "./errors/invalid-input";

const validateInput = (
  students: Array<string>,
  topics: Array<string>,
  teamCount: number
) => {
  if (teamCount > students.length)
    throw new InvalidInput(
      "The team count can't be grater than the number of students."
    );

  const uniqueStudents = new Set<string>();

  for (const student of students) {
    if (uniqueStudents.has(student))
      throw new InvalidInput("We can't have repeated students.");

    uniqueStudents.add(student);
  }
};

export const organizeTeams = (
  students: string,
  topics: string,
  teamCount: number
): void => {
  const studentsFile: string = fs.readFileSync(students, {
    encoding: "utf-8",
    flag: "r",
  });

  const studentsList: Array<string> = studentsFile.split(/\r?\n/);

  const topicsFile: string = fs.readFileSync(topics, {
    encoding: "utf-8",
    flag: "r",
  });

  const topicsList: Array<string> = topicsFile.split(/\r?\n/);

  validateInput(studentsList, topicsList, teamCount);
};
