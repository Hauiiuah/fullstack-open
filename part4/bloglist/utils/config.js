import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT
const DBURL = process.env.NODE_ENV=== 'test' ? process.env.TEST_DBURL : process.env.DBURL

export default { PORT, DBURL }
