using HMZ_V3.Models.Contact;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMZ_V3.Services
{
    public class NotificationNotifierService
    {
        public event Func<string, MessageStatus, Task> Notify;

        public async Task Inform(string Message, MessageStatus MessageStatus)
        {
            await Notify?.Invoke(Message, MessageStatus);
        }
    }
}
