class ValidaForm {
    constructor(){
    this.formulario = document.querySelector(".formulario");
    this.eventos();
    }

    eventos(){
        this.formulario.addEventListener('submit', e =>{
            this.cancelSubmit(e);
        })
    }
    cancelSubmit(e){
     e.preventDefault();
     const campos = this.camposIsValid();
     const senhas = this.senhasIsValid();
    
     if(campos && senhas){
        alert('Formulario Enviado!');
        this.formulario.submit();
     }
     
    }

    camposIsValid(){
        let valid = true;
        for(let error of this.formulario.querySelectorAll(".error")){
            error.remove();
        }
        for(let campo of this.formulario.querySelectorAll(".validar")){
            const label = campo.previousElementSibling.innerText;
            
            if(!campo.value){
                this.criaError(campo, `O campo "${label}" não pode estar em branco.`);
                valid = false;
            }
            if(campo.classList.contains('cpf')){
               if(!this.validaCPF(campo)){
                valid = false;
               };
             }
           if(campo.classList.contains('usuario')){
            if(!this.validaUsuario(campo)){
                valid = false;
            };
           }
        } 
    
    return valid;
    }
    validaCPF(campo){
        let valid = true;
        const cpfLimpo = campo.value.replace(/\D+/g, '');
        if(cpfLimpo.length !== 11){
            valid = false;
            this.criaError(campo, "Cpf precisa ter 11 digitos");
        }
        if(typeof cpfLimpo !== 'string'){
            valid = false;
            this.criaError(campo, 'Cpf Invalido!');
        }
        if(cpfLimpo.charAt(0).repeat(11) === cpfLimpo && valid){
            this.criaError(campo,'Cpf Invalido(Sequencia)');
            valid = false;
        }
        let cpfTemp = cpfLimpo.slice(0,-2)
        const digito1 = this.geraDigitoCPF(cpfTemp);
        const digito2 = this.geraDigitoCPF(cpfTemp + digito1);
        cpfTemp = cpfTemp + digito1 + digito2;
        if(cpfLimpo !== cpfTemp){
            valid = false
            this.criaError(campo, "Cpf invalido!");
        }

        return valid;
    }
    geraDigitoCPF(cpf){
        const cpfTemp = cpf;
        let total = 0;
        let reverso = cpf.length+1;

        for(let stringNumerica of cpf){
            total += reverso*Number(stringNumerica);
            reverso--;
        }
        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';

    }




    senhasIsValid(){
        let valid = true;

        const senha = this.formulario.querySelector(".senha");
        const repetirSenha = this.formulario.querySelector(".repetir-senha");

        if(senha.value !== repetirSenha.value){
            this.criaError(senha, "As senhas são diferentes");
            this.criaError(repetirSenha, "As senhas são diferentes");
            valid = false;
        }
        if(senha.length < 6 || senha.length > 12){
            this.criaError(senha, "A senha deve conter entre 6 e 12 caracteres.");
            valid = false;
        }
        return valid;
    }



    validaUsuario(campo){
        let valid = true;
        const usuario = campo.value;

        if(usuario.length< 3 || usuario.length > 12){
            this.criaError(campo, 'Nome de usuario precisa ter entre 3 e 12 caracteres.')
            valid = false;
        }
        if(!usuario.match(/^[a-zA-Z0-9]+$/g)){
            this.criaError(campo, 'Nome de usuario pode conter apenas numeros e letras.');
            valid = false;
        }
        return valid;
    }




    criaError(campo,msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error');
        campo.insertAdjacentElement('afterend', div);
    }
}

const validaForm = new ValidaForm()