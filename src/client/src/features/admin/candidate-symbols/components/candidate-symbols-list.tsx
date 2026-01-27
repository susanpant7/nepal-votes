import {
  useAdminCandidateSymbolMutation,
  useAdminCandidateSymbolQuery,
} from "@/features/admin/candidate-symbols/api/admin.candidate-symbols.query.ts";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import type { CandidateSymbolInfo } from "@/features/admin/candidate-symbols/types/admin.candidate-symbols.types.ts";
import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { AddEditCandidateSymbolModal } from "@/features/admin/candidate-symbols/components/add-edit-candidate-symbol-modal.tsx";

export interface Props {
  allowView?: boolean;
  allowEdit?: boolean;
  allowSelection?: boolean;
  onSelectSymbol?: (symbol: CandidateSymbolInfo) => void;
}
export const CandidateSymbolsList = (props: Props) => {
  const { allowView, allowEdit, allowSelection, onSelectSymbol } = props;

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [selectedSymbol, setSelectedSymbol] =
    useState<CandidateSymbolInfo | null>(null);
  const [viewSymbol, setViewSymbol] = useState(false);
  const [editSymbol, setEditSymbol] = useState(false);

  // Fetch symbols for the current page
  const { data, isLoading, isError, refetch } =
    useAdminCandidateSymbolQuery.getCandidateSymbols(page, pageSize);

  const { updateCandidateSymbol } = useAdminCandidateSymbolMutation();

  // Event handler for next page
  const handleNextPage = () => {
    if (data?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  // Event handler for previous page
  const handlePrevPage = () => {
    if (data?.hasPreviousPage) {
      setPage((prev) => Math.max(prev - 1, 1));
    }
  };

  // Open symbol in dialog
  const handleView = (symbol: CandidateSymbolInfo) => {
    setSelectedSymbol(symbol);
    setViewSymbol(true);
  };

  const handleEdit = (symbol: CandidateSymbolInfo) => {
    setSelectedSymbol(symbol);
    setEditSymbol(true);
  };

  const onEditSymbolButtonClick = async (file: File | string | null) => {
    await updateCandidateSymbol.mutateAsync({
      candidateSymbolId: selectedSymbol?.candidateSymbolId!,
      candidateSymbolFile: file,
    });
    setEditSymbol(false);
    setSelectedSymbol(null);
  };

  const handleDelete = (id: number) => {
    alert(`Delete symbol id: ${id}`);
  };

  const handleSelect = (symbol: CandidateSymbolInfo) => {
    onSelectSymbol?.(symbol);
  };

  return (
    <QueryWrapper isLoading={isLoading} isError={isError} refetch={refetch}>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">
          Total symbols available: {data?.totalCount}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data?.items.map((symbol: CandidateSymbolInfo) => (
            <Card
              key={symbol.candidateSymbolId}
              className="group hover:shadow-xl transition-shadow flex flex-col justify-between"
            >
              <CardContent className="p-2 flex justify-center items-center">
                <img
                  src={`data:${symbol.symbolContentType};base64,${symbol.symbolContent}`}
                  alt={symbol.symbolFileName}
                  className="w-32 h-32 object-contain"
                />
              </CardContent>

              {/* Buttons at the bottom, center */}
              <CardFooter className="flex justify-center space-x-2 transition-opacity pb-2">
                {allowView && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(symbol)}
                      >
                        View
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>View larger</TooltipContent>
                  </Tooltip>
                )}
                {allowEdit && (
                  <>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(symbol)}
                        >
                          Edit
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit symbol</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(symbol.candidateSymbolId)}
                        >
                          Delete
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete symbol</TooltipContent>
                    </Tooltip>
                  </>
                )}
                {allowSelection && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSelect(symbol)}
                      >
                        Select
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Select this symbolr</TooltipContent>
                  </Tooltip>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={handlePrevPage}
            disabled={page === 1 || !data?.hasPreviousPage}
          >
            Previous
          </Button>
          <span>
            Page {data?.pageNumber} of {data?.totalPages}
          </span>
          <Button onClick={handleNextPage} disabled={!data?.hasNextPage}>
            Next
          </Button>
        </div>

        {/* Dialog for viewing symbol */}
        {viewSymbol && (
          <Dialog open={viewSymbol} onOpenChange={setViewSymbol}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{selectedSymbol?.symbolFileName}</DialogTitle>
              </DialogHeader>
              <div className="flex justify-center">
                <img
                  src={`data:${selectedSymbol?.symbolContentType};base64,${selectedSymbol?.symbolContent}`}
                  alt={selectedSymbol?.symbolFileName}
                  className="w-80 h-80 object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
        {/* Dialog for editing symbol */}
        {editSymbol && (
          <AddEditCandidateSymbolModal
            showAddCandidateSymbolModal={editSymbol}
            setShowAddCandidateSymbolModal={setEditSymbol}
            onSaveSymbolButtonClick={onEditSymbolButtonClick}
            editFile={selectedSymbol?.symbolContent}
            editFileId={selectedSymbol?.candidateSymbolId}
          />
        )}
      </div>
    </QueryWrapper>
  );
};
