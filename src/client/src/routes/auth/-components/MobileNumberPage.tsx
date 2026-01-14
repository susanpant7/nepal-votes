import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone } from "lucide-react"
import { useState } from "react"
import * as React from "react"
import {Spinner} from "@/components/ui/spinner.tsx";
import AuthApi from "@/routes/auth/-api/auth-api.ts";

interface MobileNumberPageProps {
    onOtpSent: (mobileNumber: string) => void
}

const MobileNumberPage = ({ onOtpSent }: MobileNumberPageProps) => {
    const [mobileNumber, setMobileNumber] = useState("")
    const [loading, setLoading] = useState<boolean>(false)
    
    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault()
        try {
            const otpResp = await AuthApi.getOtp({mobileNumber:mobileNumber})
            if (otpResp) {
                onOtpSent(mobileNumber)
            }
        } catch (e) {
            
        } finally {
            setLoading(false)
        }
        
    }
    
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1 text-center">
                <h2 className="text-xl font-semibold tracking-tight">Welcome back</h2>
                <p className="text-sm text-muted-foreground">
                    Sign in using your registered mobile number
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="mobile" className={loading ? "opacity-70" : ""}>
                        Mobile Number
                    </Label>
                    <div className="relative">
                        <Phone className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                            id="mobile"
                            type="tel"
                            placeholder="Enter your mobile number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            className="pl-10 h-12"
                            disabled={loading}
                            required
                        />
                    </div>
                </div>

                <Button type="submit" className="h-12 w-full" disabled={loading}>
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <Spinner className="size-5 animate-spin" />
                            <span>Sending OTP...</span>
                        </div>
                    ) : (
                        "Send OTP"
                    )}
                </Button>
            </div>
        </form>
    )
}

export default MobileNumberPage
