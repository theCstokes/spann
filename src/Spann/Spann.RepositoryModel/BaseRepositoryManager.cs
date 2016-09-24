using Spann.RepositoryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using Spann.Core.DataAccess;
using Ament.Core.DomainModel;
using System.Runtime.Remoting.Messaging;

namespace Spann.RepositoryModel
{
    public class BaseRepositoryManager<DMSource> : IRepositoryManager<BaseRepositoryManager<DMSource>, DMSource> 
        where DMSource : IDataModel<DMSource>, new()
    {
        #region Public Field(s).
        public delegate void ChangeListener();
        #endregion

        #region Private Field(s).
        private List<DMSource> models;
        private Dictionary<Guid, ChangeListener> listeners;
        #endregion

        #region Public Constructor(s).
        public BaseRepositoryManager()
        {
            models = new List<DMSource>();
            listeners = new Dictionary<Guid, ChangeListener>();
        }
        #endregion

        #region Public Function(s).
        public void AddChangeListener(Guid uid, ChangeListener listener)
        {
            listeners.Add(uid, listener);
            RunAsyncListener(listener);
        }

        public void RemoveChangeListener(Guid uid)
        {
            listeners.Remove(uid);
        }

        public void Add(DMSource model)
        {
            models.Add(model);
            DC.Accessor<DMSource>().CreateObject(model);
            NotifyChangeListeners();
        }

        public DMSource Get(Expression<Func<DMSource, bool>> filter)
        {
            var result = models.Find(msg => filter.Compile()(msg));
            if (result == null)
            {
                result = DC.Accessor<DMSource>().LoadAll(filter).First();
                if (result != null)
                {
                    models.Add(result);
                }
            }
            return result;
        }

        public List<DMSource> GetAll()
        {
            var result = DC.Accessor<DMSource>().LoadAll();
            if (result != null)
            {
                models.AddRange(result);
            }
            return result;
        }

        public List<DMSource> GetAll(Expression<Func<DMSource, bool>> filter)
        {
            var result = DC.Accessor<DMSource>().LoadAll(filter);
            if (result != null)
            {
                models.AddRange(result);
            }
            return result;
        }

        public void Delete(int id)
        {
            models.RemoveAll(source => source.ID == id);
            DC.Accessor<DMSource>().DeleteObject(id);
            NotifyChangeListeners();
        }

        public void Update(DMSource model)
        {
            //int index = 0;
            //while(index > -1)
            //{
            //    index = models.FindIndex(index, source => source.ID == model.ID);
            //    if(index > -1)
            //    {
            //        models.RemoveAt(index);
            //        models.Insert(index, model);
            //    }
            //}
            var items = models.Where(source => source.ID == model.ID);
            DC.Accessor<DMSource>().UpdateObject(model);
            NotifyChangeListeners();
        }
        #endregion

        #region Private Function(s).
        private void NotifyChangeListeners()
        {
            listeners.Values.ToList().ForEach(RunAsyncListener);
        }

        private void RunAsyncListener(ChangeListener listener)
        {
            listener.BeginInvoke((ar) =>
            {
                AsyncResult result = (AsyncResult)ar;
                ChangeListener caller = (ChangeListener)result.AsyncDelegate;
                caller.EndInvoke(ar);
            }, null);
        }
        #endregion
    }
}
