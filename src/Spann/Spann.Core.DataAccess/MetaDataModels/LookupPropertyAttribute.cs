﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.MetaDataModels
{
    [AttributeUsage(AttributeTargets.Property)]
    class LookupPropertyAttribute : Attribute
    {
        public LookupPropertyAttribute()
        {
        }
    }
}
