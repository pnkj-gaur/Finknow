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
    class CommentModelTest
    {

        [Test]
        public void comments()
        {
            QDoubtContext fc = new QDoubtContext();
            CommentsController sc = new CommentsController(fc);
            Comment com = new Comment();

            com.CommentId = 12;

            var x=sc.DeleteComment(com.CommentId);

            Assert.IsNotEmpty(x.ToString());

        }
    }
}
