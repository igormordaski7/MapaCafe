namespace MapaCafe.Models
{
    public class CadastroCafeteria
    {
        public int Id { get; set; }

        public string nomeCafeteria { get; set; } = string.Empty;
        public string ruaCafeteria { get; set; } = string.Empty;
        public string? complementoEndereco { get; set; }
        public string bairroCafeteria { get; set; } = string.Empty;
        public int numeroEndereco { get; set; }
        public string? cepEndereco { get; set; }
        public string comidaFavorita { get; set; } = string.Empty;
        public string bebidaFavorita { get; set; } = string.Empty;

        public int avaliacaoCafeteria { get; set; }
        public string observacoesCafeteria { get; set; } = string.Empty;

        public int? UsuarioId { get; set; }
        public CadastroUsuario? Usuario { get; set; }

    }
}
