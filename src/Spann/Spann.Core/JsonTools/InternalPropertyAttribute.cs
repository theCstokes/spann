﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.JsonTools
{
    [AttributeUsage(AttributeTargets.Property)]
    public class InternalPropertyAttribute :  Attribute
    {
    }
}