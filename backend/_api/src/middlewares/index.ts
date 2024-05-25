import bodyParser from 'body-parser';
import helmet from 'helmet';

export default [
    helmet(),
    bodyParser.urlencoded({ limit: '30mb', extended: true }),
    bodyParser.json({ limit: '150mb' })
]
