import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createStudent(name: string, email: string) {
    const student = await prisma.student.create({
        data: {
            name: name,
            email: email
        }
    })
    console.log(student);
}

async function addCourse(name: string, teacher: string) {
    const course = await prisma.course.create({
        data: {
            name: name,
            teacherId: teacher
        }
    })
}

async function addStudentToCourse(courseName: string, studentEmail: string) {
    const course = await prisma.course.findFirst({
        where: {
            name: courseName
        }
    })

    const student = await prisma.student.findFirst({
        where: {
            email: studentEmail
        }
    })
    await prisma.course.update({
        where: {
            id: course?.id
        },
        data: {
            students: {
                connect: {
                    id: student?.id
                }
            }
        }
    })
}

// createStudent("Maria", "maria@lexicon.se")
// addCourse("Programming", "clxmy5dgu0003s8shmc7c224g")
// addStudentToCourse("Programming", "maria@lexicon.se")

