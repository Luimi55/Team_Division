import fs from "fs";
import { InvalidInput } from "./errors/invalid-input";

interface Param {
  distribution: number;
  shuffledStudent: Array<string>;
  shuffledTopics: Array<string>;
  teamCount: number;
}

interface Team {
  students: Array<string>;
  topic: string;
}

const shuffle = (val:Array<any>): Array<string> => {
  const shuffledArr:Array<string> = val.map((a) => ({sort: Math.random(), value: a}))   
  .sort((a: any ,b: any) => a.sort - b.sort)
  .map((a) => a.value)
return shuffledArr
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

const caseExact = (params: Param): Array<Team> => {
const {distribution, shuffledStudent, shuffledTopics, teamCount} = params;

const teams: Array<Team> = [];
const studentsF: Array<any> = [];
let count: number = 0;
let distributionTemp: number = distribution;

for (let i = 0; i < teamCount; i++){
studentsF.push(shuffledStudent.slice(count, distributionTemp));

count += distribution;
distributionTemp += distribution;
}

for (let i = 0; i < teamCount; i++){
  teams.push({
    students: [...studentsF[i]],
    topic: shuffledTopics[i],
  });
}

return teams;

}

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

  const shuffledStudent: Array<string> = shuffle(studentsList)

  const shuffledTopics: Array<string> = shuffle(topicsList)

  let distribution = studentsList.length / teamCount

  let remainder = studentsList.length % teamCount

  if (remainder === 0){
    const teams = caseExact({
      distribution, 
      shuffledStudent,
      shuffledTopics,
      teamCount,
    }
    )
    console.log(teams);
  }    

};

(() => {
  organizeTeams(
    "C:/Users/ferna/projects/divide/Team_Division/src/files/students.txt",
    "C:/Users/ferna/projects/divide/Team_Division/src/files/topics.txt",
    2
  )
})();