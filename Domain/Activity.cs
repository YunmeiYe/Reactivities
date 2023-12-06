namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; } = new Guid();
        public string Title { get; set; } = "";
        public DateTime Date { get; set; } = new DateTime();
        public string Description { get; set; } = "";
        public string Category { get; set; } = "";
        public string City { get; set; } = "";
        public string Venue { get; set; } = "";
    }
}