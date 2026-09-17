import prisma from "../lib/prisma";
import {emailServico} from "../services/emailService";

export async function novoCodigoDeAcessoService(emailDoUsuario: string) {
    
    //########### SERVICE ############

    const codigoGerado = Math.floor(1000000 + Math.random() * 10000000).toString(); 

    const usuario = await prisma.usuarios.findUnique({
        where: {
            email: emailDoUsuario
        }
    });

    if (!usuario) {
        throw new Error("Usuario não existe"); 
    };

    if (usuario.tentativasDoCodigo === 4) {

        const atualizandoOCodigoDeAcesso = await prisma.usuarios.update({
            where: {
                id: usuario.id
            },
            data:{
                codigoDeVerificacao:codigoGerado,
                tentativasDoCodigo: 0
            }
        });

        const emailUser: string = usuario.email;
        // 
        await emailServico(emailUser, codigoGerado);
        // 
        return  atualizandoOCodigoDeAcesso;
    };
     
};