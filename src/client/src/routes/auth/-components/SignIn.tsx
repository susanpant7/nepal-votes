import { useState } from "react"
import MobileNumberPage from "./MobileNumberPage"
import OtpPage from "./OtpPage"

const SignIn = () => {
    const [mobileNumber, setMobileNumber] = useState<string | null>(null)

    if (!mobileNumber) {
        return <MobileNumberPage onOtpSent={setMobileNumber} />
    }

    return <OtpPage mobileNumber={mobileNumber} />
}

export default SignIn
