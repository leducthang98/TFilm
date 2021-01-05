import { STATUS } from "../constant/Status"

export const commonResponse = (pureResponse, code = STATUS.OK.CODE, message = STATUS.OK.MESSAGE) => {
    return {
        signal: code,
        message: message,
        data: pureResponse
    }
}