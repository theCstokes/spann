using Spann.Core.DataAccess;
using Spann.Core.DomainModel;
using Spann.Core.DomainModel.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DomainModel
{
    public abstract class BaseDM<TDM, TDTO> : AbstractDataModel<TDM>, IDataModel where TDTO : BaseDTO<TDTO, TDM> where TDM : BaseDM<TDM, TDTO>, new()
    {
        public abstract TDTO Map();

    }
}
