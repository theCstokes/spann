using Spann.Core.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.Requests.Patch
{
    public class PatchTools
    {
        //private static readonly string PATCH_TYPE_KEY = "PatchType";
        //private static readonly string PATCH_CLIENT_ID_KEY = "PatchClientID";
        public static bool IsPatch<TSource>(TSource obj) where TSource : IDataModel
        {
            return obj.PatchClientID != null && obj.PatchType != null;
        }

        public static PatchData GetPatchData<TSource>(TSource obj) where TSource : IDataModel
        {
            return new PatchData(PatchTypeEnum.GetType(obj.PatchType), obj.PatchClientID);
        }
    }
}
