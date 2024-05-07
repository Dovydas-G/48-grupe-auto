import {createHash} from 'node:crypto'

const salt = '546545dsadasdasdasd5da'

export function hash(str) {
    return createHash('sha256', {encoding: 'utf8'}).update(salt + str).digest('hex')
}