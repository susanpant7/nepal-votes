import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { KeyRound } from "lucide-react"
import { useState } from "react"
import * as React from "react"
import { useAuthStore } from "@/stores/useAuthStore"
import { useNavigate } from "@tanstack/react-router"

interface OtpPageProps {
    mobileNumber: string
}

const OtpPage = ({ mobileNumber }: OtpPageProps) => {
    const [otp, setOtp] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (otp === "123456") {
            alert("Login successful")
            useAuthStore.getState().loginAsAdmin()
            await navigate({ to: "/admin" })
        } else {
            alert("Invalid OTP")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1 text-center">
                <h2 className="text-xl font-semibold tracking-tight">
                    Enter OTP
                </h2>
                <p className="text-sm text-muted-foreground">
                    OTP sent to {mobileNumber}
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="otp">One Time Password</Label>
                <div className="relative">
                    <KeyRound className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="otp"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="pl-10 h-12 tracking-widest text-center"
                        required
                    />
                </div>
            </div>

            <Button type="submit" className="h-12 w-full">
                Log In
            </Button>
        </form>
    )
}

export default OtpPage
