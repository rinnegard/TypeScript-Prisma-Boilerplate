import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

// import type { User } from "@prisma/client"

type UserNoId = Omit<User, "id">;

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
            id: true,
            name: true
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

async function createUserMany(...rest: UserNoId[]) {
    const result = await prisma.user.createMany({
        data: rest
    })
    console.log(result);
    
}

const victor: UserNoId = {
    name: "Victor",
    email: "victor@abc.com",
    age: 20
}

const alexander: UserNoId = {
    name: "Alexander",
    email: "alexander@abc.com",
    age: 25
}

const sebastian: UserNoId = {
    name: "Sebastian",
    email: "sebastian@abc.com",
    age: 30
}

// createUser("Alexander", "alexander@abc.com");
// getUserById(2);
// updateUser(1, "Victor Rinnegård");
// deleteUser(2)
// deleteUser(3)
// createUserMany(victor, alexander, sebastian);
listUsers();