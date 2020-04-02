import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import LoadTasks from '@/usecases/LoadTasks'
import CreateTask from '@/usecases/CreateTask'
import GetTask from '@/usecases/GetTask'
import UpdateTask from '@/usecases/UpdateTask'
import StartTask from '@/usecases/StartTask'
import PauseTask from '@/usecases/PauseTask'
import ResumeTask from '@/usecases/ResumeTask'
import StopTask from '@/usecases/StopTask'
import RestartTask from '@/usecases/RestartTask'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production'
    ? process.env.CORS_ORIGIN
    : '*'
  })
)
const router = express.Router()

router.get('/tasks', async (request, response) => {
  const useCase = new LoadTasks()
  response.json(await useCase.exec()).end()
})

router.get('/task/:id', async (request, response) => {
  const useCase = new GetTask()
  const { id } = request.params
  response.json(await useCase.exec(id)).end()
})

router.patch('/task/:id', async (request, response) => {
  const useCase = new UpdateTask()
  const { id } = request.params
  await useCase.exec(id, request.body)
  response.status(204).end()
})

router.patch('/task/start/:id', async (request, response) => {
  const useCase = new StartTask()
  try {
    const { id } = request.params
    response.json(await useCase.exec(id)).end()
  } catch ({ message }) {
    response.status(405).json({ message }).end()
  }
})

router.patch('/task/pause/:id', async (request, response) => {
  const useCase = new PauseTask()
  try {
    const { id } = request.params
    response.json(await useCase.exec(id)).end()
  } catch ({ message }) {
    response.status(405).json({ message }).end()
  }
})

router.patch('/task/resume/:id', async (request, response) => {
  const useCase = new ResumeTask()
  try {
    const { id } = request.params
    response.json(await useCase.exec(id)).end()
  } catch ({ message }) {
    response.status(405).json({ message }).end()
  }
})

router.patch('/task/stop/:id', async (request, response) => {
  const useCase = new StopTask()
  try {
    const { id } = request.params
    response.json(await useCase.exec(id)).end()
  } catch ({ message }) {
    response.status(405).json({ message }).end()
  }
})

router.patch('/task/restart/:id', async (request, response) => {
  const useCase = new RestartTask()
  try {
    const { id } = request.params
    response.json(await useCase.exec(id)).end()
  } catch ({ message }) {
    response.status(405).json({ message }).end()
  }
})

router.post('/task', async (request, response) => {
  const useCase = new CreateTask()
  const result = await useCase.exec(request.body)
  await response.status(201).json(result).end()
})

app.use('/api', router)

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server api is running at ${port}`)
})
