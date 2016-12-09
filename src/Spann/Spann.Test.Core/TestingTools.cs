using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Test.Core
{
    public class TestingTools
    {
        public static string GenerateRandomString(int length = 8)
        {
            return Guid.NewGuid().ToString().Substring(0, length);
        }

        public static string RandomString
        {
            get
            {
                return Guid.NewGuid().ToString().Substring(0, 8);
            }
        }

        public static int RandomInt
        {
            get
            {
                Random r = new Random();
                return r.Next();
            }
        }
    }
}
