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

  it("Should throw an error if the number of students is less than the number of topics", () => {
    const func = organizeTeams;

    try {
      func(students,topics, 2);
    } catch {
      expect(func).toThrow("The number of students can't be less than the number of topics.")
    }
  });
  it("Should throw an error if the number of students is less than the number of the groups", () => { 
    const func = organizeTeams;
   
    try
    {
func(students,topics, 15);
    } 
    catch
    {
      expect(func).toThrow("The number of students can't be less than the number of the groups.")
    }
  });

  it("The first two arguments must be strings", () => {
    const func:any = organizeTeams;

    try {
      func(3,2, 2);
    } catch {
      expect(func).toThrow("The students and topics must be strings.")
    }
  });

  it("The last argument must be number", () => {
    const func:any = organizeTeams;

    try {
      func(students,topics, "2");
    } catch {
      expect(func).toThrow("The number of teams must be a numeric value.")
    }
  });
});
