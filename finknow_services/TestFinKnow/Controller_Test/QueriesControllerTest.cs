using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using finknow_services.Controllers;
using finknow_services.Models;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;

namespace Finknow_Tests
{
    class QueriesTest
    {

        [Test]
        public void GetQuery()
        {

            QDoubtContext fc = new QDoubtContext();
            QueriesController qc = new QueriesController(fc);

            object query = qc.GetQueries();


            Assert.IsNotNull(query);

        }       


        [Test]
        public void PostQuery()
        {

            QDoubtContext fc = new QDoubtContext();
            QueriesController qc = new QueriesController(fc);

            Query que = new Query();
            var x = qc.PostQuery(que);

            Assert.IsNotNull(x);

        }

        [Test]
        public void Querycontrollertype()
        {

            QDoubtContext fc = new QDoubtContext();
            QueriesController qc = new QueriesController(fc);

            var query = qc.GetQueries();

            Assert.IsInstanceOf<Task<ActionResult<IEnumerable<Query>>>>(query);

        }

        [Test]
        public void PutQuery()
        {

            QDoubtContext fc = new QDoubtContext();
            QueriesController qc = new QueriesController(fc);

            Query que = new Query();

           
            object x = qc.PutQuery(que.QueryId, que);

            Assert.NotNull(x);


        }

        [Test]
        public void DeleteQuery()
        {

            QDoubtContext fc = new QDoubtContext();
            QueriesController qc = new QueriesController(fc);

            Query que = new Query();

            object x = qc.DeleteQuery(que.QueryId);

            Assert.NotNull(x);

        }
    }
}
