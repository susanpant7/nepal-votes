import { useState } from "react"
import {MobileNumber} from "@/features/auth/components/mobile-number.tsx";
import {Otp} from "@/features/auth/components/otp.tsx";

export const SignIn = () => {
    const [mobileNumber, setMobileNumber] = useState<string | null>(null)
    const resendOtp = () => {
        setMobileNumber(null)
    }
    if (!mobileNumber) {
        return <MobileNumber onOtpSent={setMobileNumber} />
    }

    return <Otp mobileNumber={mobileNumber} resendOtp = {resendOtp} />
}