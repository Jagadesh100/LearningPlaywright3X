class student{
    name;
    rollNo;
    grade;
    courseName;

    constructor(name, rollNo, grade, courseName){
        this.name = name;
        this.rollNo = rollNo;
        this.grade = grade;
        this.courseName = courseName;
    }

    getstudentDetails(){
        console.log(`Student Name: ${this.name}`);
        console.log(`Roll No: ${this.rollNo}`);
        console.log(`Grade: ${this.grade}`);
        console.log(`Course Name: ${this.courseName}`);
    }
}

// Object Creation
const student1 = new student('Dhoni', 1705013, 'A', 'CSE');
student1.getstudentDetails();