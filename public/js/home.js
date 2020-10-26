const d = document;
const w = window;

d.addEventListener('DOMContentLoaded', (e) => {
	// socket enlazado
	const socket = io();

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

	const incrustarMensaje = (msg) => {
		const nuevoElemento = d.createElement('li');
		const contenidoElemento = d.createTextNode(msg);
		nuevoElemento.append(contenidoElemento);
		$container_messages.appendChild(nuevoElemento);
	};

	verificarScroll();

	d.addEventListener('click', (e) => {
		if (e.target.matches('.btn-submit-message') || e.target.matches('.btn-submit-message *')) {
			const msg = $form.message.value;
			e.preventDefault();
			if (msg === '') return;
			socket.emit('submit message', msg);
			incrustarMensaje(msg);
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

	socket.on('Add_New_Message', (msg) => {
		incrustarMensaje(msg);
		verificarScroll();
	});
});
