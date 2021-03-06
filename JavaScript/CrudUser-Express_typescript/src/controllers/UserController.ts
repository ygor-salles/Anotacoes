import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from 'yup'

class UserController {
    async create(req: Request, resp: Response) {
        const { name, email } = req.body

        const schema = yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            email: yup.string().email().required('Email incorreto')
        })

        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return resp.status(400).json({ message: error })
        }

        const connectionUser = getCustomRepository(UsersRepository);

        const userAlreadyExists = await connectionUser.findOne({ email })

        if (userAlreadyExists) {
            return resp.status(404).json({ message: 'User already exists!' })
        }

        const user = connectionUser.create({ name, email })
        await connectionUser.save(user)
        return resp.status(201).json(user)
    }

    async ready(req: Request, resp: Response) {
        const connectionUser = getCustomRepository(UsersRepository)
        const allUsers = await connectionUser.find()
        return resp.json(allUsers)
    }

    async readyByEmail(req: Request, resp: Response) {
        const { email } = req.body

        const schema = yup.object().shape({
            email: yup.string().email('Email is required')
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return resp.status(400).json({ message: error })
        }

        const connectionUser = getCustomRepository(UsersRepository)
        const user = await connectionUser.findOne({ email })
        if (user) {
            return resp.json(user)
        }
        else {
            return resp.status(404).json({ message: 'User already exists!' })
        }

    }

    async delete(req: Request, resp: Response) {
        const { email } = req.body

        const schema = yup.object().shape({
            email: yup.string().email('Email is required')
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return resp.status(400).json({ message: error })
        }

        const connectionUser = getCustomRepository(UsersRepository)
        const user = await connectionUser.findOne({ email })
        if (user) {
            await connectionUser.delete(user.id)
            return resp.status(200).json({ message: 'User remove success!' })
        }
        else {
            return resp.status(400).json({ message: 'User already exists!' })
        }
    }

    async update(req: Request, resp: Response) {
        const { email } = req.body

        const schema = yup.object().shape({
            email: yup.string().email('Email is required')
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            return resp.status(400).json({ message: error })
        }

        const connectionUser = getCustomRepository(UsersRepository)
        const user = await connectionUser.findOne({ email })
        
        if (user) {
            await connectionUser.update(user.id, req.body)
            return resp.status(200).json({ message: 'User update success' })
        }

        return resp.status(404).json({ message: 'User not found' })
    }
}

export { UserController }