export interface Props {
  wardNumber: number;
  municipalityName: string;
  currentConstituencyName: string;
  newConstituencyName: string;
}
export const ReassignComponent = (props: Props) => {
  return (
    <div className="space-y-3 text-sm text-muted-foreground">
      <p>
        You are about to move{" "}
        <span className="font-medium text-foreground">
          Ward {props.wardNumber}
        </span>{" "}
        from{" "}
        <span className="font-medium text-foreground">
          {props.currentConstituencyName ?? "its current constituency"}
        </span>{" "}
        to{" "}
        <span className="font-medium text-foreground">
          {props.newConstituencyName}
        </span>
        .
      </p>

      {/* Transfer visualization */}
      <div className="flex items-center justify-center gap-3 rounded-md bg-muted/40 px-4 py-2 text-xs">
        <span className="font-medium text-foreground">
          {props.currentConstituencyName ?? "Current Constituency"}
        </span>

        {/* Arrow + Ward */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-lg">⟶</span>

          <span className="rounded-full bg-background px-2 py-0.5 text-[11px] font-medium text-foreground shadow-sm">
            Ward {props.wardNumber}
          </span>

          <span className="text-lg">⟶</span>
        </div>

        <span className="font-medium text-foreground">
          {props.newConstituencyName}
        </span>
      </div>

      <p>
        After this change,{" "}
        <span className="font-medium text-foreground">
          Ward {props.wardNumber}
        </span>{" "}
        will permanently belong to{" "}
        <span className="font-medium text-foreground">
          {props.newConstituencyName}
        </span>
        .
      </p>
    </div>
  );
};
