import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT
const DBURL = process.env.DBURL

export default { PORT, DBURL }
