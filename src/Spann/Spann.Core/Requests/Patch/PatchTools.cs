using Spann.Core.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.Requests.Patch
{
    public class PatchTools
    {
        private static readonly string PATCH_TYPE_KEY = "PatchType";
        private static readonly string PATCH_CLIENT_ID_KEY = "PatchClientID";
        public static bool IsPatch<TSource>(TSource obj) where TSource : IDataModel
        {
            return obj.AdditionalData.Keys.Contains(PATCH_TYPE_KEY) && obj.AdditionalData.Keys.Contains(PATCH_CLIENT_ID_KEY);
        }

        public static PatchData GetPatchData<TSource>(TSource obj) where TSource : IDataModel
        {
            string type = obj.AdditionalData[PATCH_TYPE_KEY].Value<string>(PATCH_TYPE_KEY);
            int? id = obj.AdditionalData[PATCH_CLIENT_ID_KEY].Value<int?>(PATCH_CLIENT_ID_KEY);

            return new PatchData(PatchTypeEnum.GetType(type), id);
        }
    }
}
