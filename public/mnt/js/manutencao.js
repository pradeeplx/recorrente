	var turmas = new Array();

	function recarregaTurma(id_escola) {

			turmaTemp = turmas[id_escola];
	
			document.getElementById('turma').options.length = null;
	
			var option=document.createElement("option");
			option.value=0;
			option.text="Selecione uma turma";
		  document.getElementById('turma').add(option,null);
	
			var option=document.createElement("option");
			option.value=0;
			option.text="";
		  document.getElementById('turma').add(option,null);
	
			for (i=0; i<turmaTemp.length; i++) {
					if (turmaTemp[i]) {
							var option=document.createElement("option");
							option.value=i;
							option.text=turmaTemp[i];
						  document.getElementById('turma').add(option,null);
					};
			};

	};
	
	

	$(function() {


	    var button = $('.botaoNovo');
	    var box = $('.boxNovo');
	    button.removeAttr('href');

			// ------------------------------------------
			// caixa com campo adicionar novo titem (escola e turma)
	    button.mouseup(function() {
	    		$(this).hide();
	    		$(this).parent().parent().find('select').prop('disabled', 'false');
	    		$(this).parent().find('select').prop('disabled', '');
	    		var box = $(this).parent().find(".boxNovo");
	        box.toggle();
	        button.toggleClass('active');
	    });

	    $('.cancel').mouseup(function() {
	    		$(this).parent().parent().find('.botaoNovo').show();
	    		$(this).parent().parent().find('select').prop('disabled', '');
	    		var box = $(this).parent();
	    		$(this).parent().find('input:text').val('');
	    		$(this).parent().find('select').val('');
	        box.hide();
	    });



			// ------------------------------------------
			// validacao do forumlario e submit
	    $('#enviaCadastro').mouseup(function() {

					
					$('#episodios_liberados_valor').val( $('#episodios_liberados').val() );

					msg = '';
					campo = '';
					
//					if (($('#escola').val()=='')&&($('#nome_nova_escola').val()=='') {
//							msg = 'Informe o campo Escola.';
//							campo = '#escola';
//					};
//					if (($('#turma').val()=='')&&($('#nome_nova_turma').val()=='') {
//							msg = 'Informe o campo Turma.';
//							campo = '#turma';
//					};
					if ($('#perfil_acesso').val()=='') {
							msg = 'Informe o Perfil de acesso do novo usuário.';
							campo = '#perfil_acesso';
					};


					if ($('#senha').val()=='') {
							msg = 'Preencha o campo Senha.';
							campo = '#senha';
					};

					if ($('#status_msg_usuario').text()!='') {
							msg = $('#status_msg_usuario').text();
							campo = '#usuario';
					};
					
					if ($('#usuario').val()=='') {
							msg = 'Preencha o campo Usuário de acesso.';
							campo = '#usuario';
					};

					if ($('#nome').val()=='') {
							msg = 'Preencha o campo Nome completo do usuário.';
							campo = '#nome';
					};
					
					if (msg!='') {

							alert(msg);
							$(campo).focus();

					} else {
							$('.form-horizontal').submit();
						
					};
					
					return false;
		
	    });


			$('#perfil_acesso').change(function() {
					if ($('#perfil_acesso').val()=='1') {
						$('#divEpisodios').fadeIn();						
					} else {
						$('#divEpisodios').fadeOut();						
					};
			});

			// ------------------------------------------
			// procedimento de validação do campo usuário
			
			$('#usuario').keyup(function() {

					var username = $('#usuario').val();
					
					if ($('#usuario').val().length>0) {
							if ($('#usuario').val().length>3) {
		
								 	$('#usuario').css('border', '3px #CCC solid');
									jQuery.ajax({
											type: 'POST', url: '/manutencao/validaUsuario', data: 'usuario=' + username, cache: false, success: function(response) {
													if (response == 0) {
														 	$('#status_icon_usuario').removeClass('icon-exclamation-sign'); 
														 	$('#status_icon_usuario').addClass('icon-ok'); 
														 	$('#status_icon_usuario').css('color', '#090')
														 	$('#status_msg_usuario').text(''); 
													} else {
														 	$('#status_icon_usuario').removeClass('icon-ok'); 
														 	$('#status_icon_usuario').addClass('icon-exclamation-sign'); 
														 	$('#status_msg_usuario').text(response); 
														 	$('#status_icon_usuario').css('color', '#C33');
													}
		
										 	}
		
									});
		
							} else {
								 	$('#status_icon_usuario').removeClass('icon-ok'); 
								 	$('#status_icon_usuario').addClass('icon-exclamation-sign'); 
								 	$('#status_msg_usuario').text('Mínimo 4 caratceres.'); 
								 	$('#status_icon_usuario').css('color', '#C33');
							};
					} else {
						 	$('#status_icon_usuario').removeClass('icon-ok'); 
						 	$('#status_icon_usuario').removeClass('icon-exclamation-sign'); 
						 	$('#status_msg_usuario').text('Apenas letras e números.'); 
						 	$('#status_icon_usuario').css('color', '#C33');
					};

		 	});
		 	
		 	$('#divEpisodios').hide();
		 	
		 	if ($('#usuario').val()!='') {
		 		$('#usuario').focusout();
		 	};

	});