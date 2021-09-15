import axios from "axios";

const instanceAuth = axios.create({
    baseURL: 'http://localhost:5000/api/auth/'
})

const instanceTask = axios.create({
    baseURL: 'http://localhost:5000/task/'
})

export const userAPI = {
    signIn(email: string, password: string) {
        return instanceAuth.post('/login', {email, password}).then(response => response.data)
    },
    signUp(email: string, password: string) {
        return instanceAuth.post('/register', {email, password}).then(response => response.data)
    }
}

export const taskAPI = {
    getTasks(owner: string) {
        return instanceTask.get(`/get/${owner}`).then(response => response.data)
    },
    addTask(owner: string, value: string | number) {
        return instanceTask.post('/add', {owner, value}).then(response => response.data)
    },
    updateTask(owner: string, value: string, isDone: boolean, isImportant: boolean) {
        return instanceTask.patch('/patch', {owner, value, isDone, isImportant}).then(response => response.data)
    },
    deleteTask(owner: string, value: string) {
        return instanceTask.patch('/delete', {owner, value}).then(response => response.data)
    }
}