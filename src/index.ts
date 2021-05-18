import fs from "fs";
import { InvalidInput } from "./errors/invalid-input";

interface Param {
  distribution: number;
  shuffledStudent: Array<string>;
  shuffledTopics: Array<string>;
  teamCount: number;
  remainder?: number;
}

interface Team {
  students: Array<string>;
  topic: string;
}
// const random = (): boolean => {
//   const students: string = "src/files/students.txt";
//   const topics: string = "src/files/topics.txt";
//   const teamCount: number = 2;

//   validateTypes(students, topics,teamCount)
//   fs.readFile(students, "utf8", (err, studentsFile) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     const studentsList: Array<string> = studentsFile.split(/\r?\n/);
//   });

//   const probabity = (1/teamCount)
//   const specificArray: Array<string> = []
//   let loop: number = 100
//   let temp: string = ""

// for(let i = 0; i< loop; i++){
// const arrayTeam: Array<Team> = organizeTeams(students,topics,teamCount)

// for(let j = 0; j < arrayTeam[i].students.length; j++){
//   console.log(arrayTeam[i].students[j] + " " + i + " " +arrayTeam[i].topic);

// specificArray.push(arrayTeam[i].students[j] + " " + i + " " +arrayTeam[i].topic)
// }
// }
// temp = specificArray[0];

// return true
// }
const shuffle = (val: Array<any>): Array<any> => {
  const shuffledArr: Array<string> = val
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a: any, b: any) => a.sort - b.sort)
    .map((a) => a.value);
  return shuffledArr;
};

const validateTypes = (students: any, topics: any, teamCount: any) => {
  if (typeof students !== "string" || typeof topics !== "string") {
    throw new InvalidInput("The students and topics must be strings.");
  }
  if (typeof teamCount !== "number") {
    throw new InvalidInput("The number of teams must be a numeric value.");
  }
};

const validateInput = (
  students: Array<string>,
  topics: Array<string>,
  teamCount: number
) => {
  if (teamCount > students.length)
    throw new InvalidInput(
      "The team count can't be grater than the number of students."
    );

  const uniqueStudents: Set<string> = new Set<string>();

  for (const student of students) {
    if (uniqueStudents.has(student))
      throw new InvalidInput("We can't have repeated students.");

    uniqueStudents.add(student);
  }

  const uniqueTopics: Set<string> = new Set<string>();

  for (const topic of topics) {
    if (uniqueTopics.has(topic))
      throw new InvalidInput("We can't have repeated topics.");

    uniqueTopics.add(topic);
  }

  if (students.length < topics.length)
    throw new InvalidInput(
      "The number of students can't be less than the number of topics."
    );
  if (students.length < teamCount)
    throw new InvalidInput(
      "The number of students can't be less than the number of the groups."
    );
};

const Oddcases = (params: Param): Array<Team> => {
  const {
    distribution,
    shuffledStudent,
    shuffledTopics,
    teamCount,
    remainder,
  } = params;

  const teams: Array<Team> = [];
  const exactCases = shuffledStudent.length - remainder!;
  const evenDistribution: number = exactCases / teamCount;
  let DistributionE = evenDistribution;
  let studentsF: Array<any> = [];
  let count: number = 0;
  let StudentsT: Array<string> = [];

  for (let i = 0; i < teamCount; i++) {
    const StudentToIn: Array<string> = shuffledStudent.slice(
      count,
      DistributionE
    );
    studentsF.push(StudentToIn);
    StudentsT.push(...StudentToIn);
    count += DistributionE;
    DistributionE += evenDistribution;
  }
  for (let i = 0; i < teamCount; i++)
    teams.push({ students: [...studentsF[i]], topic: shuffledTopics[i] });

  const ShuffledTeams: Array<Team> = shuffle(teams);
  const remainingstudents: Array<string> = shuffledStudent.filter(
    (x) => !StudentsT.includes(x)
  );
  for (let i = 0; i < remainingstudents.length; i++)
    ShuffledTeams[i].students.push(remainingstudents[i]);
  return ShuffledTeams;
};

const caseExact = (params: Param): Array<Team> => {
  const { distribution, shuffledStudent, shuffledTopics, teamCount } = params;

  const teams: Array<Team> = [];
  const studentsF: Array<any> = [];
  let count: number = 0;
  let distributionTemp: number = distribution;

  for (let i = 0; i < teamCount; i++) {
    studentsF.push(shuffledStudent.slice(count, distributionTemp));

    count += distribution;
    distributionTemp += distribution;
  }

  for (let i = 0; i < teamCount; i++) {
    teams.push({
      students: [...studentsF[i]],
      topic: shuffledTopics[i],
    });
  }

  return teams;
};

export const organizeTeams = async (
  students: string,
  topics: string,
  teamCount: number
): Promise<Array<Team>> => {
  try {
    validateTypes(students, topics, teamCount);
    let teams: Array<Team> = [];

    const studentsFile: string = await fs.promises.readFile(students, "utf-8");

    const studentsList: Array<string> = studentsFile.split(/\r?\n/);

    const topicsFile: string = await fs.promises.readFile(topics, "utf-8");

    const topicsList: Array<string> = topicsFile.split(/\r?\n/);

    validateInput(studentsList, topicsList, teamCount);

    const shuffledStudent: Array<string> = shuffle(studentsList);

    const shuffledTopics: Array<string> = shuffle(topicsList);

    const distribution = studentsList.length / teamCount;

    const remainder = studentsList.length % teamCount;

    if (remainder === 0)
      teams = caseExact({
        distribution,
        shuffledStudent,
        shuffledTopics,
        teamCount,
      });
    else
      teams = Oddcases({
        distribution,
        shuffledStudent,
        shuffledTopics,
        teamCount,
        remainder,
      });

    return teams;
  } catch (error) {
    console.log(error);

    return error;
  }
};

(async () => {
  const students: string = "src/files/students.txt";
  const topics: string = "src/files/topics.txt";

  const teams = await organizeTeams(students, topics, 2);
  console.log(teams);

  //random()
})();
