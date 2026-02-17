
using DateConverterNepali;

namespace NepalVotes.Application.Utilities;

public static class NepaliEnglishDateConverter
{
    public static DateOnly ConvertToAd(string bsDate)
    {
        if (string.IsNullOrWhiteSpace(bsDate))
            throw new ArgumentException("BS date string cannot be null or blank.", nameof(bsDate));

        var parts = bsDate.Split('-');
        if (parts.Length != 3
            || !int.TryParse(parts[0], out var bsYear)
            || !int.TryParse(parts[1], out var bsMonth)
            || !int.TryParse(parts[2], out var bsDay))
        {
            throw new ArgumentException($"Invalid BS date format. Expected YYYY-MM-DD, got: {bsDate}");
        }

        var adDateResult = DateConverter.GetDateInAD(bsYear, bsMonth, bsDay);
        return new DateOnly(adDateResult.engYear, adDateResult.engMonth, adDateResult.engDay);
    }
}