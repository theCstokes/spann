using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spann
{
    public class ServerResult
    {
        private List<Exception> exceptionResults;

        private List<KeyValuePair<string, bool>> testResults;
        // ^
        // struct of key value pairs
        // List<myStruct> testResults;

        public ServerResult()
        {
            exceptionResults = new List<Exception>();
            testResults = new List<KeyValuePair<string, bool>>();
        }

        /// <summary>
        /// Add an exception
        /// </summary>
        /// <param name="e">Exception</param>
        public void Add(Exception e)
        {
            exceptionResults.Add(e);
        }

        /// <summary>
        /// Get all exceptions
        /// </summary>
        /// <returns></returns>
        public List<Exception> GetAllExceptions()
        {
            return exceptionResults;
        }

        /// <summary>
        /// Get all results (bool)
        /// </summary>
        /// <returns></returns>
        public List<KeyValuePair<string, bool>> GetAllResults()
        {
            return new List<KeyValuePair<string, bool>>(testResults);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="testFunction"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public bool Test(Func<bool> TestFunction, String name = null)
        {
            /*
             * eval and store  test function
             * if !result
             *   store in list
             *     with name <- arg
             *     
             *     key value pair
             *     
             * return result
             */
            bool result = TestFunction();
            if (!result)
            {
                testResults.Add(new KeyValuePair<string, bool>(name, result));
            }
            return result;
        }
    }
}