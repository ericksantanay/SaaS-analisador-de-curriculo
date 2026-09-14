import prisma from "../lib/prisma";
import {emailServico} from "../services/emailService";

export async function novoCodigoDeAcessoService(emailDoUsuario: string) {
    
    const codigoGerado = Math.floor(1000000 + Math.random() * 10000000).toString(); 

    const usuario = await prisma.usuarios.findFirst({
        where: {
            email: emailDoUsuario
        }
    });

    if (!usuario) {
        throw new Error("Usuario não existe"); 
    };

    if (usuario.codigoDeVerificacao === null && usuario.tentativasDoCodigo === 4) {

        const atualizandoOCodigoDeAcesso = await prisma.usuarios.update({
            where: {
                id: usuario.id
            },
            data:{
                codigoVerificacao:codigoGerado
            }
        });

        const emailUser: string = usuario.email

        emailServico(emailUser, codigoGerado);

        return  atualizandoOCodigoDeAcesso;
    };
     
};