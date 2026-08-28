// try to avoid using statis in playwright as it leases to unsual error in parallel runs

class Student{
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

    static getstudentDetails(){
        console.log(`Student Name: ${this.name}`);
        console.log(`Roll No: ${this.rollNo}`);
        console.log(`Grade: ${this.grade}`);
        console.log(`Course Name: ${this.courseName}`);
    }
}

// Object Creation
const student1 = new Student('Dhoni', 1705013, 'A', 'CSE');
//student1.getstudentDetails(); // Throws error because static function should be called with class name and notby object name
Student.getstudentDetails();