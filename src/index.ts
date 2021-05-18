import fs from "fs";
import { InvalidInput } from "./errors/invalid-input";

const shuffle = (val:Array<any>): Array<string> => {
  const shuffle:Array<string> = val.map((a) => ({sort: Math.random, value: a}))
  .sort((a: any ,b: any) => a.sort - b.sort)
  .map((a) => a.value)
return shuffle
}

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

  const shuffleStudent: Array<string> = shuffle(studentsList)

  const shuffleTopics: Array<string> = shuffle(topicsList)

  let distribution = studentsList.length / teamCount

  let remainder = studentsList.length % teamCount
};

(() => {
  organizeTeams(
    "/Users/luismiguelrosareyes/Documents/Team_Division/src/files/students.txt",
    "/Users/luismiguelrosareyes/Documents/Team_Division/src/files/topics.txt",
    2
  )
})();