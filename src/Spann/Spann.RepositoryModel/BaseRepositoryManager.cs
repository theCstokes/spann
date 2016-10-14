using Spann.RepositoryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using Spann.Core.DataAccess;
using System.Runtime.Remoting.Messaging;
using System.Reflection;
using Spann.Core.Requests.Patch;
using Spann.Core.DomainModel;

namespace Spann.RepositoryModel
{
    public class BaseRepositoryManager<DMSource> : IRepositoryManager<BaseRepositoryManager<DMSource>, DMSource> 
        where DMSource : AbstractDataModel<DMSource>, IDataModel, new()
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
            var a = DC.Accessor<DMSource>();
            a.CreateObject(model);
            if (a.DATA_MAP.HasConnections)
            {
                a.DATA_MAP.ConnectionTypes.ForEach(t =>
                {
                    foreach(IDataModel item in a.DATA_MAP.ConnectionValue(t, model))
                    {
                        Type managerType = RC.GetManagerType(t);
                        var method = managerType.GetRuntimeMethod("Add", new Type[] { t });
                        // Run add on connection.
                        method.Invoke(RC.GetManager(t), new IDataModel[] { item });
                        a.CreateConnection(model, a.DATA_MAP.Connection(t), item.ID);
                    }
                });
            }
            a.Dispose();
            NotifyChangeListeners();
        }

        public void Patch(DMSource model)
        {
            if(PatchTools.IsPatch(model))
            {
                var patchData = PatchTools.GetPatchData(model);
                if(patchData.PatchType == PatchTypeEnum.CREATE)
                {
                    PatchCreate(model);
                } else if (patchData.PatchType == PatchTypeEnum.UPDATE)
                {

                }
                else if (patchData.PatchType == PatchTypeEnum.DELETE)
                {

                }
                else
                {

                }
            }

        }

        private void PatchCreate(DMSource model)
        {
            models.Add(model);
            var a = DC.Accessor<DMSource>();
            a.CreateObject(model);
            if (a.DATA_MAP.HasConnections)
            {
                a.DATA_MAP.ConnectionTypes.ForEach(t =>
                {
                    foreach (IDataModel item in a.DATA_MAP.ConnectionValue(t, model))
                    {
                        Type managerType = RC.GetManagerType(t);
                        var method = managerType.GetRuntimeMethod("Patch", new Type[] { t });
                        // Run add on connection.
                        method.Invoke(RC.GetManager(t), new object[] { item });

                        var patchData = PatchTools.GetPatchData(item);
                        if (patchData.PatchType == PatchTypeEnum.CREATE)
                        {
                            a.CreateConnection(model, a.DATA_MAP.Connection(t), item.ID);
                        }
                        else if (patchData.PatchType == PatchTypeEnum.UPDATE)
                        {
                            a.UpdateConnection(model, a.DATA_MAP.Connection(t), item.ID);
                        }
                        else if (patchData.PatchType == PatchTypeEnum.DELETE)
                        {
                            a.DeleteConnection(model.GetConnectionID(item.ID));
                        }
                        else
                        {

                        }
                    }
                });
            }
            a.Dispose();
            NotifyChangeListeners();
        }

        private bool IsPatch(DMSource model)
        {
            return model.AdditionalData.Keys.Contains("PatchClientID") && model.AdditionalData.Keys.Contains("PatchType");
        }

        public DMSource Get(Expression<Func<DMSource, bool>> filter)
        {
            var result = models.Find(msg => filter.Compile()(msg));
            if (result == null)
            {
                var a = DC.Accessor<DMSource>();
                result = a.LoadAll(filter).First();
                if (result != null)
                {
                    models.Add(result);
                }
                a.Dispose();
            }
            return result;
        }

        public List<DMSource> GetAll()
        {
            var a = DC.Accessor<DMSource>();
            var result = a.LoadAll();
            if (result != null)
            {
                models.AddRange(result);
            }
            a.Dispose();
            return result;
        }

        public List<DMSource> GetAll(Expression<Func<DMSource, bool>> filter)
        {
            var a = DC.Accessor<DMSource>();
            var result = a.LoadAll(filter);
            if (result != null)
            {
                models.AddRange(result);
            }
            a.Dispose();
            return result;
        }

        public void Delete(int id)
        {
            models.RemoveAll(source => source.ID == id);
            var a = DC.Accessor<DMSource>();
            a.DeleteObject(id);
            a.Dispose();
            NotifyChangeListeners();
        }

        public void Update(DMSource model)
        {
            var items = models.Where(source => source.ID == model.ID);
            var a = DC.Accessor<DMSource>();
            a.UpdateObject(model);
            a.Dispose();
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
