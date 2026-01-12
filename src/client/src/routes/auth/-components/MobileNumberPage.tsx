import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone } from "lucide-react"
import { useState } from "react"
import * as React from "react"
import { SendOtp } from "@/routes/auth/-api/AuthApi"

interface MobileNumberPageProps {
    onOtpSent: (mobileNumber: string) => void
}

const MobileNumberPage = ({ onOtpSent }: MobileNumberPageProps) => {
    const [mobileNumber, setMobileNumber] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const otpResp = SendOtp(mobileNumber)
        if (otpResp) {
            alert("An OTP has been sent to your mobile number")
            onOtpSent(mobileNumber)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1 text-center">
                <h2 className="text-xl font-semibold tracking-tight">
                    Welcome back
                </h2>
                <p className="text-sm text-muted-foreground">
                    Sign in using your registered mobile number
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <div className="relative">
                    <Phone className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="mobile"
                        type="tel"
                        placeholder="Enter your mobile number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="pl-10 h-12"
                        required
                    />
                </div>
            </div>

            <Button type="submit" className="h-12 w-full">
                Send OTP
            </Button>
        </form>
    )
}

export default MobileNumberPage
