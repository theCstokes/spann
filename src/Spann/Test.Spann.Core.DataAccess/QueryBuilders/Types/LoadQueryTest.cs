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
    public class LoadQueryTest
    {
        [TestMethod]
        public void TestGenerateLoadWithWhere()
        {
            var schemeName = TestingTools.RandomString;
            var tableName = TestingTools.RandomString;
            var propertyName = TestingTools.RandomString;
            var propertyValue = TestingTools.RandomString;
            var id = TestingTools.RandomInt;
            LoadQuery query = new LoadQuery(schemeName, tableName);

            query.AddProperty(propertyName);

            Expression<Func<ConnectionDM, bool>> exp = (item) => item.ChildID == id;
            query.AddWhereFragment((BinaryExpression)exp.Body);

            var result = query.Build();

            var expected = String.Format("SELECT \"{0}\" FROM \"{1}\".\"{2}\" WHERE \"ChildID\" = '{3}';",
                propertyName, schemeName, tableName, id);

            Assert.IsNotNull(result);
            Assert.AreEqual(expected, result);
        }

        [TestMethod]
        public void TestGenerateLoadWithID()
        {
            var schemeName = TestingTools.RandomString;
            var tableName = TestingTools.RandomString;
            var propertyName = TestingTools.RandomString;
            var propertyValue = TestingTools.RandomString;
            var id = TestingTools.RandomInt;
            LoadQuery query = new LoadQuery(schemeName, tableName);

            query.AddProperty(propertyName);

            query.AddWhereFragment(id);

            var result = query.Build();

            var expected = String.Format("SELECT \"{0}\" FROM \"{1}\".\"{2}\" WHERE \"ID\"={3};",
                propertyName, schemeName, tableName, id);

            Assert.IsNotNull(result);
            Assert.AreEqual(expected, result);
        }
    }
}
