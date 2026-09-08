import prisma from "../lib/prisma";

// Plano Pro
export async function planoProService(idUser: string) {

    // Buscando o Usuario
    const user = await prisma.usuarios.findUnique({
        where: {
            id: idUser
        }
    });

    if (!user) {
       throw new Error("Usuario não existe");
    };

    // Atualizando o Plano
    const atualizandoPlanoPro = await prisma.usuarios.update({
        where: {
            id: idUser
        },
        data: {
            plano: "pro",
            analises: 20
        }
    });

    if (atualizandoPlanoPro.plano === "pro") {
        return;
    };

    return atualizandoPlanoPro;

};


// Plano Full
export async function planoFullService(idUser: string) {

    // Buscando o Usuario
    const user = await prisma.usuarios.findUnique({
        where: {
            id: idUser
        }
    });

    // Verificando se o usuario existe
    if (!user) {
        throw new Error("Usuario não existe");
    };

    
    // Atualizando o Plano para o Full
    const atualizandoPlanoFull = await prisma.usuarios.update({
        where: {
            id: idUser
        },
        data: {
            plano: "full",
            analises: 500,
            historico: true
        }
    });

    return atualizandoPlanoFull;

};