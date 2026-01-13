import { useState } from "react"
import MobileNumberPage from "./MobileNumberPage"
import OtpPage from "./OtpPage"

const SignIn = () => {
    const [mobileNumber, setMobileNumber] = useState<string | null>(null)
    const resendOtp = () => {
        setMobileNumber(null)
    }
    if (!mobileNumber) {
        return <MobileNumberPage onOtpSent={setMobileNumber} />
    }

    return <OtpPage mobileNumber={mobileNumber} resendOtp = {resendOtp} />
}

export default SignIn
