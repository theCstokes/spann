using Microsoft.VisualStudio.TestTools.UnitTesting;
using Spann.Core.DataAccess.BaseDomainModel;
using Spann.Core.DataAccess.QueryBuilders.Types;
using Spann.Test.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Test.Spann.Core.DataAccess.QueryBuilders.Types
{
    [TestClass]
    public class UpdateQueryTest
    {
        [TestMethod]
        public void GenerateUpdateNoWhereData()
        {
            var schemeName = TestingTools.RandomString;
            var tableName = TestingTools.RandomString;
            var propertyName = TestingTools.RandomString;
            var propertyValue = TestingTools.RandomString;
            var id = TestingTools.RandomInt;
            UpdateQuery query = new UpdateQuery(schemeName, tableName);

            query.AddPropertyValue(propertyName, propertyValue);
            
            var result = query.Build();

            var expected = String.Format("UPDATE \"{0}\".\"{1}\" SET \"{2}\"='{3}' ;",
                schemeName, tableName, propertyName, propertyValue);

            Assert.IsNotNull(result);
            Assert.AreEqual(expected, result);
        }

        [TestMethod]
        public void GenerateUpdateWithWhereData()
        {
            var schemeName = TestingTools.RandomString;
            var tableName = TestingTools.RandomString;
            var propertyName = TestingTools.RandomString;
            var propertyValue = TestingTools.RandomString;
            var id = TestingTools.RandomInt;
            UpdateQuery query = new UpdateQuery(schemeName, tableName);

            query.AddPropertyValue(propertyName, propertyValue);
            Expression<Func<ConnectionDM, bool>> exp = (item) => item.ChildID == id;
            query.AddWhereFragment((BinaryExpression)exp.Body);

            var result = query.Build();

            var expected = String.Format("UPDATE \"{0}\".\"{1}\" SET \"{2}\"='{3}' WHERE \"ChildID\" = '{4}';",
                schemeName, tableName, propertyName, propertyValue, id);

            Assert.IsNotNull(result);
            Assert.AreEqual(expected, result);
        }

        [TestMethod]
        public void GenerateUpdateWithIDData()
        {
            var schemeName = TestingTools.RandomString;
            var tableName = TestingTools.RandomString;
            var propertyName = TestingTools.RandomString;
            var propertyValue = TestingTools.RandomString;
            var id = TestingTools.RandomInt;
            UpdateQuery query = new UpdateQuery(schemeName, tableName);

            query.AddPropertyValue(propertyName, propertyValue);
            query.AddWhereFragment(id);

            var result = query.Build();

            var expected = String.Format("UPDATE \"{0}\".\"{1}\" SET \"{2}\"='{3}' WHERE \"ID\"={4};",
                schemeName, tableName, propertyName, propertyValue, id);

            Assert.IsNotNull(result);
            Assert.AreEqual(expected, result);
        }
    }
}
