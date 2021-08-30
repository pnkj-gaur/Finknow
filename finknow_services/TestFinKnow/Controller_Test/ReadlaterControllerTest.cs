using finknow_services.Controllers;
using finknow_services.Models;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Finknow_Tests
{
    class ReadLaterTest
    {

        [Test]
        public void GetArcheive()
        {

            QDoubtContext fc = new QDoubtContext();
            ReadlatersController rc = new ReadlatersController(fc);

            object archeive = rc.GetReadlaters();

            Assert.IsNotNull(archeive);

        }
       

       

        [Test]
        public void GetArcheivetype()
        {

            QDoubtContext fc = new QDoubtContext();
            ReadlatersController rc = new ReadlatersController(fc);

            object archeive = rc.GetReadlaters();


            Assert.IsInstanceOf<Task<ActionResult<IEnumerable<Readlater>>>>(archeive);
        }

       
    }
}

