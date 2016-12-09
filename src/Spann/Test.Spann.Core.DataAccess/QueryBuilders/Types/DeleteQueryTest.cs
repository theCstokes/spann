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
    public class DeleteQueryTest
    {
        [TestMethod]
        public void TestGenerateDeleteWithWhere()
        {
            var schemeName = TestingTools.RandomString;
            var tableName = TestingTools.RandomString;
            var propertyName = TestingTools.RandomString;
            var propertyValue = TestingTools.RandomString;
            var id = TestingTools.RandomInt;
            DeleteQuery query = new DeleteQuery(schemeName, tableName);

            Expression<Func<ConnectionDM, bool>> exp = (item) => item.ChildID == id;
            query.AddWhereFragment((BinaryExpression)exp.Body);

            var result = query.Build();

            var expected = String.Format("DELETE FROM \"{0}\".\"{1}\" WHERE \"ChildID\" = '{2}';",
                schemeName, tableName, id);

            Assert.IsNotNull(result);
            Assert.AreEqual(expected, result);
        }

        [TestMethod]
        public void TestGenerateDeleteWithID()
        {
            var schemeName = TestingTools.RandomString;
            var tableName = TestingTools.RandomString;
            var propertyName = TestingTools.RandomString;
            var propertyValue = TestingTools.RandomString;
            var id = TestingTools.RandomInt;
            DeleteQuery query = new DeleteQuery(schemeName, tableName);

            query.AddWhereFragment(id);

            var result = query.Build();

            var expected = String.Format("DELETE FROM \"{0}\".\"{1}\" WHERE \"ID\"={2};",
                schemeName, tableName, id);

            Assert.IsNotNull(result);
            Assert.AreEqual(expected, result);
        }
    }
}
