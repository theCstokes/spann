using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.Requests.Patch
{
    public class PatchTypeEnum
    {
        public enum Enum
        {
            Create = 1, Update = 2, Delete = 3
        }
        private static readonly Dictionary<int, PatchTypeEnum> Types = new Dictionary<int, PatchTypeEnum>();

        public static readonly PatchTypeEnum CREATE = new PatchTypeEnum(Enum.Create, "Create");
        public static readonly PatchTypeEnum UPDATE = new PatchTypeEnum(Enum.Update, "Update");
        public static readonly PatchTypeEnum DELETE = new PatchTypeEnum(Enum.Delete, "Delete");

        public string Value { get; private set; }
        public Enum EnumValue { get; private set; }
        private PatchTypeEnum(Enum enumValue, string value)
        {
            this.Value = value;
            Types[(int) enumValue] = this;
            this.EnumValue = enumValue;
        }

        public static PatchTypeEnum GetType(string value)
        {
            return Types.Values.First(type => type.Value.Equals(value, StringComparison.OrdinalIgnoreCase));
        }
    }
}
