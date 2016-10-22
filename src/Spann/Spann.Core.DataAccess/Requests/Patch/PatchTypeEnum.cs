using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.Requests.Patch
{
    public class PatchType
    {
        public enum Enum
        {
            Create = 1, Update = 2, Delete = 3
        }
        private static readonly Dictionary<int, PatchType> Types = new Dictionary<int, PatchType>();

        public static readonly PatchType CREATE = new PatchType(Enum.Create, "Create");
        public static readonly PatchType UPDATE = new PatchType(Enum.Update, "Update");
        public static readonly PatchType DELETE = new PatchType(Enum.Delete, "Delete");

        public string Value { get; private set; }
        public Enum EnumValue { get; private set; }
        private PatchType(Enum enumValue, string value)
        {
            this.Value = value;
            Types[(int) enumValue] = this;
            this.EnumValue = enumValue;
        }

        public static PatchType GetType(string value)
        {
            return Types.Values.First(type => type.Value.Equals(value, StringComparison.OrdinalIgnoreCase));
        }
    }
}
