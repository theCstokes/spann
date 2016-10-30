using Spann.Core.DataAccess.MetaDataModels;
using Spann.Core.DataAccess.Requests.Patch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.MetaDataModels
{
    [AttributeUsage(AttributeTargets.Property)]
    public class DetailAttribute :  Attribute
    {
        public PatchTypeEnum.Enum[] Types { get; private set; }

        public DetailAttribute(params PatchTypeEnum.Enum[] types)
        {
            this.Types = types;
        }
    }
}
