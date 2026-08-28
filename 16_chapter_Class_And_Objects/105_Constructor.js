class DefaultStudent{
    name;
    rollNo;
    grade;
    courseName;

    // Default Constructor
    constructor(){
        this.name = "Default name";
        this.rollNo = 1;
        this.grade = 'grade';
        this.courseName = 'courseName';
    }

    getstudentDetails(){
        console.log(`Student Name: ${this.name}`);
        console.log(`Roll No: ${this.rollNo}`);
        console.log(`Grade: ${this.grade}`);
        console.log(`Course Name: ${this.courseName}`);
    }
}

class Student{
    name;
    rollNo;
    grade;
    courseName;

    // Parameterised Constructor
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
const student1 = new Student('Dhoni', 1705013, 'A', 'CSE');
student1.getstudentDetails(); // Parametrised Construcore

const student2 = new DefaultStudent();
student2.getstudentDetails(); // Default Constructor