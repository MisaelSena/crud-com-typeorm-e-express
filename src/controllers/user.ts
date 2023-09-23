import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/user";

//Cadastro de Usuário
export const cadastrarUsuario = async (req: Request, res: Response) => {
  try {
    const user = new User();
    user.nome = req.body.nome;
    user.email = req.body.email;
    user.senha = req.body.senha;
    user.cargo = req.body.cargo;

    await AppDataSource.getRepository(User).save(user);
    console.log("Usuário Cadastrado com Sucesso!");

    return res.status(201).json({
      ok: true,
      mensagem: "Cadastrado com Sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      ok: true,
      mensagem: "Erro ao cadastar usuário!",
    });
  }
};

//Leitura de Todos os usuários

export const mostrarUsuarios = async (req: Request, res: Response) => {
  try {
    const users = await AppDataSource.getRepository(User).find();

    return res.status(200).json({
      ok: true,
      users: users,
    });
  } catch (error) {
    console.log(error, "Erro ao Listar os Usuários!");

    return res.status(500).json({
      ok: false,
      mensagem: "Erro ao Listar os Usuários!",
    });
  }
};

//Atualizando Usuário

export const atualizaUsuario = async (req: Request, res: Response) => {
  const id = req.params.id_usuario;
  try {
    const user = await AppDataSource.getRepository(User).findOne({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        mensagem: "Usuário Não encontrado!",
      });
    }

    if (req.body.nome) {
      user.nome = req.body.nome;
    }

    if (req.body.email) {
      user.email = req.body.email;
    }

    if (req.body.senha) {
      user.senha = req.body.senha;
    }

    if (req.body.cargo) {
      user.cargo = req.body.cargo;
    }

    await AppDataSource.getRepository(User).save(user);

    return res.status(200).json({
      ok: true,
      mensagem: "Usuário Atualizado com Sucesso!",
    });
  } catch (error) {
    console.log(error, "Erro ao Atualizar Usuário!");
    return res.status(500).json({
      ok: false,
      mensagem: "Erro ao Atualizar usuário!",
    });
  }
};
