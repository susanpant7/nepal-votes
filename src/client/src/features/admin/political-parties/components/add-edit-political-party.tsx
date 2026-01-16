import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "@tanstack/react-router";
import {ChevronLeft} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useEffect, useState} from "react";
import * as React from "react";
import {ImageField} from "@/components/ui/image-field.tsx";
import type {
    AddEditPoliticalPartyRequest,
    PoliticalPartyInfo
} from "@/features/admin/political-parties/types/admin.political-parties.types.ts";
import {UserSearchDropdown} from "@/features/users/user-search/components/user-search-dropdown.tsx";

export interface AddEditPoliticalPartyProps {
    isEdit?: boolean,
    politicalPartyInfo?: PoliticalPartyInfo
}

const AddEditPoliticalParty = (props:AddEditPoliticalPartyProps) => {
    const {isEdit, politicalPartyInfo} = props;
    
    const navigate = useNavigate();
    
    const [partyDetails,setPartyDetails] = useState<AddEditPoliticalPartyRequest>({
        politicalPartyId: politicalPartyInfo?.politicalPartyId || 0,
        politicalPartyName: politicalPartyInfo?.politicalPartyName||"",
        partyLeaderId: politicalPartyInfo?.partyLeaderId || 0,
        partySymbolContent: politicalPartyInfo?.partySymbolContent || null,
    })
    
    const [disableSave, setDisableSave] = useState<boolean>(true);

    useEffect(() => {
        setDisableSave(
            !partyDetails.politicalPartyName?.trim() || 
            !partyDetails.partySymbolContent
        );
    }, [partyDetails]);
    
    const onPartyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const partyName = e.target.value
        setPartyDetails((prev)=>({...prev, politicalPartyName: partyName}))
    }
    
    const onPartyLeaderSelected = (partyLeaderId: number) => {
        setPartyDetails((prev)=>({...prev, partyLeaderId: partyLeaderId}))
    }

    const onPartySymbolChange = (file: File | null) => {
        setPartyDetails(prev => ({ ...prev, partySymbolContent: file }));
        setDisableSave(!file && !partyDetails.partySymbolContent);
    };
    
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("FORM DATA:", partyDetails);
    };
    
    return (
        <div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate({ to: "/admin/political-parties" })}
                        className="mb-2 -ml-2 text-muted-foreground"
                    >
                        <ChevronLeft className="mr-1 h-4 w-4" /> Back to Parties
                    </Button>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                        {isEdit ? "Edit Party Profile" : "Create Political Party"}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Fill in the details below to {isEdit ? "update the" : "register a new"} political organization.
                    </p>
                </div>
            </div>

            <form onSubmit={onSubmit}>
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="partyName">Party Name :</Label>
                    <Input id="partyName" type="text" value={partyDetails.politicalPartyName}
                    onChange={onPartyNameChange}/>
                </div>

                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="partyName">Party Leader :</Label>
                    <UserSearchDropdown onSelect={onPartyLeaderSelected} 
                                        currentUserName={politicalPartyInfo?.partyLeaderName??""} />
                </div>

                <div className="grid w-full items-center gap-3">
                    <ImageField
                        label="Party Symbol"
                        value={partyDetails.partySymbolContent}
                        onChange={onPartySymbolChange}
                        maxSizeMB={3}
                    />
                </div>
                
                <Button type="submit" disabled={disableSave}>
                    {isEdit ? "Update Party" : "Create Party"}
                </Button>
            </form>

        </div>
        
    );
};

export default AddEditPoliticalParty;