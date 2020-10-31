const d = document;
const w = window;

d.addEventListener('DOMContentLoaded', (e) => {
	// socket enlazado
	const socket = io();

	if (w.localStorage.getItem('user') === null) {
		const setUser = prompt('Ingrese un nombre de usuario: ', 'anónimo');
		w.localStorage.setItem('user', setUser);
	}

	const $container_messages = d.querySelector('.container-messages');
	const $form = d.querySelector('.container-submit-message');
	const $container_users_connected = d.querySelector('.container-users-connected');
	const $msg_connection = d.querySelector('.msg-connection');
	const $msg_connection_submit = d.querySelector('.msg-connection-submit');

	const verificarScroll = () => {
		$container_messages.scrollTop = $container_messages.scrollHeight;
	};

	const msgConnection = (result) => {
		if (result === true) {
			$msg_connection_submit.innerText = 'Un usuario se ha conectado';
			$msg_connection.classList.add('connected');
			setTimeout(() => {
				$msg_connection.classList.remove('connected');
			}, 2000);
		} else {
			$msg_connection_submit.innerText = 'Un usuario se ha desconectado';
			$msg_connection.classList.add('disconnect');
			setTimeout(() => {
				$msg_connection.classList.remove('disconnect');
			}, 2000);
		}
	};

	const incrustarMensaje = (msg, usuarioEnviado) => {
		const contenedorElemento = d.createElement('div');
		const contenedorUsuario = d.createElement('b');
		contenedorUsuario.append(usuarioEnviado + ': ' || w.localStorage.getItem('user') + ': ');
		const nuevoElemento = d.createElement('li');
		nuevoElemento.append(contenedorUsuario);
		const contenidoElemento = d.createTextNode(msg);
		nuevoElemento.append(contenidoElemento);
		contenedorElemento.append(nuevoElemento);
		$container_messages.appendChild(contenedorElemento);
	};

	verificarScroll();

	d.addEventListener('click', (e) => {
		if (e.target.matches('.btn-submit-message') || e.target.matches('.btn-submit-message *')) {
			const msg = $form.message.value;
			e.preventDefault();
			if (msg === '') return;
			socket.emit('submit message', msg, w.localStorage.getItem('user'));
			incrustarMensaje(msg, w.localStorage.getItem('user'));
			$form.message.value = '';
			verificarScroll();
		}
	});

	socket.on('user connected', (result) => {
		msgConnection(result);
	});

	socket.on('User_Activity', (usersCount) => {
		$container_users_connected.innerText = `${usersCount} usuarios conectados`;
	});

	socket.on('Add_New_Message', (msg, usuarioEnviado) => {
		incrustarMensaje(msg, usuarioEnviado);
		verificarScroll();
	});
});
