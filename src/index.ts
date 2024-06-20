import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createStudent(name: string, email: string) {
    const student = await prisma.student.create({
        data: {
            name: name,
            email: email,
        },
    });
    console.table(student);
}

async function createTeacher(name: string, email: string) {
    const teacher = await prisma.teacher.create({
        data: {
            name: name,
            email: email,
        },
    });
    console.table(teacher);
}

async function createCourse(name: string, teacher: string) {
    const course = await prisma.course.create({
        data: {
            name: name,
            teacherId: teacher,
        },
    });
}

async function addStudentToCourse(courseName: string, studentEmail: string) {
    const course = await prisma.course.findFirst({
        where: {
            name: courseName,
        },
    });

    const student = await prisma.student.findUnique({
        where: {
            email: studentEmail,
        },
    });
    await prisma.course.update({
        where: {
            id: course?.id,
        },
        data: {
            students: {
                connect: {
                    id: student?.id,
                },
            },
        },
    });
}

async function getAllCourses() {
    const courses = await prisma.course.findMany({
        include: {
            students: true,
        },
    });
    return courses;
}

async function getStudents(search?: string) {
    const students = await prisma.student.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: search,
                    },
                },
                {
                    email: {
                        contains: search,
                    },
                },
            ],
        },
    });
    console.table(students);
}

// createStudent("Maria", "maria@lexicon.se")
// createStudent("Victor", "victor@abc.se");
// createTeacher("Nalini", "nalini@lexicon.se")
// createCourse("Programming", "clxmy5dgu0003s8shmc7c224g")
// addStudentToCourse("Programming", "maria@lexicon.se")
// getStudents("lexicon");
getAllCourses().then(async (courses) => {
    courses.forEach((course) => {
        console.log(course.name);
        console.table(course.students);
    });
});
