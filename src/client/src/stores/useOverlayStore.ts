import {create} from "zustand";

interface OverlayState {
    overlayVisible: boolean;
    showOverlay: () => void;
    showOverlayWithMessage: (message:string) => void;
    overlayMessage: string;
    hideOverlay: () => void;
}

export const useOverlayStore = create<OverlayState>((set)=>({
    overlayVisible: false,
        
    showOverlay: ()=> set({overlayVisible:true}),
    showOverlayWithMessage: (message:string)=> set({overlayVisible:true,overlayMessage:message}),
    overlayMessage:"",
    hideOverlay: ()=> set({overlayVisible:false}),
}));