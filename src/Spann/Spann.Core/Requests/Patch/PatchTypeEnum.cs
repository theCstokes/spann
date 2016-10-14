using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.Requests.Patch
{
    public class PatchTypeEnum
    {
        private static readonly Dictionary<int, PatchTypeEnum> Types = new Dictionary<int, PatchTypeEnum>();

        public static readonly PatchTypeEnum CREATE = new PatchTypeEnum(1, "Create");
        public static readonly PatchTypeEnum UPDATE = new PatchTypeEnum(2, "Update");
        public static readonly PatchTypeEnum DELETE = new PatchTypeEnum(3, "Delete");

        public string Value { get; private set; }
        private PatchTypeEnum(int uid, string value)
        {
            this.Value = value;
            Types[uid] = this;
        }

        public static PatchTypeEnum GetType(string value)
        {
            return Types.Values.First(type => type.Value.Equals(value, StringComparison.OrdinalIgnoreCase));
        }
    }
}
