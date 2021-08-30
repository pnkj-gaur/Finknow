using NUnit.Framework;
using finknow_services.Controllers;
using finknow_services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Finknow_Tests.ModelsTest
{
    class QueryModelTest
    {

        [Test]

        public void QueryType()
        {
           
            Query que = new Query();

            que.QueryId = 1;
            que.Title = "Stocks";
            que.Username = "sipnip";


            Assert.AreNotSame(que.QueryId.GetType(),que.Title.GetType());

        }

        [Test]
        public void Querytitletype()
        {
            QDoubtContext fc = new QDoubtContext();
            QueriesController qc = new QueriesController(fc);
            Query que = new Query();

            var x= qc.PostQuery(que);


            Assert.IsNotEmpty(x.ToString());

        }

    }
}
