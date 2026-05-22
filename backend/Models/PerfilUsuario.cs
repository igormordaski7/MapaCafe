namespace MapaCafe.Models
{
    public class PerfilUsuario
    {
        public int Id { get; set; }
        public string nomeUsuario { get; set; } = string.Empty;
        public string emailUsuario { get; set; } = string.Empty;
        public int telefoneUsuario { get; set; }
        public string biografia { get; set; } = string.Empty;
    }
}