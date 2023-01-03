import { Config } from 'convict'
import ClientConfig from './ClientConfig'

type AppConfig = Config<{
  client: ClientConfig
}>

export default AppConfig
