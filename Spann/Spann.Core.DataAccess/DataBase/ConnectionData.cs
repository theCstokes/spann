using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Spann.Core.DataAccess.DataBase
{
    class ConnectionData
    {
        public static readonly string HOST = "ec2-174-129-4-75.compute-1.amazonaws.com";
        public static readonly string PORT = "5432";
        public static readonly string USERNAME = "qoqjfwklwttuor";
        public static readonly string PASSWORD = "IJortWH8BEf5NGf_hSS_IOQBQJ";
        public static readonly string DATABASE = "d44iestva2nsh";

        public static string Credentials
        {
            get
            {
                //return String.Format("Host={0};Port={1};Username={2};Password={3};Database={4}", 
                return String.Format("User ID={0};Password={1};Host={2};Port={3};Database={4};Pooling=true;Use SSL Stream=True;SSL Mode=Require;TrustServerCertificate=True;",
                    USERNAME, PASSWORD, HOST, PORT, DATABASE);
            }
        }
    }
}
