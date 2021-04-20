using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HMZ_V3.Models.Contact
{
    public class MessageModel
    {
        [Required]
        [StringLength(50, ErrorMessage = "Name can't be more than {1} characters.")]
        [Display(Name = "Full Name")]
        public string FullName { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid e-mail address.")]
        [DataType(DataType.EmailAddress)]
        [StringLength(150, ErrorMessage = "Email can't be more than {1} characters.")]
        public string Email { get; set; }

        [Required]
        [StringLength(150, ErrorMessage = "Subject can't be more than {1} characters.")]
        public string Subject { get; set; }

        [Required]
        [DataType(DataType.MultilineText)]
        [StringLength(5000, MinimumLength = 30, ErrorMessage = "Message should be between {2} and {1} characters.")]
        public string Message { get; set; }
    }
}
