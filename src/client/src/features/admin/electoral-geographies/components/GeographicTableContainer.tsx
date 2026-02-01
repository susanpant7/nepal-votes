import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

export interface GoBackProps {
  provinceName: string;
  backToProvinces: () => void;
  districtName?: string;
  backToDistricts?: () => void;
  municipalityName?: string;
  backToMunicipalities?: () => void;
  wardName?: string;
  backToWards?: () => void;
}
export interface TableHeaderProps {
  module: string;
  onAdd: () => void;
  children: React.ReactNode;
  goBackProps?: GoBackProps;
  allowAddEdit: boolean;
}

export const GeographicTableContainer = (props: TableHeaderProps) => {
  const { goBackProps, allowAddEdit } = props;

  const getBreadcrumbs = () => {
    if (!goBackProps) return { crumbs: [], placeHierarchy: "" };
    const crumbs = [];
    let placeHierarchy = "";
    if (goBackProps.provinceName) {
      crumbs.push({
        label: "Provinces",
        action: goBackProps.backToProvinces,
      });
      placeHierarchy = goBackProps.provinceName;
    }
    if (goBackProps.districtName && goBackProps.backToDistricts) {
      crumbs.push({
        label: "Districts",
        action: goBackProps.backToDistricts,
      });
      placeHierarchy += " > " + goBackProps.districtName;
    }
    if (goBackProps.municipalityName && goBackProps.backToMunicipalities) {
      crumbs.push({
        label: "Municipalities",
        action: goBackProps.backToMunicipalities,
      });
      placeHierarchy += " > " + goBackProps.municipalityName;
    }
    if (goBackProps.wardName && goBackProps.backToWards) {
      crumbs.push({
        label: "Wards",
        action: goBackProps.backToWards,
      });
      placeHierarchy += " > " + goBackProps.wardName;
    }
    return { crumbs, placeHierarchy };
  };

  const { crumbs, placeHierarchy } = getBreadcrumbs();
  return (
    <div
      className={`pl-6 py-6 pr-6 rounded-lg border-2 border-l-8 overflow-hidden`}
    >
      <div>
        <h2 className="text-[11px] mb-5 underline font-bold tracking-[0.15em] text-muted-foreground/90 uppercase leading-relaxed wrap-break-word">
          {placeHierarchy}
        </h2>
        {/*nav link header*/}
        {crumbs.length > 0 && (
          <nav className="flex flex-wrap items-center gap-y-2 gap-x-1 text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground/60 mb-4">
            <span className="shrink-0 mr-1">Back to:</span>
            <div className="flex flex-wrap items-center gap-x-1">
              {crumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <button
                    onClick={crumb.action}
                    className="hover:text-primary hover:underline transition-colors wrap-break-word text-left"
                  >
                    {crumb.label}
                  </button>
                  {index < crumbs.length - 1 && (
                    <span className="px-1 text-muted-foreground/20 shrink-0">
                      {"<"}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </nav>
        )}
      </div>
      <div className="grid grid-cols-3 items-center mb-2 w-full">
        <div />

        <div className="flex flex-col w-full min-w-0">
          <h4 className="text-xl font-black tracking-tight text-foreground uppercase leading-none text-center whitespace-nowrap">
            {props.module} {allowAddEdit ? "Management" : ""}
          </h4>
        </div>

        {/* RIGHT CONTENT */}
        {allowAddEdit && (
          <div className="flex justify-end">
            <Button
              onClick={props.onAdd}
              className="
            shrink-0 h-11 px-6 gap-2 
            bg-primary text-primary-foreground 
            shadow-lg hover:shadow-primary/20
            transition-all duration-200 
            font-bold rounded-full
          "
            >
              <Plus className="h-5 w-5 stroke-[3px]" />
              <span className="hidden lg:inline">Add {props.module}</span>
            </Button>
          </div>
        )}
      </div>

      <div className="bg-background rounded-xl border shadow-sm overflow-hidden">
        {props.children}
      </div>
    </div>
  );
};
