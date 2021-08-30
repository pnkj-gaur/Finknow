using NUnit.Framework;
using finknow_services.Controllers;
using finknow_services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Finknow_Tests.ModelsTest
{
    class UserModelTest
    {

        [Test]
        public void Usemailtype()
        {
            
            User user = new User();
            
            user.Email = "dv@gmail.com";
           
            Assert.IsTrue(user.Email.Contains("@gmail"));

        }

        [Test]
        public void UsermodelUsername()
        {
            User user = new User();
            user.Username = "edrdr";

            Assert.AreNotEqual(typeof(User), user.Username.GetType());
        }

        [Test]
        public void Usermodeltype()
        {
            User user = new User();

            Assert.IsInstanceOf<User>(user);
        }


    }
}
