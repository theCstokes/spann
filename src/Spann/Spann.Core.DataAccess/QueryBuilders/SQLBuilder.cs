using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

[assembly: InternalsVisibleTo("Ament.Test")]
namespace Spann.Core.DataAccess.QueryBuilders
{
    internal class SQLBuilder
    {
        #region Private Fields
        private const string propertiesPattern = "@[a-zA-Z0-9-_]*";
        private Dictionary<string, string> items;
        //private Dictionary<string, string> parameterMap;
        private List<string> customFragments;
        private readonly string baseString;
        #endregion

        #region Public Constructors
        public SQLBuilder(string baseString)
        {
            //parameterMap = new Dictionary<string, string>();
            items = new Dictionary<string, string>();
            customFragments = new List<string>();
            this.baseString = baseString;
        }
        #endregion

        #region Public Members
        public void SetParameter(string name, string value)
        {
            items.Add(name, value);
            //parameterMap[name] = value;
        }

        public void SetParameter(string name, string value, QuoteStyle style)
        {
            if (style != QuoteStyle.NONE)
            {
                value = style.Convert(value);
            }
            items.Add(name, value);
            //parameterMap[name] = value;
        }

        public void AddWhereFragment(string name, string value, QuoteStyle style)
        {
            customFragments.Add(String.Format(" WHERE \"{0}\"='{1}')", name, value));
        }

        private string RemoveUnusedProprties(string input)
        {
            return Regex.Replace(input, propertiesPattern, "");
        }

        public override string ToString()
        {
            var result = items.Aggregate(new StringBuilder(baseString), (builder, item) =>
            {
                builder.Replace(item.Key, item.Value);
                return builder;
            });
            if (customFragments.Count > 0)
            {
                return customFragments.Aggregate(result, (builder, item) =>
                {
                    builder.Append(item);
                    return builder;
                }).ToString();
            }
            return RemoveUnusedProprties(result.ToString());
        }

        public string Build()
        {
            var result = items.Aggregate(new StringBuilder(baseString), (builder, item) =>
            {
                builder.Replace(item.Key, item.Value);
                return builder;
            });
            Clear();
            if (customFragments.Count > 0)
            {
                return customFragments.Aggregate(result, (builder, item) =>
                {
                    builder.Append(item);
                    return builder;
                }).ToString();
            }
            return RemoveUnusedProprties(result.ToString());
        }

        public void Clear()
        {
            items.Clear();
        }
        #endregion
    }
}
