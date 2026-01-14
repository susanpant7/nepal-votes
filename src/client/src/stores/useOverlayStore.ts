import {create} from "zustand";

interface OverlayState {
    overlayVisible: boolean;
    showOverlay: () => void;
    hideOverlay: () => void;
}

export const useOverlayStore = create<OverlayState>((set)=>({
    overlayVisible: false,
        
    showOverlay: ()=> set({overlayVisible:true}),
    hideOverlay: ()=> set({overlayVisible:false}),
}));