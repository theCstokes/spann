using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spann
{
    /// <summary>
    /// Storage and Retrieval of test results.
    /// </summary>
    public class ServerResult
    {
        private List<Exception> exceptionResults;

        private List<KeyValuePair<string, bool>> testResults;

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
        /// <returns>List of all exceptions</returns>
        public List<Exception> GetAllExceptions()
        {
            return exceptionResults;
        }

        /// <summary>
        /// Get all results (bool)
        /// </summary>
        /// <returns>List of all results (key value pairs)</returns>
        public List<KeyValuePair<string, bool>> GetAllResults()
        {
            return new List<KeyValuePair<string, bool>>(testResults);
        }

        /// <summary>
        /// Perform a test on a given function and potentially store result based on test.
        /// </summary>
        /// <param name="TestFunction">Test function</param>
        /// <param name="name">name of result</param>
        /// <returns>Result of test function</returns>
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

        /// <summary>
        /// get: No exceptions and no failures
        /// </summary>
        public bool DidPass
        {
            get { return (testResults.Count() == 0 && exceptionResults.Count() == 0); }
        }
    }
}