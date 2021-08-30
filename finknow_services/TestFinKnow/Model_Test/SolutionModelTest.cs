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
    class SolutionModelTest
    {
        [Test]

        public void SolutionType()
        {
            
            Solution sol = new Solution();

            sol.SolId = 5;
            sol.Solution1 = " Mutual fund investments are simple ";
            sol.Username = "Pankaj";


            Assert.AreSame(sol.Solution1.GetType(), sol.Username.GetType());

        }

        [Test]
        public void Solutiontype()
        {

            Solution que = new Solution();

            que.Solution1 = " Mutual fund investments are simple ";

            Assert.IsNotInstanceOf<Solution>(que.Solution1);

        }

    }
}
