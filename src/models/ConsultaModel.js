
class ConsultaModel {
    constructor(ID_Paciente, ID_Medico, Especialidade, DataConsulta, HoraConsulta, Estado){
        this.ID_Paciente = ID_Paciente;
        this.ID_Medico = ID_Medico;
        this.Especialidade = Especialidade;
        this.DataConsulta = DataConsulta;
        this.HoraConsulta = HoraConsulta;
        this.Estado = Estado;
    }
}

module.exports = ConsultaModel;