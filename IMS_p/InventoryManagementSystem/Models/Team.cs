

using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementSystem.Models

{

    public class Team

    {

        [Key]

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int TeamID { get; set; }

        [Required]

        public string? TeamName { get; set; }

        [Required]

        public string? ManagerName { get; set; }

        [Required]

        public string? ManagerGID { get; set; }

        [Required]

        public string? ManagerEmailID { get; set; }


    }

}
