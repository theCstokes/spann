using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.DataBase
{
    public class DB : IDisposable
    {
        public DB()
        {
            Connection = new NpgsqlConnection(ConnectionData.Credentials);
        }

        public NpgsqlConnection Connection
        {
            get;
            private set;
        }

        public void Connect()
        {
            Connection.Open();
        }

        public void Dispose()
        {
            Connection.Close();
            Connection.Dispose();
        }

        public NpgsqlCommand GetCommand(string cmdString)
        {
            Connection.Open();
            return new NpgsqlCommand(cmdString, Connection);
        }
    }
}
