using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.MetaDataModels
{
    public interface IColumnItem
    {
        string ColumnName { get; set; }
        string PropertyName { get; set; }
    }
}
