namespace NepalVotes.Application.ResponseHelpers;

public sealed class PagedResult<T>
{
   public List<T> Items { get; }
   public int PageNumber { get; }
   public int PageSize { get; }
   public int TotalCount { get; }

   public int TotalPages =>
      (int)Math.Ceiling(TotalCount / (double)PageSize);

   public bool HasPreviousPage => PageNumber > 1;
   public bool HasNextPage => PageNumber < TotalPages;

   private PagedResult(
      List<T> items,
      int pageNumber,
      int pageSize,
      int totalCount)
   {
      Items = items;
      PageNumber = pageNumber;
      PageSize = pageSize;
      TotalCount = totalCount;
   }

   public static PagedResult<T> Create(
      List<T> items,
      int pageNumber,
      int pageSize,
      int totalCount)
   {
      if (pageNumber <= 0)
         throw new ArgumentOutOfRangeException(nameof(pageNumber));

      if (pageSize <= 0)
         throw new ArgumentOutOfRangeException(nameof(pageSize));

      return new PagedResult<T>(
         items,
         pageNumber,
         pageSize,
         totalCount
      );
   }
}
