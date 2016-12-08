using Microsoft.VisualStudio.TestTools.UnitTesting;
using Spann.Core.DataAccess.QueryBuilders.Types;
using Spann.Test.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test.Spann.Core.DataAccess.QueryBuilders.Types
{
    [TestClass]
    public class CreateQueryTest
    {
        [TestMethod]
        public void TestGenerateCreateNoWhere()
        {
            var schemeName = TestingTools.RandomString;
            var tableName = TestingTools.RandomString;
            var propertyName = TestingTools.RandomString;
            var propertyValue = TestingTools.RandomString;
            CreateQuery query = new CreateQuery(schemeName, tableName);

            query.AddPropertyValue(propertyName, propertyValue);

            var result = query.Build();

            var expected = String.Format("INSERT INTO \"{0}\".\"{1}\"(\"{2}\") VALUES('{3}') RETURNING \"{0}\".\"{1}\".\"ID\"; ", 
                schemeName, tableName, propertyName, propertyValue);

            Assert.IsNotNull(result);
            Assert.AreEqual(expected, result);
        }
    }
}
