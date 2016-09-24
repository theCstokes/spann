using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.QueryBuilders
{
    class QuoteStyle
    {
        #region QuoteStyle Types
        public static readonly QuoteStyle NONE = new QuoteStyle();
        public static readonly QuoteStyle DOUBLE = new QuoteStyle(item => "\"" + item + "\"");
        public static readonly QuoteStyle SINGLE = new QuoteStyle(item => "'" + item + "'");
        #endregion

        #region Private Constructors
        private Func<String, String> conversionFunction;
        private QuoteStyle()
        {
            conversionFunction = null;
        }
        private QuoteStyle(Func<String, String> conversionFunction)
        {
            this.conversionFunction = conversionFunction;
        }
        #endregion

        #region Public Members
        public String Convert(String arg)
        {
            if(conversionFunction == null)
            {
                return arg;
            }
            return conversionFunction.Invoke(arg);
        }
        #endregion
    }
}
