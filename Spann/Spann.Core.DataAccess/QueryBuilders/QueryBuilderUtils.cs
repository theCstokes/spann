using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.QueryBuilders
{
    class QueryBuilderUtils
    {
        #region Private Fields
        private const string LIST_ITEM_SEPARATOR = ",";
        #endregion

        #region Public Static Members
        public static string CreateItemString(List<String> data)
        {

            return CreateItemString(data, QuoteStyle.NONE);
        }

        public static string CreateItemString(List<String> data, QuoteStyle style)
        {
            return data.Aggregate(new StringBuilder(), (result, item) =>
            {
                if (result.Length == 0)
                {
                    return result.Append(style.Convert(item));
                }
                result.Append(LIST_ITEM_SEPARATOR).Append(style.Convert(item));
                return result;
            }).ToString();
        }

        public static string CreateMapString(Dictionary<String, String> data, QuoteStyle keyStyle, QuoteStyle valueStyle)
        {
            var mapData = new StringBuilder();

            foreach (KeyValuePair<String, String> element in data)
            {
                var itemString = keyStyle.Convert(element.Key) + "=" + valueStyle.Convert(element.Value);
                if (mapData.Length == 0)
                {
                    mapData.Append(itemString);
                } else
                {
                    mapData.Append(LIST_ITEM_SEPARATOR).Append(itemString);
                }
            }
            return mapData.ToString();
        }
        #endregion
    }
}
