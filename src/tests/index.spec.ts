import { organizeTeams, validateTypes, Team } from '../index';

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

  const random = async(): Promise <boolean>=> {
    const students: string = "src/files/students.txt";
    const topics: string = "src/files/topics.txt";
    const teamCount: number = 5;
  
    validateTypes(students, topics,teamCount)
    const studentsFile: string  = await fs.promises.readFile(students, "utf8")
  
  const studentsList: Array<string> = studentsFile.split(/\r?\n/);
  
    const probabity = (1/teamCount)
    const specificArray: Array<string> = []
    let loop: number = 100
    let temp: string = ""
  
  for(let k = 0; k< loop; k++){
  const arrayTeam: Array<Team> = await organizeTeams(students,topics,teamCount)
  
  
  for(let i = 0; i < arrayTeam.length; i++){
  for(let j = 0; j < arrayTeam[i].students.length; j++){
    
    if(arrayTeam[i].students[j] == studentsList[0]){
      specificArray.push(arrayTeam[i].students[j] + " " + i + " " +arrayTeam[i].topic)
    }
    }
  }
  }
  temp = specificArray[0];
  let count: number = 0
  for(let i = 0; i< specificArray.length; i++){
    if(temp == specificArray[i]){
      count+=1
    }
  }
  const repeatedCount: number = count/loop;
  const isRandom: boolean = repeatedCount <= probabity 
  
  return isRandom
  }

  it("Validate random", async () => {
    expect(await random()).toBe(true)
    
  });
});
