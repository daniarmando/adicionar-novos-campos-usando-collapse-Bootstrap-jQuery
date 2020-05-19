var container = $('#boxCamposTabelaDeclaracaoSalario'); 
var conteudoHtmlPadrao = container.html();
var quantidadeDeColunas = 1;
var inputQuantidadeDeColunas = $('#quantidadeDeColunas');

aplicarEfeitoIconeDoAccordion(1);
atualizarInputQuantidadeDeColunas();   
exibirColuna();

function MascaraMoeda(objTextBox, SeparadorMilesimo, SeparadorDecimal, e) {
  if (objTextBox.value.length >= objTextBox.maxLength) {
    return false;
  }

  var sep = 0;
  var key = '';
  var i = j = 0;
  var len = len2 = 0;
  var strCheck = '0123456789';
  var aux = aux2 = '';
  var whichCode = (window.Event) ? e.which : e.keyCode;
  if ((whichCode == 13) || (whichCode == 0) || (whichCode == 8)) return true;
  key = String.fromCharCode(whichCode); // Valor para o código da Chave
  if (strCheck.indexOf(key) == -1) return false; // Chave inválida
  len = objTextBox.value.length;
  for(i = 0; i < len; i++)
    if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal)) break;
      aux = '';
  for(; i < len; i++)
    if (strCheck.indexOf(objTextBox.value.charAt(i))!=-1) aux += objTextBox.value.charAt(i);
  aux += key;
  len = aux.length;
  if (len == 0) objTextBox.value = '';
  if (len == 1) objTextBox.value = '0'+ SeparadorDecimal + '0' + aux;
  if (len == 2) objTextBox.value = '0'+ SeparadorDecimal + aux;
  if (len > 2) {
    aux2 = '';
    for (j = 0, i = len - 3; i >= 0; i--) {
      if (j == 3) {
        aux2 += SeparadorMilesimo;
        j = 0;
      }
      aux2 += aux.charAt(i);
      j++;
    }
    objTextBox.value = '';
    len2 = aux2.length;
    for (i = len2 - 1; i >= 0; i--)
      objTextBox.value += aux2.charAt(i);
    objTextBox.value += SeparadorDecimal + aux.substr(len - 2, len);
  }
  return false;
}  

function adicionar() {
  quantidadeDeColunas += 1;            
  fecharAccordions();
  container.append(conteudoHtmlPadrao);      
  atualizarPropriedades(true);      
  atualizarInputQuantidadeDeColunas();
}

function remover(botao) {  
  var botao = $(botao);
  var divPai = $('#' + botao.attr('data-idPai'));
  esconderColuna(divPai);
  botao.attr('disabled', 'disabled');              	  
  
  setTimeout(function(){       	
    divPai.remove();      
    quantidadeDeColunas -= 1;      
    atualizarInputQuantidadeDeColunas();        
    atualizarPropriedades(false); 
  }, 300);           
}    

function atualizarInputQuantidadeDeColunas() {
  inputQuantidadeDeColunas.val(quantidadeDeColunas);      
}

function exibirColuna() {
  $('.campos-tabela-declaracao-salario').css({'opacity':'1', 'transition':'opacity .5s'});
}

function esconderColuna(div) {	
  div.css({'opacity':'0'});
}

function fecharAccordions() {
  $('.collapse').collapse('hide');
}

function atualizarPropriedades(isSetarFoco) {
  container.children().each(function(index) {        	
    var divCampos = $(this);
    var nroColunaAnterior = divCampos.find('.titulo-coluna')[0].textContent.replace('Coluna', '').trim();                       
    var nroColunaNova = (index + 1);            
    
    if (nroColunaAnterior && nroColunaAnterior > 0) { 
      var coluna = '_coluna_';     
      var isUltimaColuna = (nroColunaNova == quantidadeDeColunas)
      
      divCampos.attr('id', coluna + nroColunaNova);
      
      divCampos.find('.titulo-coluna')[0].innerHTML = 'Coluna ' + nroColunaNova;          
                
      divCampos.find('[name=botao-adicionar' + coluna + nroColunaAnterior + ']')[0].name = 'botao-adicionar' + coluna + nroColunaNova;
      divCampos.find('[name=botao-remover' + coluna + nroColunaAnterior + ']')[0].name = 'botao-remover' + coluna + nroColunaNova;
      
      divCampos.find('[name=botao-adicionar' + coluna + nroColunaNova + ']').attr('data-idPai', divCampos.attr('id'));
      divCampos.find('[name=botao-remover' + coluna + nroColunaNova + ']').attr('data-idPai', divCampos.attr('id'));
      
      if (quantidadeDeColunas == 1) {          
        $('[name=botao-adicionar' + coluna + nroColunaNova + ']').removeAttr('disabled');              	  
        $('[name=botao-remover' + coluna + nroColunaNova + ']').attr('disabled', 'disabled');              	  
      } else {
        $('[name=botao-remover' + coluna + nroColunaNova + ']').removeAttr('disabled');              
        $('[name=botao-adicionar' + coluna + nroColunaNova + ']').attr('disabled', 'disabled');              	  
      }
      
      if (isUltimaColuna) {
        $('[name=botao-adicionar' + coluna + nroColunaNova + ']').removeAttr('disabled');              	  
      }                    
      
      // inputs principais
      divCampos.find('[name=ano' + coluna + nroColunaAnterior + ']')[0].name = 'ano' + coluna + nroColunaNova;
      divCampos.find('[value=ano' + coluna + nroColunaAnterior + ']')[0].value = 'ano' + coluna + nroColunaNova; //vars
      divCampos.find('[value=ano' + coluna + nroColunaAnterior + ']')[0].value = 'ano' + coluna + nroColunaNova; //obrigatórios
      
      divCampos.find('[name=valor_janeiro' + coluna + nroColunaAnterior + ']')[0].name = 'valor_janeiro' + coluna + nroColunaNova;
      divCampos.find('[value=valor_janeiro' + coluna + nroColunaAnterior + ']')[0].value = 'valor_janeiro' + coluna + nroColunaNova; //vars                                    
      
      divCampos.find('[name=valor_fevereiro' + coluna + nroColunaAnterior + ']')[0].name = 'valor_fevereiro' + coluna + nroColunaNova;
      divCampos.find('[value=valor_fevereiro' + coluna + nroColunaAnterior + ']')[0].value = 'valor_fevereiro' + coluna + nroColunaNova; //vars
      
      divCampos.find('[name=valor_marco' + coluna + nroColunaAnterior + ']')[0].name = 'valor_marco' + coluna + nroColunaNova;
      divCampos.find('[value=valor_marco' + coluna + nroColunaAnterior + ']')[0].value = 'valor_marco' + coluna + nroColunaNova; //vars
      
      divCampos.find('[name=valor_abril' + coluna + nroColunaAnterior + ']')[0].name = 'valor_abril' + coluna + nroColunaNova;
      divCampos.find('[value=valor_abril' + coluna + nroColunaAnterior + ']')[0].value = 'valor_abril' + coluna + nroColunaNova; //vars
      
      divCampos.find('[name=valor_maio' + coluna + nroColunaAnterior + ']')[0].name = 'valor_maio' + coluna + nroColunaNova;
      divCampos.find('[value=valor_maio' + coluna + nroColunaAnterior + ']')[0].value = 'valor_maio' + coluna + nroColunaNova; //vars
      
      divCampos.find('[name=valor_junho' + coluna + nroColunaAnterior + ']')[0].name = 'valor_junho' + coluna + nroColunaNova;
      divCampos.find('[value=valor_junho' + coluna + nroColunaAnterior + ']')[0].value = 'valor_junho' + coluna + nroColunaNova; //vars
      
      divCampos.find('[name=valor_julho' + coluna + nroColunaAnterior + ']')[0].name = 'valor_julho' + coluna + nroColunaNova;
      divCampos.find('[value=valor_julho' + coluna + nroColunaAnterior + ']')[0].value = 'valor_julho' + coluna + nroColunaNova; //vars
      
      divCampos.find('[name=valor_agosto' + coluna + nroColunaAnterior + ']')[0].name = 'valor_agosto' + coluna + nroColunaNova;
      divCampos.find('[value=valor_agosto' + coluna + nroColunaAnterior + ']')[0].value = 'valor_agosto' + coluna + nroColunaNova; //vars
      
      divCampos.find('[name=valor_setembro' + coluna + nroColunaAnterior + ']')[0].name = 'valor_setembro' + coluna + nroColunaNova;
      divCampos.find('[value=valor_setembro' + coluna + nroColunaAnterior + ']')[0].value = 'valor_setembro' + coluna + nroColunaNova; //vars
      
      divCampos.find('[name=valor_outubro' + coluna + nroColunaAnterior + ']')[0].name = 'valor_outubro' + coluna + nroColunaNova;
      divCampos.find('[value=valor_outubro' + coluna + nroColunaAnterior + ']')[0].value = 'valor_outubro' + coluna + nroColunaNova; //vars
      
      divCampos.find('[name=valor_novembro' + coluna + nroColunaAnterior + ']')[0].name = 'valor_novembro' + coluna + nroColunaNova;
      divCampos.find('[value=valor_novembro' + coluna + nroColunaAnterior + ']')[0].value = 'valor_novembro' + coluna + nroColunaNova; //vars
      
      divCampos.find('[name=valor_dezembro' + coluna + nroColunaAnterior + ']')[0].name = 'valor_dezembro' + coluna + nroColunaNova;
      divCampos.find('[value=valor_dezembro' + coluna + nroColunaAnterior + ']')[0].value = 'valor_dezembro' + coluna + nroColunaNova; //vars                    
                
      // accordion
      divCampos.find('#accordion' + coluna + nroColunaAnterior).attr('id', 'accordion' + coluna + nroColunaNova);
      divCampos.find('#heading' + coluna + nroColunaAnterior).attr('id', 'heading' + coluna + nroColunaNova);
      divCampos.find('#accordionIcone' + coluna + nroColunaAnterior).attr('id', 'accordionIcone' + coluna + nroColunaNova).attr('data-target', '#collapse' + coluna + nroColunaNova).attr('aria-controls', 'collapse' + coluna + nroColunaNova);        
      divCampos.find('#accordionIconeAbaixo' + coluna + nroColunaAnterior).attr('id', 'accordionIconeAbaixo' + coluna + nroColunaNova).attr('data-target', '#collapse' + coluna + nroColunaNova).attr('aria-controls', 'collapse' + coluna + nroColunaNova);          
      divCampos.find('#collapse' + coluna + nroColunaAnterior).attr('id', 'collapse' + coluna + nroColunaNova).attr('aria-labelledby', '#accordion' + coluna + nroColunaNova).attr('data-parent', '#accordion' + coluna + nroColunaNova);
      aplicarEfeitoIconeDoAccordion(nroColunaNova);
                
      if (isSetarFoco) {
        $('[name=ano' + coluna + nroColunaNova + ']').focus();            
      }
      exibirColuna();
    }
  });      	
}

function aplicarEfeitoIconeDoAccordion(nroColunaNova) {
  $('#accordion_coluna_' + nroColunaNova)
      .on('hidden.bs.collapse', function () {
        $('#accordionIcone_coluna_' + nroColunaNova).css({'transform': 'rotate(90deg)'});
        })
      .on('shown.bs.collapse', function () {
        $('#accordionIcone_coluna_' + nroColunaNova).css({'transform': 'rotate(180deg)'});        	
        $('[name=valor_janeiro_coluna_' + nroColunaNova + ']').focus();
      });      	 
}

$(function() {  
  $('input[name=ano_coluna_1]').focus();
 });


