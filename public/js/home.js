const d = document;
const w = window;

d.addEventListener('DOMContentLoaded', (e) => {
	// socket enlazado
	const socket = io();

	const $container_messages = d.querySelector('.container-messages');
	const $form = d.querySelector('.container-submit-message');

	const verificarScroll = () => {
		$container_messages.scrollTop = $container_messages.scrollHeight;
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
			e.preventDefault();
			socket.emit('submit message', $form.message.value);
			incrustarMensaje($form.message.value);
			$form.message.value = '';
			verificarScroll();
		}
	});

	socket.on('Add_New_Message', (msg) => {
		incrustarMensaje(msg);
		verificarScroll();
	});
});
