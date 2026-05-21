namespace MapaCafe.Models
{
    public class CadastroUsuario : DadosUsuario{
        public string senhaUsuario { get; set;} = string.Empty;
        public List<CadastroCafeteria> CafeteriasCadastradas { get; set; } = new();
    }
}