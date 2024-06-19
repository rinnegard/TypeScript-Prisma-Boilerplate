import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

// import type { User } from "@prisma/client"

async function createUser(name: string, email: string) {
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email
        }
    })

    console.log(user);
}

async function listUsers() {
    const users = await prisma.user.findMany({
        select: {
            name: true,
            email: true
        }
    });
    console.log(users);
}

async function getUserById(id: number) {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    console.log(user);
}

async function updateUser(id: number, name: string) {
    const result = await prisma.user.update({
        where: {id: id},
        data: {name: name}
    })
    console.log(result);
}

async function deleteUser(id: number) {
    const result = await prisma.user.delete({
        where: {id: id}
    })
    console.log(result);
    
}

// createUser("Alexander", "alexander@abc.com");
listUsers();
// getUserById(2);
// updateUser(1, "Victor Rinnegård");
// deleteUser(1)