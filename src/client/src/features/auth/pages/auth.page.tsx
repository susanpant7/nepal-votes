import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {SignIn} from "@/features/auth/components/sign-in.tsx";
import {SignUp} from "@/features/auth/components/sign-up.tsx";

export const AuthPage = () => {

    return (
        <div className="flex w-full justify-center">
            <Tabs
                defaultValue="sign-in"
                className="w-full max-w-md rounded-2xl border bg-card/80 p-6 shadow-xl backdrop-blur"
            >
                <TabsList className="grid grid-cols-2 rounded-xl bg-muted p-1">
                    <TabsTrigger
                        value="sign-in"
                        className="rounded-lg text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow"
                    >
                        Sign In
                    </TabsTrigger>
                    <TabsTrigger
                        value="sign-up"
                        className="rounded-lg text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow"
                    >
                        Sign Up
                    </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                    <TabsContent value="sign-in" className="space-y-4">
                        <SignIn />
                    </TabsContent>

                    <TabsContent value="sign-up" className="space-y-4">
                        <SignUp />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )

};