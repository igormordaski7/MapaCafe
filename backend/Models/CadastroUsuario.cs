namespace MapaCafe.Models
{
    public class CadastroUsuario
    {
        public int Id { get; set; }
        public string nomeUsuario { get; set; } = string.Empty;
        public string emailUsuario { get; set; } = string.Empty;
        public int telefoneUsuario { get; set; }
        public string senhaUsuario { get; set; } = string.Empty;

        public List<CadastroCafeteria> CafeteriasCadastradas { get; set; } = new();
    }
}